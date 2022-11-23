import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { getValues } from "./utilities/urlParameters";

const resize = express.Router();

//Get called by routes/index
resize.get('/', async (req: express.Request, res: express.Response) => {
    //will obtain the values to use in sharp from the url
    const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    //this will contain values from parameters from url
    let urlParameters: [string, number | undefined, number | undefined] = ["", undefined, undefined];
    //try and catch to see if there's something wrong with the url parameters
    try {
        urlParameters = getValues(current_url);
    } catch (error) {
        res.status(400).send(`400 Bad Request: ${error}`);
    }
    /* try {

    } catch (error) {

    } */
    res.send(urlParameters[0]);
});

export default resize;
/*
Documentation and the aid to reach a solution was from the following links:
    Sharp Documentation:
    * https://www.npmjs.com/package/sharp
    Tutorial of how to use sharp:
    * https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp
    Search Parameters
    * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    FS
    * This one was from notes from the course
    * For readfilesyng: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
    Links in server:
    * https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
*/