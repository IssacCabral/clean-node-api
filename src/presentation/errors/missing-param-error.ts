export class MissingParamError extends Error{
  constructor(paramName: string){
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError' // boa prática setar o name com o nome do erro da classe
  }
}