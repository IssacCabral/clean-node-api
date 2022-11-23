import { Encrypter } from '../../protocols/encrypter'
import {DbAddAccount} from './db-add-account'

interface SutTypes{
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter{
    async encrypt(value: string): Promise<string>{
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const {sut, encrypterStub} = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    /**
     * como é o controller que chama esse método, então name, email e password são campos
     * que já foram devidamente validadados lá no controlador. Por isso estamos criando
     * essa variável accountData com os campos 'valid_name', 'valid_email' e 'valid_password' 
     */
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const {sut, encrypterStub} = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

})