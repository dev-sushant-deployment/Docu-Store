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
exports.DocuStore = void 0;
const axios_1 = __importDefault(require("axios"));
class DocuStore {
    constructor() {
        this.put = (key, content) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(`${DocuStore.STORAGE_FACILITY_URL}/put`, { key, content });
        });
        this.get = (key) => __awaiter(this, void 0, void 0, function* () {
            const { data: { data: { content } } } = yield axios_1.default.post(`${DocuStore.STORAGE_FACILITY_URL}/get`, { key });
            return content;
        });
        this.list = (key) => __awaiter(this, void 0, void 0, function* () {
            const { data: { data: { files } } } = yield axios_1.default.post(`${DocuStore.STORAGE_FACILITY_URL}/list`, { key });
            return files;
        });
        this.delete = (key) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(`${DocuStore.STORAGE_FACILITY_URL}/delete`, { key });
        });
    }
}
exports.DocuStore = DocuStore;
DocuStore.STORAGE_FACILITY_URL = 'https://docu-store.vercel.app';
//# sourceMappingURL=index.js.map