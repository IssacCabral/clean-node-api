import {SignUpController} from './signup-controller'

// a gente começa sempre criando uma instância da classe que estamos testando
// no caso é o SignUpController. A gente costuma chamar a instância dessa classe de 'sut' system under test
describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

})