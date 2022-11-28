import "reflect-metadata"
import "../infra/db/typeorm/data-source"
import app from './config/app'
import env from '../infra/config/env'
import dataSource from "../infra/db/typeorm/data-source"

const SERVER_PORT = env.SERVER_PORT 

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
   .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
