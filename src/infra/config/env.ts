import env from 'dotenv'

env.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

export default {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION
}