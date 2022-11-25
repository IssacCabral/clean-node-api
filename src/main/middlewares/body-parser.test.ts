import request from 'supertest'
import app from '../config/app'

// INTEGRATION TESTS
describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({name: 'Issac'})
      .expect({name: 'Issac'})
  })
})