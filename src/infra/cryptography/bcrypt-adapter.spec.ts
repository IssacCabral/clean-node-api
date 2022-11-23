import { Encrypter } from "../../data/protocols/encrypter"
import bcrypt from 'bcrypt'
import { BcryptAdapter } from "./bcrypt-adapter"

const salt = 12

jest.mock('bcrypt', () => {
  return {
    async hash(): Promise<string>{
      return 'hash'
    }
  }
})

const makeSut = (): Encrypter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})