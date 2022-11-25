import "reflect-metadata"
import "../infra/db/typeorm/data-source"
import app from './config/app'
import env from '../infra/config/env'

const SERVER_PORT = env.SERVER_PORT 

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})