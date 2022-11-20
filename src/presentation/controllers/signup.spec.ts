import {SignUpController} from './signup-controller'

// a gente começa sempre criando uma instância da classe que estamos testando
// no caso é o SignUpController. A gente costuma chamar a instância dessa classe de 'sut' system under test
describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // aqui foi utilizado .toEqual para comparar os resultados, pois estamos comparando dois objetos, e nesse caso
    // estamos comparando o endereço de memória, sendo assim o toBe não serve para esse tipo de comparação
    expect(httpResponse.body).toEqual(new Error('Missing param: name')) 
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })

})