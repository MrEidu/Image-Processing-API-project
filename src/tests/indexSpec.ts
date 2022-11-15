import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe ("Enpoint testing", () => {
    it("Connects to test endpoint", async() => {
        const response = await request.get('/home');
        expect(response.status).toBe(200);
    })
    /* it("Connects to main endpoint", async(done) => {
        const response = await request.get('/api');
        expect(response.type).toBe(200);
        done();
    }) */
});