import express from "express";
import resize from "./api/resize";

const routes = express.Router();

routes.get('/', (req,res) => {
    res.send('<h1>Api Processing image home page</h1>');
});

routes.use('/resize',resize);

export default routes;