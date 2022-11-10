import express from "express";



const routes = express.Router();

routes.get('/', (req,res) => {
    res.send('<h1>Api Processing image</h1>');
});

export default routes;