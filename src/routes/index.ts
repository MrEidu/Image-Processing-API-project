import express from "express";
import resize from "./api/resize";

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send(`
        <h1>Api Processing image home page < /h1>
        <p > Try the following links: </p>
        <ul>
            <li>http://localhost:3000/api/resize?file=015.jpg&width=500&height=100</li>
            <li>http://localhost:3000/api/resize?file=20211219_141722%201.jpg&width=200</li>
        </ul>
    `);
});

routes.use('/resize', resize);

export default routes;