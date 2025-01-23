"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const ApiResponse_1 = require("./ApiResponse");
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(() => {
            res.status(500).json(new ApiResponse_1.ApiResponse(500, null, 'Internal server error'));
        });
    };
};
exports.asyncHandler = asyncHandler;
