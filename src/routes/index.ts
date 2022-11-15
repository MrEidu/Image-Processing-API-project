import express from "express";
import preview from "./api/preview";

const routes = express.Router();

routes.get('/', (req,res) => {
    res.send('<h1>Api Processing image</h1>');
});

routes.use('/preview',preview);

export default routes;