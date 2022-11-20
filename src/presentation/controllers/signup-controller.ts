import { IController } from "../protocols.ts/controller"
import { HttpRequest, HttpResponse } from "../protocols.ts/http";

export class SignUpController implements IController{
  handle(httpRequest: HttpRequest): HttpResponse {
    if(!httpRequest.body.name){
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if(!httpRequest.body.email){
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }

}