import supertest from 'supertest';
import app from '../index';
import fs from "fs";
import path from 'path';
import { getValues } from "../routes/api/utilities/urlParameters";

const request = supertest(app);

//These are the following test:
//This just connects to the main endpoint
describe("Enpoint testing", () => {
    it("Connects to main endpoint", async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});
//This test the api endpoint that uses sharp
describe("Sharp by API request testing", () => {
    it("Sharp creates a new Thumbnail for TestImage.jpg", async () => {
        const link = '/api/resize?file=Test%20Image.jpg&width=200';
        const response = await request.get(link);
        expect(response.status).toBe(200);
    });
    it("Sharp shows already created Thumbnail TestImage.jpg", async () => {
        const link = '/api/resize?file=Test%20Image.jpg&width=200';
        const response = await request.get(link);
        //this one will delete "Test Image.jpg". To prevent that make the line below a comment
        fs.unlinkSync(path.join(__dirname, `../images/thumbnails/Test Image.jpg`));
        expect(response.status).toBe(200);
    });
    it("Resize url doesn't have a file name parameter", async () => {
        const link = '/api/resize?width=100';
        const response = await request.get(link);
        expect(response.status).toBe(400);
    });
    it("Resize url doesn't find a file", async () => {
        const link = '/api/resize?file=Test%20Image.gif&width=200';
        const response = await request.get(link);
        expect(response.status).toBe(500);
    });
})
//This uses sharp alone to test possible errors
describe("Custom URL error testing", () => {
    it("Send negative numbers for size", async () => {
        expect(function () {
            getValues(new URL("https://www.LaSpyke.me/?file=image.jpg&width=-2"));
        }).toThrowError("width cannot be zero or a negative number.");
    });
    it("No file parameter in url", async () => {
        expect(function () {
            getValues(new URL("https://www.LaSpyke.me/?width=-2"));
        }).toThrowError(`A file parameter is missing or does not exist. Try adding "file=nameFile.extention to the url parameters. fileName is the name of the file, extention being the format such jpeg or other image formats.`);
    });
    it("Url with no valid character: '/'", async () => {
        expect(function () {
            getValues(new URL("https://www.LaSpyke.me/?file=none%2F.jpg&width=200"));
        }).toThrowError(`none/.jpg cannot contain: / : * ? " < > |`);
    });
    it("Url with no supported file extention in file parameter", async () => {
        expect(function () {
            getValues(new URL("https://www.LaSpyke.me/?file=none.jjpg&width=200"));
        }).toThrowError("none.jjpg has no valid format. Supported formats are JPG, JPEG, PNG, GIF, WebP and AVIF.");
    });
});