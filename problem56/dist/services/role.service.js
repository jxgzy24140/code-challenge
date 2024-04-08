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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../helpers/data-source");
const Role_entity_1 = require("../models/Role.entity");
class RoleService {
    constructor() {
        this.roleRepository = data_source_1.AppDataSource.getRepository(Role_entity_1.Role);
    }
    createRole(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRole = this.roleRepository.create(input);
                yield this.roleRepository.save(newRole);
                return newRole;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateRole(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.roleRepository.update(id, input);
                return yield this.roleRepository.findOne({
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
                const role = yield this.roleRepository.findOne({
                    where: { id },
                });
                if (!role)
                    return null;
                yield this.roleRepository.delete(id);
                return role;
            }
            catch (_a) {
                return null;
            }
        });
    }
    get(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return ((_a = (yield this.roleRepository.findOne({
                    where: { id },
                }))) !== null && _a !== void 0 ? _a : null);
            }
            catch (_b) {
                return null;
            }
        });
    }
    getAll(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.roleRepository.find({
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new RoleService();
