import express from "express";
import path from "path";
import sharp from "sharp";
const about = express.Router();

//Get called by routers
about.get('/', async (req,res) => {

    //fetch parameters from the current url is being called
    const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const search_params = current_url.searchParams;
    //sets parameters from url into numbers
    const heightParam = search_params.get('height') as unknown as number;
    const widthParam = search_params.get('width') as unknown as number;

    //procces the image calling the resize function
    /* const imageCreated = await resizeImage(heightParam, widthParam);
    if (imageCreated){
        res.sendFile(path.join(__dirname, "../../../src/images/stored images/20211219_141722 1.jpg"));
    } else {
        res.sendFile(path.join(__dirname, "../../../src/images/thumbnails/processedImage.jpg"));
    } */
    res.send("This site is for Image resizing");
});



export default about;

