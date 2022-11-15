"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var port = 3000;
//send enpoint
app.use('/resize', routes_1.default);
//
app.get('/home', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../src/utilities/homeScreen.html"));
});
//check for port
app.listen(port, function () { return console.log("Server started at http://localhost:".concat(port)); });
exports.default = app;
