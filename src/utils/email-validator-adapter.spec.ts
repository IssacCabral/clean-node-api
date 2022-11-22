import {EmailValidatorAdapter} from './email-validator-adapter'
import validator from 'validator'

/**aqui eu moco para true o valor de retorno da função isEmail de validator 
 * pois não estamos interessados em como a biblioteca validator vai fazer 
 * a implementação, mas estamos interessados que quando EmailValidatorAdapter
 * chamar a função isValid com um email válida, essa função retorne true e vice versa */
jest.mock('validator', () => {
  return {
    isEmail(): boolean{
      return true
    }
  }
})

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

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })

})