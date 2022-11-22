import {EmailValidatorAdapter} from './email-validator-adapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => {
  const sut = new EmailValidatorAdapter()
  return sut
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid =  sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid =  sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })
})