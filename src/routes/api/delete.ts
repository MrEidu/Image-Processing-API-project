import express from "express";
import { deleter } from "./utilities/delete";
import { getValues } from "./utilities/urlParameters";
import path from "path";
const deleteImage = express.Router();

deleteImage.get("/", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../../../src/html/api/delete.html"));
});

//Get called by routes/index
deleteImage.get(
  "/delete",
  async (req: express.Request, res: express.Response) => {
    //will obtain the values to use in sharp from the url
    const current_url = new URL(
      req.protocol + "://" + req.get("host") + req.originalUrl
    );
    //this will contain values from parameters from url
    let urlParameters: [string, number | undefined, number | undefined] = [
      "",
      undefined,
      undefined,
    ];
    //bool to see if url was good or should not process further
    let validURL = true;
    // urlParameters index means: [0] = namefile, [1] = width, [2] = height,
    //try and catch to see if there's something wrong with the url parameters
    try {
      urlParameters = getValues(current_url);
    } catch (error) {
      res.status(400).send(`400 Bad Request: ${error}`);
      validURL = false;
    }
    if (validURL) {
      if (await deleter(urlParameters[0]))
        res.send(`
        <h3>File Deleted succesfully</h3>
        <h3><i><a href="/api/delete">Go back</a></i></h3>
    `);
      else {
        res
          .status(404)
          .send(
            `404 Not Found: File does not exist or has been already deleted`
          );
      }
    }
  }
);

export default deleteImage;
/*
Documentation and the aid to reach a solution was from the following links:
    Search Parameters
    * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    FS
    * This one was from notes from the course
    * For readfilesyng: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
    Links in server:
    * https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
*/
