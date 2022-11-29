import { HttpRequest, HttpResponse, IController } from "../../protocols";
import {badRequest, ok, serverError} from '../../helpers/http-helper'
import {InvalidParamError, MissingParamError} from '../../errors/index'
import { EmailValidator } from "../signup/signup-protocols";
import { Authentication } from "../../../domain/usecases/authentication";

export class LoginController implements IController{
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredFields = ["email", "password"]
      
      for(const field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParamError(field))
        }
      }

      const {email, password} = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if(!isValid){
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)
    } catch(error){
      return serverError(error)
    }
  }

}