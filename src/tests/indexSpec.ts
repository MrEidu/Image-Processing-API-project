import supertest from 'supertest';
import app from '../index';
import fs from "fs";
import path from 'path';

const request = supertest(app);

//These are the following test:
//This just connects to the main endpoint
describe("Enpoint testing", () => {
    it("Connects to main endpoint", async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});
describe("Sharp dependency testing", () => {
    it("Sharp creates a new Thumbnail for TestImage.jpg", async () => {
        const link = '/api/resize?file=Test%20Image.jpg&width=200';
        const response = await request.get(link);
        expect(response.status).not.toBe(400);
    });
    it("Sharp shows already created Thumbnail TestImage.jpg", async () => {
        const link = '/api/resize?file=Test%20Image.jpg&width=200';
        const response = await request.get(link);
        //this one will delete "Test Image.jpg". To prevent that make the line below a comment
        fs.unlinkSync(path.join(__dirname, `../../src/images/thumbnails/Test Image.jpg`));
        expect(response.status).not.toBe(400);
    });
    it("Resize url doesn't have a file name parameter", async () => {
        const link = '/api/resize?width=100';
        const response = await request.get(link);
        expect(response.status).toBe(400);
    });
    it("Resize url doesn't find a file", async () => {
        const link = '/api/resize?file=Test%20Image.gif&width=200';
        const response = await request.get(link);
        expect(response.status).toBe(404);
    });
})