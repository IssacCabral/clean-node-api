import { HttpRequest, HttpResponse, IController } from "../../protocols";
import {badRequest, ok, serverError} from '../../helpers/http-helper'
import {InvalidParamError, MissingParamError} from '../../errors/index'
import { EmailValidator } from "../signup/signup-protocols";

export class LoginController implements IController{
  constructor(
    private readonly emailValidator: EmailValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredFields = ["email", "password"]
      
      for(const field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParamError(field))
        }
      }

      const {email} = httpRequest.body

      this.emailValidator.isValid(email)
    } catch(error){
      return serverError()
    }
  }

}