import env from "../../config/env";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  url: env.DB_CONNECTION,
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  entities: [__dirname + "/entities/*.{ts,js}"]
});

console.log(__dirname + "/entities")

export default dataSource;
