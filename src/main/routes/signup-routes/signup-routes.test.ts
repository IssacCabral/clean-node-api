import request from 'supertest'
import app from '../../config/app'

describe('Signup routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'Issac Cabral',
        email: 'issac@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})