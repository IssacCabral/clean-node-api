import { HttpResponse, HttpRequest } from "./http"

export interface IController{
  handle(httpRequest: HttpRequest): HttpResponse
}