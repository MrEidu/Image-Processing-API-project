import supertest from 'supertest';
import app from '../index';
import sharpResize from '../utilities/resizeImage';

const request = supertest(app);

describe("Enpoint testing", () => {
    it("Connects to test endpoint", async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});
describe("Sharp dependency testing", () => {
    it("Sharp creates a new Thumbnail", async () => {
        expect(sharpResize).toBeTrue();
    });
})