import {SignUpController} from './signup-controller'
import {MissingParamError, InvalidParamError, ServerError} from '../../errors/index'
import { EmailValidator, AccountModel, AddAccount, AddAccountModel, HttpRequest, Validation } from './signup-protocols'


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

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator{
    isValid(email: string): boolean{
      return true
    }
  }
  return new EmailValidatorStub()
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
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
  validationStub: Validation
}

// a gente começa sempre criando uma instância da classe que estamos testando
// no caso é o SignUpController. A gente costuma chamar a instância dessa classe de 'sut' system under test
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(emailValidatorStub, addAccountStub, validationStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // aqui foi utilizado .toEqual para comparar os resultados, pois estamos comparando dois objetos, e nesse caso
    // estamos comparando o endereço de memória, sendo assim o toBe não serve para esse tipo de comparação
    expect(httpResponse.body).toEqual(new MissingParamError('name')) 
  })

  test('Should return 400 if no email is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com",
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com",
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if password confirmation fails', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: "any_email@mail.com",
        password: 'any_password',
        passwordConfirmation: 'invalid_password_confirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })


  test('Should return 400 if an invalid email is provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest)
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

  // Ao invés de utilizarmos uma factory para  o EmailValidator e estarmos mocando, utilizamos o método
  // .mockImplementationOnce() do jest para mockar um retorno de uma função
  test('Should return 500 if Email validator throws', async () => {
    const {sut, emailValidatorStub} = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
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
})