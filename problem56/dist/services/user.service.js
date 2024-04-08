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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const autoMapper_1 = __importDefault(require("../helpers/autoMapper"));
const data_source_1 = require("../helpers/data-source");
const user_1 = require("../dtos/user");
const User_entity_1 = require("../models/User.entity");
const socketio_service_1 = __importDefault(require("./socketio.service"));
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        this.io = socketio_service_1.default.getIO();
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedUser = yield this.userRepository.findOne({
                    where: { email: input.email },
                });
                if (existedUser)
                    return null;
                const salt = yield bcryptjs_1.default.genSalt(10);
                input.password = yield bcryptjs_1.default.hash(input.password, salt);
                const newUser = this.userRepository.create(input);
                yield this.userRepository.save(newUser);
                return newUser;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateUser(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { id } });
                if (!user)
                    return null;
                Object.keys(input).forEach((key) => {
                    // @ts-ignore
                    const value = input[key];
                    if (value && key !== "password") {
                        // @ts-ignore
                        user[key] = value;
                    }
                });
                yield this.userRepository.save(user);
                return yield this.userRepository.findOne({
                    where: { id },
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { id },
                });
                if (!user)
                    return null;
                yield this.userRepository.delete(id);
                return user;
            }
            catch (_a) {
                return null;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { id },
                    relations: ["role"],
                });
                if (!user)
                    return null;
                return autoMapper_1.default.map(user, User_entity_1.User, user_1.UserDto);
            }
            catch (_a) {
                return null;
            }
        });
    }
    getAll(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.find({
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                    relations: ["role"],
                });
                console.log(users);
                return users.length ? autoMapper_1.default.mapArray(users, User_entity_1.User, user_1.UserDto) : [];
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getTenUsersHighestScores() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.find({
                    order: {
                        scores: "DESC",
                    },
                    take: 10,
                });
                return autoMapper_1.default.mapArray(users, User_entity_1.User, user_1.UserRakingDto);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateUserScore(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.get(id);
                if (!user)
                    return null;
                const newScores = Number(user.scores) + Number(input.scores);
                user.scores = newScores;
                yield this.userRepository.save(user);
                const isUpdated = yield this.checkRankingIsUpdated(id);
                if (isUpdated) {
                    socketio_service_1.default.sendMessage("update-ranking", isUpdated);
                }
                return this.get(id);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    checkRankingIsUpdated(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentRanking = yield this.getTenUsersHighestScores();
            const userExistsInRanking = currentRanking.some((x) => x.id == userId);
            return userExistsInRanking ? currentRanking : false;
        });
    }
}
exports.default = new UserService();
