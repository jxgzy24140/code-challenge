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
const express = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const identityMiddleware_1 = require("../../middlewares/identityMiddleware");
const router = express.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const result = yield auth_service_1.default.login(input);
    if (!result)
        return res.status(200).json({ succes: false, message: "login failed" });
    return res
        .status(200)
        .json({ success: true, message: "success", data: result });
}));
router.get("/get-current-login-infomation", identityMiddleware_1.identityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!id)
        return null;
    const user = yield auth_service_1.default.getCurrentLoginInfomation(id);
    if (!user)
        return res.status(400).json({ success: false, message: "Invalid token" });
    return res.status(200).json({
        success: true,
        message: "success",
        data: user,
    });
}));
exports.default = router;
