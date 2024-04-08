"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../models/User.entity");
const Role_entity_1 = require("../models/Role.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "code_challenge",
    synchronize: true,
    // entities: ["dist/models/*.ts"],
    entities: [User_entity_1.User, Role_entity_1.Role],
});
