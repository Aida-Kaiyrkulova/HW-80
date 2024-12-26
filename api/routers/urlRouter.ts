import express from "express";
import Url from "../models/Url";

const urlRouter = express.Router();


function generateShortId(): string {
    const uppercase = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
    const lowercase = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
    const characters = (uppercase + lowercase).split('');
    const length = Math.floor(Math.random() * 2) + 6;

    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

urlRouter.get('/', async (_req, res, next) => {
    try {
        const urls = await Url.find();
        res.send(urls);
    } catch (e) {
        next(e);
    }
});

urlRouter.get('/:shortUrl', async (req, res, next) => {
    const  shortUrl  = req.params.shortUrl;

    try {
        const record = await Url.findOne({ shortUrl });

        if (!record) {
            res.status(404).send('Not found');
            return;
        }

        res.status(301).redirect(record.originalUrl);
    } catch (e) {
        next(e);
    }
});

urlRouter.post('/', async (req, res, next) => {
    const { url } = req.body;

    if (!url) {
        res.status(400).send({ error: 'URL is required' });
        return;
    }

    let shortId: string;
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
            shortUrl: `http://localhost:8000/${shortId}`,
            originalUrl: url,
        });
    } catch (e) {
        next(e);
    }
});

export default urlRouter;