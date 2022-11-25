import env from "../../config/env";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  url: env.DB_CONNECTION,
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  entities: [__dirname + "/entities/*{.ts,.js}"]
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default dataSource;
