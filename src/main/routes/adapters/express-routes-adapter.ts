import { Request, Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../../../presentation/protocols"

export class ExpressAdapter{
  static adaptRoute(controller: IController){
    return async function(request: Request, response: Response){
      const httpRequest: HttpRequest = {
        body: request.body
      }

      const httpResponse: HttpResponse = await controller.handle(httpRequest)
      if(httpResponse.statusCode >= 200 && httpResponse.statusCode < 300){
        return response.status(httpResponse.statusCode).json(httpResponse.body)
      }else{
        return response.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }
  }
}