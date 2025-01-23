import { ApiResponse } from "./ApiResponse";
import { Request, Response, NextFunction } from 'express';

interface RequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any> | any;
}

const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(() => {
      res.status(500).json(new ApiResponse(500, null, 'Internal server error'));
    });
  };
};

export { asyncHandler };