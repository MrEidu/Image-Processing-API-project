import path from "path";
import fs from "fs";
import sharp from "sharp";

export async function resizeImage(
  data: [string, number | undefined, number | undefined]
): Promise<Buffer> {
  //data[0] = NameFile, data[1] = width, data[2] height.
  //declaring paths to get or save images
  const thumbnailPath = path.join(
    __dirname,
    `../../../images/thumbnails/${data[1]}_${data[2]}_${data[0]}`
  );
  const imagePath = path.join(
    __dirname,
    `../../../images/stored images/${data[0]}`
  );
  //these will be the images as variables because sharp doesn't accepts paths from fs
  let thumbnail: Buffer = Buffer.alloc(256);
  let image: Buffer = Buffer.alloc(256);
  //will save process if there is an existing thumbnail
  let matched = true;
  try {
    //attempts to read file
    thumbnail = fs.readFileSync(thumbnailPath);
    return thumbnail;
  } catch (error) {
    matched = false;
    console.log("Thumbnail already existed, loaded existing thumbnail");
  }
  //attempts tp read file to use as input for sharp
  try {
    image = fs.readFileSync(imagePath);
  } catch (error) {
    //this will show if the file doesn't exist or somehow fs can't read it
    throw new Error(`${data[0]} does not exist or couldn't be opened.`);
  }
  //Sharp is used here
  try {
    thumbnail = await sharp(image)
      .resize({ height: data[2], width: data[1] })
      .toBuffer();
  } catch (error) {
    throw new Error(
      `${data[0]} may be corrupted and couldn't be processed by sharp.`
    );
  }
  //saves image from buffer to file
  try {
    fs.writeFile(thumbnailPath, thumbnail, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    throw new Error(`Failed to save new thumbnail. ${error}`);
  }
  //If all went okay, it loads the output image and sends log of success
  console.log("Thumbnail created from stored images");
  console.log("Thumbnail Created");
  return thumbnail;
}
