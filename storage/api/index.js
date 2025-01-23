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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const promises_1 = require("fs/promises");
const AsyncHandler_1 = require("./utils/AsyncHandler");
const ApiResponse_1 = require("./utils/ApiResponse");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const basePath = process.env.PROJECT_MODE === 'production' ? '/tmp' : __dirname;
app.get('/', (_req, res) => {
    res.send('Welcome to the storage service');
});
app.post('/put', (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key, content } = req.body;
    try {
        if (!key || !content)
            res.status(400).json(new ApiResponse_1.ApiResponse(400, null, 'Key and content are required'));
        const filePath = (0, path_1.join)(basePath, 'store', key);
        const keyToStore = String(key).split('/').slice(0, -1).join('/');
        const storePath = (0, path_1.join)(basePath, 'store', keyToStore);
        yield (0, promises_1.mkdir)(storePath, { recursive: true });
        yield (0, promises_1.writeFile)(filePath, content);
        res.status(200).json(new ApiResponse_1.ApiResponse(200, null, 'Data stored successfully'));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json(new ApiResponse_1.ApiResponse(500, null, errorMessage));
    }
})));
app.post('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key } = req.body;
    const filePath = (0, path_1.join)(basePath, 'store', key);
    try {
        const content = yield (0, promises_1.readFile)(filePath, 'utf-8');
        res.status(200).json(new ApiResponse_1.ApiResponse(200, { content }, 'Data retrieved successfully'));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const statusCode = (error instanceof Error && 'code' in error && error.code === 'ENOENT') ? 404 : 500;
        res.status(statusCode).json(new ApiResponse_1.ApiResponse(statusCode, null, errorMessage));
    }
}));
app.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key } = req.body;
    const filePath = (0, path_1.join)(basePath, 'store', key);
    try {
        yield (0, promises_1.rm)(filePath, { recursive: true });
        res.status(200).json(new ApiResponse_1.ApiResponse(200, null, 'Data deleted successfully'));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const statusCode = (error instanceof Error && 'code' in error && error.code === 'ENOENT') ? 404 : 500;
        res.status(statusCode).json(new ApiResponse_1.ApiResponse(statusCode, null, errorMessage));
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = (req, res) => {
    app(req, res);
};
