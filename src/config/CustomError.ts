export class httpError extends Error {
  statusCode: number;
  constructor(message:string, statusCode:number) {
    super(message);
    this.statusCode = statusCode;
  }
}
export function errorHandler(error: any, res: any){
  if (error.statusCode) return res.status(error.statusCode).json({message: error.message}); else return res.status(500).json({message:'Internal server error'});
}