"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var resize = express_1.default.Router();
//Get called by routes/index
resize.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageOnBuffer, current_url, search_params, heightParam, widthParam, fileName, heightNumber, widthNumber, matched, inputFile, data, error_1, abort404, output, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
                search_params = current_url.searchParams;
                heightParam = search_params.get('height');
                widthParam = search_params.get('width');
                fileName = search_params.get('file');
                if (!(fileName == null)) return [3 /*break*/, 1];
                res.status(400).send("Error 400 Bad Request: A file name must be provided");
                return [3 /*break*/, 12];
            case 1:
                heightNumber = heightParam != null ? parseInt(heightParam) : undefined;
                widthNumber = widthParam != null ? parseInt(widthParam) : undefined;
                matched = true;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                //this try is for opening the file
                try {
                    inputFile = path_1.default.join(__dirname, "../../../src/images/thumbnails/".concat(fileName));
                    //attempts to read file to use as input for sharp
                    imageOnBuffer = fs_1.default.readFileSync(inputFile);
                }
                catch (error) {
                    //thumbnail doesn't exist to there is no match
                    matched = false;
                }
                if (!matched) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, sharp_1.default)(imageOnBuffer).metadata()];
            case 3:
                data = _a.sent();
                //if data doesnt' match parameters, its not a match
                if (!(data.width == widthNumber && data.height == heightNumber ||
                    widthNumber == undefined && data.height == heightNumber ||
                    data.width == widthNumber && heightNumber == undefined)) {
                    matched = false;
                }
                res.locals.thumbnailStatus = "Thumbnail already existed, loaded existing thumbnail";
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                matched = false;
                res.locals.messageError = "Sharp failed to process aready existing thumbnail metadata";
                console.log(res.locals.messageError);
                return [3 /*break*/, 6];
            case 6:
                abort404 = false;
                if (!matched) return [3 /*break*/, 7];
                res.end(imageOnBuffer);
                return [3 /*break*/, 11];
            case 7:
                _a.trys.push([7, 10, , 11]);
                //attempts tp read file to use as input for sharp
                try {
                    imageOnBuffer = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../src/images/stored images/".concat(fileName)));
                }
                catch (error) {
                    abort404 = true;
                }
                if (!!abort404) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, sharp_1.default)(imageOnBuffer)
                        .resize({ height: heightNumber, width: widthNumber })
                        .toBuffer()];
            case 8:
                output = _a.sent();
                //saves image from buffer to file
                fs_1.default.writeFile(path_1.default.join(__dirname, "../../../src/images/thumbnails/".concat(fileName)), output, function (err) {
                    if (err) {
                        console.log("Image could not be saved on the thumbnails folder");
                    }
                    else {
                        console.log("Image stored on thumbnails folder");
                    }
                });
                //If all went okay, it loads the output image and sends log of success
                res.locals.thumbnailStatus = "Thumbnail created from stored images";
                console.log("Thumbnail Created");
                res.end(output);
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_2 = _a.sent();
                //If it goes wrong, it sends an error message
                res.locals.failed = true;
                return [3 /*break*/, 11];
            case 11:
                if (res.locals.failed && !abort404) {
                    res.status(400).send("Error 400 Bad Request: ".concat(res.locals.messageError));
                }
                else if (abort404) {
                    res.status(404).send("Error 404: File not found");
                }
                _a.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
exports.default = resize;
