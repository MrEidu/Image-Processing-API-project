import axios from "axios";
import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
const resize = express.Router();

//Get called by routes/index
resize.get('/', async (req, res) => {

    //fetch parameters from the current url is being called
    const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const search_params = current_url.searchParams;

    //sets parameters from url into data
    const heightParam = search_params.get('height') as unknown as number;
    const widthParam = search_params.get('width') as unknown as number;
    const fileName = search_params.get('file') as unknown as string;

    console.log(`File name: ${fileName}, Width: ${widthParam}, Height: ${heightParam}`);

    //this try and catch will attempt to read file, resize it and store in thumbnails
    try {
        //attempts tp read file to use as input for sharp
        const inputFile = path.join(__dirname, `../../../src/images/stored images/${fileName}`) as string;
        const imageOnBuffer = fs.readFileSync(inputFile);
        console.log(`File ${fileName} succesfuly found. Resizing...`)
        //Sharp is used here
        const output = await sharp(imageOnBuffer)
            .resize({ height: undefined, width: 500 })
            .toBuffer();
        //saves image from buffer to file
        fs.writeFile(path.join(__dirname, `../../../src/images/thumbnails/${fileName}`) as string, output as Buffer, (err) => {
            if (err) {
                console.log("Error: Input Missing. See src/routes/api/resize.ts");
            } else {
                console.log("Image stored on thumbnails");
            }
        });
        res.sendFile(path.join(__dirname, `../../../src/images/thumbnails/${fileName}`));
    } catch (error) {
        res.send("Error");
    }


});

export default resize;



/* const sharpResizer = (
    req: express.Request,
    res: express.Response,
    next: Function
    ): void => {
        const resizeImage = true;
        next();
    } */
