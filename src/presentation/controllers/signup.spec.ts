import {SignUpController} from './signup-controller'
import { EmailValidator } from '../protocols.ts/email-validator'
import {MissingParamError, InvalidParamError, ServerError} from '../errors/index'

interface SutTypes{
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

// a gente começa sempre criando uma instância da classe que estamos testando
// no caso é o SignUpController. A gente costuma chamar a instância dessa classe de 'sut' system under test
const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator{
    isValid(email: string): boolean{
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // aqui foi utilizado .toEqual para comparar os resultados, pois estamos comparando dois objetos, e nesse caso
    // estamos comparando o endereço de memória, sendo assim o toBe não serve para esse tipo de comparação
    expect(httpResponse.body).toEqual(new MissingParamError('name')) 
  })

  test('Should return 400 if no email is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com",
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com",
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const {sut, emailValidatorStub} = makeSut()
    // estou usando o jest para alterar o valor do retorno de uma função
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "invalid_email@mail.com", // o texto que eu coloco aqui não faz diferença para o nosso teste. isso é para dar semântica
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  // Esse teste é para evitar de lá no controller, que o método isValid seja chamado
  // com um email que não seja o passado na request 
  test('Should call EmailValidator with correct email', () => {
    const {sut, emailValidatorStub} = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com",
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com")
  })

  test('Should return 500 if Email validator throws', () => {
    class EmailValidatorStub implements EmailValidator{
      isValid(email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com", 
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

})