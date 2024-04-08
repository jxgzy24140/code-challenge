"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const User_entity_1 = require("../models/User.entity");
const user_1 = require("../dtos/user");
const userProfile = (mapper) => {
    (0, core_1.createMap)(mapper, User_entity_1.User, user_1.UserDto, (0, core_1.forMember)((dest) => dest.roleName, (0, core_1.mapFrom)((x) => x.role.roleName)), (0, core_1.forMember)((dest) => dest.password, (0, core_1.ignore)()));
    (0, core_1.createMap)(mapper, User_entity_1.User, user_1.UserRakingDto, (0, core_1.forMember)((dest) => dest.fullName, (0, core_1.mapFrom)((x) => x.firstName + x.lastName)));
};
exports.default = userProfile;
