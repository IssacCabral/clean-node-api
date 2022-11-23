import { Encrypter } from "../../data/protocols/encrypter"
import bcrypt from 'bcrypt'
import { BcryptAdapter } from "./bcrypt-adapter"

const salt = 12

const makeSut = (): Encrypter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})