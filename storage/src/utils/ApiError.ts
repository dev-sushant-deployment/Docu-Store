interface IApiError {
  statusCode: number;
  message: string;
  error: any[];
  stack?: string;
}

class ApiError extends Error implements IApiError {
  constructor(
    statusCode : number, 
    message = "An error occurred while processing your request",
    error = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null,
    this.message = message;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  statusCode: number;
  data: any;
  success: boolean;
  error: any[];
}

export { ApiError };