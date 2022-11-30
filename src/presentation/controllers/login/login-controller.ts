import { HttpRequest, HttpResponse, IController, EmailValidator, Authentication } from "./login-protocols";
import {badRequest, serverError, unauthorized, ok} from '../../helpers/http-helper'
import {InvalidParamError, MissingParamError} from '../../errors/index'

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

      const accessToken = await this.authentication.auth(email, password)

      if(!accessToken){
        return unauthorized()
      }
      
      return ok({accessToken})
    } catch(error){
      return serverError(error)
    }
  }

}