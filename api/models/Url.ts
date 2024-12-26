import mongoose from "mongoose";
import {IUrl} from "../types";

const Schema = mongoose.Schema;

const urlSchema = new Schema<IUrl>({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true,
    },
});

const Url = mongoose.model('Url', urlSchema);

export default Url;