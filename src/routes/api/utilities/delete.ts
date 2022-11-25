import fs from "fs";
import path from "path";

export async function deleter(fileName: string) {
  //declaring paths to get or save images
  const thumbnailPath = path.join(
    __dirname,
    `../../../images/thumbnails/${fileName}`
  );
  const imagePath = path.join(
    __dirname,
    `../../../images/stored images/${fileName}`
  );
  try {
    fs.unlinkSync(thumbnailPath);
  } catch (error) {
    //in this case I don't mind if the thumbnail doesn't exist. I just report to log
    console.log("Thumbnail doesn't exist");
  }
  try {
    console.log(imagePath);
    console.log(thumbnailPath);
    fs.unlinkSync(imagePath);
    return true;
  } catch (error) {
    return false;
  }
}
