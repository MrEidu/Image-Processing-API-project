import express from "express";
import { resizeImage } from "./utilities/resize";
import { getValues } from "./utilities/urlParameters";

const resize = express.Router();

//Get called by routes/index
resize.get('/', async (req: express.Request, res: express.Response) => {
    //will obtain the values to use in sharp from the url
    const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    //this will contain values from parameters from url
    let urlParameters: [string, number | undefined, number | undefined] = ["", undefined, undefined];
    //bool to see if url was good or should not process further
    let validURL = true;
    // urlParameters index means: [0] = namefile, [1] = width, [2] = height,
    //try and catch to see if there's something wrong with the url parameters
    try {
        console.log("entering url parameters");
        urlParameters = getValues(current_url);
        console.log("success");
    } catch (error) {
        console.log("failed");
        res.status(400).send(`400 Bad Request: ${error}`);
        validURL = false;
    }
    //if url has necessary info, it process the image
    if (validURL) {
        try {
            res.sendFile(await resizeImage(urlParameters));
        } catch (error) {
            res.status(500).send(`500 Internal Server Error: ${error}`);
        }
    }
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