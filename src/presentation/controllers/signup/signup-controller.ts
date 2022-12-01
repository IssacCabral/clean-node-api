import {IController, HttpRequest, HttpResponse, EmailValidator, AddAccount, Validation} from './signup-protocols'
import {InvalidParamError} from '../../errors/index'
import { badRequest, serverError, ok } from "../../helpers/http-helper";

export class SignUpController implements IController{
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation?: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      if(this.validation){
        const error = this.validation.validate(httpRequest.body)
        if(error){
          return badRequest(error)
        }
      }
      const {name, email, password} = httpRequest.body
      const account = await this.addAccount.add({name, email, password})
      return ok(account)
    } catch(error){
      return serverError(error)
    }
  }
}