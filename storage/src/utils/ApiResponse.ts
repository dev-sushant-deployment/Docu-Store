interface IApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
}

class ApiResponse implements IApiResponse {
  constructor(
    statusCode : number,
    data : any, 
    message = "Request was successful",
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
}

export { ApiResponse };