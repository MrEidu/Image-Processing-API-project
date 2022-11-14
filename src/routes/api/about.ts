import express from "express";

const about = express.Router();

about.get('/', (req,res) => {
    res.send('<h1>Api Processing image</h1>');
});

export default about;