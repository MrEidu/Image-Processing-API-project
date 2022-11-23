import path from "path";
import fs from "fs";
import sharp from "sharp";

export async function resizeImage(current_url: URL, data: [string, number | undefined, number | undefined]) {
    let theImage;
    let matched = true;
    try {
        //this try is for opening the file
        try {
            //creates path to stored thumbnail images to read file
            const inputFile = path.join(__dirname, `../../../src/images/thumbnails/${data[0]}`) as string;
            //attempts to read file to use as input for sharp
            theImage = fs.readFileSync(inputFile);
        } catch (error) {
            //thumbnail doesn't exist to there is no match
            console.log("No thumbnail matched, creating new thumbnail");
            matched = false;
        }
        //if there is a thumbnail of the requested file, reads metadata
        if (matched) {
            //Sharp is used here to search if metadata match the specified size
            const metadata = await sharp(theImage).metadata();

            //if data doesnt' match parameters, its not a match
            if (!(metadata.width == data[1] && metadata.height == data[2] ||
                data[1] == undefined && metadata.height == data[2] ||
                metadata.width == data[1] && data[2] == undefined)) {
                matched = false;
            }
            //If there is a match, it sends the thumbnail
            console.log("Thumbnail already existed, loaded existing thumbnail");
        }
    } catch (error) {
        matched = false;
        console.log("Sharp failed to process aready existing thumbnail metadata. Making new one");
    }
    let abort404 = false; //this one is a failsafe of a file that doesn't exist
    if (matched) {
        return theImage;
        //if there is no match, it creates the thumbnail
    } else {
        //this try and catch will attempt to read file, resize it and store in thumbnails
        try {
            //attempts tp read file to use as input for sharp
            try {
                theImage = fs.readFileSync(path.join(__dirname, `../../../src/images/stored images/${data[0]}`) as string);
            } catch (error) {
                abort404 = true;
            }
            if (!abort404) {
                //Sharp is used here
                const output = await sharp(theImage)
                    .resize({ height: data[2], width: data[1] })
                    .toBuffer();
                //saves image from buffer to file
                fs.writeFile(path.join(__dirname, `../../../src/images/thumbnails/${data[0]}`) as string, output as Buffer, (err) => {
                    if (err) {
                        console.log("Image could not be saved on the thumbnails folder");
                    } else {
                        console.log("Image stored on thumbnails folder");
                    }
                });
                //If all went okay, it loads the output image and sends log of success
                console.log("Thumbnail created from stored images");
                console.log("Thumbnail Created");
                return output;
            }
        } catch (error) {
            //If it goes wrong, it sends an error message
            throw new Error("Sharp failed for some reason");

        }
    }
}