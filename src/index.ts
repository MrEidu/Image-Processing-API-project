import express from "express";
import path from "path";
import routes from "./routes";

const app = express();
const port = 3000;

//send enpoint
app.use('/resize', routes);

//
app.get('/home', (req,res) => {
    res.sendFile(path.join(__dirname, `../src/utilities/homeScreen.html`));
});

//check for port
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

export default app;