import express from "express";
import path from "path";
import deleteFile from "./api/delete";
import resize from "./api/resize";
import uploader from "./api/upload";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../../src/html/index.html"));
});

routes.use("/resize", resize);
routes.use("/delete", deleteFile);
routes.use("/upload", uploader); //This feature has no fucntion. Not implemented.

export default routes;
