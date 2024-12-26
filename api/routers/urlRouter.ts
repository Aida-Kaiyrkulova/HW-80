import express from "express";
import Url from "../models/Url";

const urlRouter = express.Router();

const generateShortId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * 2) + 6;
    let shortId = '';

    for (let i = 0; i < length; i++) {
        shortId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortId;
};

urlRouter.get('/', async (_req, res, next) => {
    try {
        const urls = await Url.find();
        res.send(urls);
    } catch (e) {
        next(e);
    }
});

urlRouter.get('/:shortUrl', async (req, res, next) => {
    const shortUrl = req.params.shortUrl;
    console.log('Received short URL:', shortUrl);

    try {
        const website = await Url.findOne({ shortUrl });
        console.log('Database record:', website);

        if (!website) {
            res.status(404).send('Not found');
            return;
        }

        res.status(301).redirect(website.originalUrl);
    } catch (e) {
        console.error('Error during redirect:', e);
        next(e);
    }
});


urlRouter.post('/', async (req, res, next) => {
    const { url } = req.body;

    if (!url) {
        res.status(400).send({ error: 'URL is required' });
        return;
    }

    let shortId;
    let exists;

    try {
        do {
            shortId = generateShortId();
            exists = await Url.findOne({ shortUrl: shortId });
        } while (exists);

        const newUrl = new Url({
            originalUrl: url,
            shortUrl: shortId,
        });

        await newUrl.save();

        res.send({
            id: newUrl._id,
            shortUrl: `http://localhost:8000/links/${shortId}`,
            originalUrl: url,
        });
    } catch (e) {
        next(e);
    }
});

export default urlRouter;