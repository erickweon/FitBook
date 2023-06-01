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
exports.userRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userRouter = (0, express_1.Router)();
// Requires email, password, name of user
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password === undefined) {
        res.status(400).json({ message: "Password is required" });
        return;
    }
    if (req.body.email === undefined) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    if (req.body.name === undefined) {
        res.status(400).json({ message: "Name is required" });
        return;
    }
    // Hashing password here
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const password = bcrypt_1.default.hashSync(req.body.password, salt);
    const user = new User_1.User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        age: 0,
        weight: 0,
        height: 0,
    });
    user.save()
        .then((data) => {
        return res.json(data);
    })
        .catch((err) => {
        return res.status(500).json({ message: err });
    });
}));
// Requires email and password to identify
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password === undefined) {
        res.status(400).json({ message: "Password is required" });
        return;
    }
    if (req.body.email === undefined) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    const user = yield User_1.User.findOne({ email: req.body.email });
    if (user === null) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const password = bcrypt_1.default.compareSync(req.body.password, user.password);
    if (!password) {
        res.status(400).json({ message: "Password incorrect" });
        return;
    }
    return res.json(user);
}));
exports.userRouter.get('/signout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //For now, we don't need to do anything here since we are using sessions
}));
