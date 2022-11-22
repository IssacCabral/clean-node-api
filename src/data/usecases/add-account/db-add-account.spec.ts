import { Encrypter } from '../../protocols/encrypter'
import {DbAddAccount} from './db-add-account'

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter{
      async encrypt(value: string): Promise<string>{
        return 'hashed_password'
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
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
})