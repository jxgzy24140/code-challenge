import { DataSource } from "typeorm";
import { User } from "../models/User.entity";
import { Role } from "../models/Role.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "code_challenge",
  synchronize: true,
  // entities: ["dist/models/*.ts"],
  entities: [User, Role],
});
