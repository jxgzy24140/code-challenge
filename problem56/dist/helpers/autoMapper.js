"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const classes_1 = require("@automapper/classes");
const index_1 = require("./index");
const mapper = (0, core_1.createMapper)({
    strategyInitializer: (0, classes_1.classes)(),
});
(0, core_1.addProfile)(mapper, index_1.userProfile);
exports.default = mapper;
