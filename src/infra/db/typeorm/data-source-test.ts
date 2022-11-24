import env from "../../config/env";
import { DataSource } from "typeorm";

const dataSourceTest = new DataSource({
  type: "mysql",
  host: env.TYPEORM_HOST_TEST,
  port: Number(env.TYPEORM_PORT_TEST),
  username: env.TYPEORM_USERNAME_TEST,
  password: env.TYPEORM_PASSWORD_TEST,
  database: env.TYPEORM_DATABASE_TEST,
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  entities: [__dirname + "/entities/*{.ts,.js}"],
});

dataSourceTest
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default dataSourceTest;
