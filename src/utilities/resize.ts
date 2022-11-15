import path from "path";
import sharp from "sharp";

//The purpose of this file is to get a source image and size parameters and to
//create an output image to the thumbnail's folder
async function resizeImage(imgSource: string, imgName: string, pHeight: number, pWidth: number) {
    try {
      await sharp(imgSource)
        .resize({
          width: pWidth,
          height: pHeight
        })
        //.toFormat("jpeg", { mozjpeg: true })
        .toFile(path.join(__dirname, `../../../src/images/thumbnails/${imgName}`));
        return (path.join(__dirname, `../../../src/images/thumbnails/${imgName}`));
    } catch (error) {
        return "Failed at getting or creating a new image";
    }
  }
export default resizeImage;

