import path from 'path';
import sharp from 'sharp';

async function resizeImage() {
    try {
        await sharp(path.join(__dirname, "../../../src/images/stored images/20211219_141722 1.jpg"))
            .resize({
                width: 200,
                height: 400
            })
            .toFile(path.join(__dirname, "../../../src/images/thumbnails/processedImage.jpg"));
        return true;
    } catch (error) {
        console.log(error);
    }
}

resizeImage();

export default resizeImage;