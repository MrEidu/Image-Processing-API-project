"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./api/resize"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('<h1>Api Processing image home page</h1>');
});
routes.use('/resize', resize_1.default);
exports.default = routes;
