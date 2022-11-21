import { badRequest, serverError } from "../helpers/http-helper";
import {MissingParamError, InvalidParamError} from '../errors/index'
import {IController, HttpRequest, HttpResponse, EmailValidator} from '../protocols/index'

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