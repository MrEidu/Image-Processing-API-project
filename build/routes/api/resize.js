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
    var current_url, search_params, heightParam, widthParam, fileName, inputFile, imageOnBuffer, output, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
                search_params = current_url.searchParams;
                heightParam = search_params.get('height');
                widthParam = search_params.get('width');
                fileName = search_params.get('file');
                console.log("File name: ".concat(fileName, ", Width: ").concat(widthParam, ", Height: ").concat(heightParam));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                inputFile = path_1.default.join(__dirname, "../../../src/images/stored images/".concat(fileName));
                imageOnBuffer = fs_1.default.readFileSync(inputFile);
                console.log("File ".concat(fileName, " succesfuly found. Resizing..."));
                return [4 /*yield*/, (0, sharp_1.default)(imageOnBuffer)
                        .resize({ height: undefined, width: widthParam })
                        .toBuffer()];
            case 2:
                output = _a.sent();
                //saves image from buffer to file
                fs_1.default.writeFile(path_1.default.join(__dirname, "../../../src/images/thumbnails/".concat(fileName)), output, function (err) {
                    if (err) {
                        console.log("Error: Input Missing. See src/routes/api/resize.ts");
                    }
                    else {
                        console.log("Image stored on thumbnails");
                    }
                });
                res.sendFile(path_1.default.join(__dirname, "../../../src/images/thumbnails/".concat(fileName)));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.send("Error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = resize;
/* const sharpResizer = (
    req: express.Request,
    res: express.Response,
    next: Function
    ): void => {
        const resizeImage = true;
        next();
    } */
