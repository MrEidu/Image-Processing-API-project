import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
const resize = express.Router();

//Get called by routes/index
resize.get('/', async (req, res) => {
    //fetch parameters from the current url is being called
    let imageOnBuffer;
    const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const search_params = current_url.searchParams;

    //sets parameters from url into data
    const heightParam = search_params.get('height');
    const widthParam = search_params.get('width');
    const fileName = search_params.get('file');// as unknown as string;

    if (fileName == null) {
        res.status(400).send("Error 400 Bad Request: A file name must be provided");
    } else {
        //parameters are turned into numbers or undefined
        const heightNumber = heightParam != null ? parseInt(heightParam) : undefined;
        const widthNumber = widthParam != null ? parseInt(widthParam) : undefined;

        //this try and catch will attempt to read file and compare parameters
        let matched = true;
        try {
            //this try is for opening the file
            try {
                //creates path to stored thumbnail images to read file
                const inputFile = path.join(__dirname, `../../../src/images/thumbnails/${fileName}`) as string;
                //attempts to read file to use as input for sharp
                imageOnBuffer = fs.readFileSync(inputFile);
            } catch (error) {
                //thumbnail doesn't exist to there is no match
                matched = false;
            }
            //if there is a thumbnail of the requested file, reads metadata
            if (matched) {
                //Sharp is used here to search if metadata match the specified size
                const data = await sharp(imageOnBuffer).metadata();

                //if data doesnt' match parameters, its not a match
                if (!(data.width == widthNumber && data.height == heightNumber ||
                    widthNumber == undefined && data.height == heightNumber ||
                    data.width == widthNumber && heightNumber == undefined)) {
                    matched = false;
                }
                res.locals.thumbnailStatus = "Thumbnail already existed, loaded existing thumbnail";
            }
        } catch (error) {
            matched = false;
            res.locals.messageError = "Sharp failed to process aready existing thumbnail metadata";
            console.log(res.locals.messageError);
        }
        //If there is a match, it sends the thumbnail
        let abort404 = false; //this one is a failsafe of a file that doesn't exist
        if (matched) {
            res.end(imageOnBuffer);
            //if there is no match, it creates the thumbnail
        } else {
            //this try and catch will attempt to read file, resize it and store in thumbnails
            try {
                //attempts tp read file to use as input for sharp
                try {
                    imageOnBuffer = fs.readFileSync(path.join(__dirname, `../../../src/images/stored images/${fileName}`) as string);
                } catch (error) {
                    abort404 = true;
                }
                if (!abort404) {
                    //Sharp is used here
                    const output = await sharp(imageOnBuffer)
                        .resize({ height: heightNumber, width: widthNumber })
                        .toBuffer();
                    //saves image from buffer to file
                    fs.writeFile(path.join(__dirname, `../../../src/images/thumbnails/${fileName}`) as string, output as Buffer, (err) => {
                        if (err) {
                            console.log("Image could not be saved on the thumbnails folder");
                        } else {
                            console.log("Image stored on thumbnails folder");
                        }
                    });
                    //If all went okay, it loads the output image and sends log of success
                    res.locals.thumbnailStatus = "Thumbnail created from stored images";
                    console.log("Thumbnail Created");
                    res.end(output);
                }
            } catch (error) {
                //If it goes wrong, it sends an error message
                res.locals.failed = true;
            }
        }
        if (res.locals.failed && !abort404) {
            res.status(400).send(`Error 400 Bad Request: ${res.locals.messageError}`);
        } else if (abort404) {
            res.status(404).send(`Error 404: File not found`);
        }
    }
});

export default resize;
