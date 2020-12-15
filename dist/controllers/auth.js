"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignup = exports.getSignup = exports.getLogin = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const getLogin = (req, res, next) => {
    res.render("auth/login");
    res.end();
};
exports.getLogin = getLogin;
const getSignup = (req, res, next) => {
    res.render("auth/signup");
    res.end();
};
exports.getSignup = getSignup;
const postSignup = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("auth/signup", {
            error: errors.array(),
        });
    }
    user_1.default.exists({ email: req.body.email }).then((result) => {
        if (!result) {
            const user = new user_1.default(req.body);
            user.save().then((data) => {
                res.redirect("/");
                res.end();
            });
        }
    });
};
exports.postSignup = postSignup;
