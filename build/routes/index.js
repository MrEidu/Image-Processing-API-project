"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var delete_1 = __importDefault(require("./api/delete"));
var resize_1 = __importDefault(require("./api/resize"));
var upload_1 = __importDefault(require("./api/upload"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../src/html/index.html'));
});
routes.use('/resize', resize_1.default);
routes.use('/delete', delete_1.default);
routes.use('/upload', upload_1.default); //This feature has no fucntion. Not implemented.
exports.default = routes;
