import express from 'express';
import path from 'path';

const uploader = express.Router();

uploader.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../../src/html/api/upload.html'));
});

export default uploader;