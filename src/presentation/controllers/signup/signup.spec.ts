import {SignUpController} from './signup-controller'
import {MissingParamError, InvalidParamError, ServerError} from '../../errors/index'
import { EmailValidator, AccountModel, AddAccount, AddAccountModel, HttpRequest, Validation } from './signup-protocols'
import { badRequest } from '../../helpers/http-helper'

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      name: 'any_name',
      email: "any_email@mail.com",
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation{
    validate(input: any): Error | null{
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount{
    async add(account: AddAccountModel): Promise<AccountModel>{
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      } 
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

interface SutTypes{
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

// a gente começa sempre criando uma instância da classe que estamos testando
// no caso é o SignUpController. A gente costuma chamar a instância dessa classe de 'sut' system under test
const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const {sut, addAccountStub} = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com", 
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with correct values', () => {
    const {sut, addAccountStub} = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: "any_email@mail.com",
      password: 'any_password',
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const {sut, addAccountStub} = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: "valid_email@mail.com", 
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        email: "valid_email@mail.com", 
        password: 'valid_password',
    })
  })

  test('Should call Validation with correct value', () => {
    const {sut, validationStub} = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const {sut, validationStub} = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
  
})