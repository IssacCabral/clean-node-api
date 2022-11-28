import request from 'supertest'
import app from '../../config/app'
import dataSource from '../../../infra/db/typeorm/data-source'
import {Account} from '../../../infra/db/typeorm/entities/account'

describe('Signup routes', () => {
  beforeAll(async () => {
    await dataSource.initialize()
  })

  afterAll(async () => {
    await dataSource.getRepository(Account).clear()
    await dataSource.destroy()
  })

  beforeEach(async () => {
    await dataSource.getRepository(Account).clear()
  })

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