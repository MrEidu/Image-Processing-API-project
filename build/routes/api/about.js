"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var about = express_1.default.Router();
about.get('/', function (req, res) {
    var current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    var search_params = current_url.searchParams;
    var height = search_params.get('height');
    var width = search_params.get('width');
    var grayscale = search_params.get('grayscale');
    res.send("tags");
});
exports.default = about;
