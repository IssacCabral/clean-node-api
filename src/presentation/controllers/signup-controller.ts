import { IController } from "../protocols.ts/controller"
import { HttpRequest, HttpResponse } from "../protocols.ts/http";
import { badRequest, serverError } from "../helpers/http-helper";
import { EmailValidator } from "../protocols.ts/email-validator";
import {MissingParamError, InvalidParamError} from '../errors/index'

export class SignUpController implements IController{
  constructor(
    private readonly emailValidator: EmailValidator
  ) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try{
      const requiredFields = ["name", "email", "password", "passwordConfirmation"]
      for(const field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body['email'])
      if(!isValid){
        return badRequest(new InvalidParamError('email'))
      }
    } catch(error){
      return serverError()
    }
  }

}