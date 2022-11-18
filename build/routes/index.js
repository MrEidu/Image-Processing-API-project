"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./api/resize"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send("\n        <h1>Api Processing image home page < /h1>\n        <p > Try the following links: </p>\n        <ul>\n            <li>http://localhost:3000/api/resize?file=015.jpg&width=500&height=100</li>\n            <li>http://localhost:3000/api/resize?file=20211219_141722%201.jpg&width=200</li>\n        </ul>\n    ");
});
routes.use('/resize', resize_1.default);
exports.default = routes;
