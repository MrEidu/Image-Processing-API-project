import express from "express";
import fs from "fs";
import path from "path";
const deleteImage = express.Router();

deleteImage.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../../src/html/api/delete.html'));
});

//Get called by routes/index
deleteImage.get('/delete', async (req, res) => {
    //fetch parameters from the current url is being called
    const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const search_params = current_url.searchParams;
    const fileName = search_params.get('file');// as unknown as string;

    if (fileName == null) {
        res.status(400).send("Error 400 Bad Request: A file name must be provided");
    } else {
        //this try and catch will attempt to find and delete the thumbnail
        try {
            fs.unlinkSync(path.join(__dirname, `../../../src/images/thumbnails/${fileName}`));
        } catch (error) {
            //in this case I don't mind if the thumbnail doesn't exist. I just report to log
            console.log("Thumbnail doesn't exist");
        }
        //this try and catch will attempt to find and delete the thumbnail
        try {
            console.log(path.join(__dirname, `../../../src/images/stored images/${fileName}`));
            fs.unlinkSync(path.join(__dirname, `../../../src/images/stored images/${fileName}`));
            res.send(`
                <h3>File Deleted succesfully</h3>
                <h3><i><a href="/api/delete">Go back</a></i></h3>
            `);
        } catch (error) {
            res.status(400).send("Error 400 Bad Request: File does not exist");
        }
    }
});

export default deleteImage;
/*
Documentation and the aid to reach a solution was from the following links:
    Search Parameters
    * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    FS
    * This one was from notes from the course
    * For readfilesyng: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
    Links in server:
    * https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
*/