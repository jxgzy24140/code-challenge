"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../dtos/user");
const autoMapper_1 = __importDefault(require("../helpers/autoMapper"));
const data_source_1 = require("../helpers/data-source");
const User_entity_1 = require("../models/User.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    }
    login(input) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email: input.email },
                relations: ["role"],
            });
            if (!user)
                return null;
            const isValidPassword = yield bcryptjs_1.default.compare(input.password, user.password);
            if (!isValidPassword)
                return null;
            const payload = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            const tokenSecretKey = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
            const accessToken = jsonwebtoken_1.default.sign(payload, tokenSecretKey, {
                expiresIn: "1h",
            });
            return {
                accessToken: accessToken,
                user: autoMapper_1.default.map(user, User_entity_1.User, user_1.UserDto),
            };
        });
    }
    getCurrentLoginInfomation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id },
                relations: ["role"],
            });
            return user ? autoMapper_1.default.map(user, User_entity_1.User, user_1.UserDto) : null;
        });
    }
}
exports.default = new AuthService();
