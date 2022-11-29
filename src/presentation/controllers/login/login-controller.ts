import { HttpRequest, HttpResponse, IController } from "../../protocols";
import {badRequest, ok, serverError} from '../../helpers/http-helper'
import {InvalidParamError, MissingParamError} from '../../errors/index'

export class LoginController implements IController{
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredFields = ["email", "password"]
      
      for(const field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParamError(field))
        }
      }

    } catch(error){
      return serverError()
    }
  }

}