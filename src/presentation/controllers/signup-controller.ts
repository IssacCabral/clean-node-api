import { IController } from "../protocols.ts/controller"
import { HttpRequest, HttpResponse } from "../protocols.ts/http";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";

export class SignUpController implements IController{
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["name", "email", "password", "passwordConfirmation"]

    for(const field of requiredFields){
      if(!httpRequest.body[field]){
        return badRequest(new MissingParamError(field))
      }
    }
  }

}