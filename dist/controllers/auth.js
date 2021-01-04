"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.postSignup = exports.getSignup = exports.getLogin = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    else {
        const email = req.body.email;
        const password = req.body.password;
        bcrypt_1.default.hash(password, 12).then((hash) => {
            const user = new user_1.default({
                email,
                password: hash,
            });
            user.save().then((data) => {
                res.redirect("/");
                res.end();
            });
        });
    }
};
exports.postSignup = postSignup;
const postLogin = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("auth/login", {
            error: errors.array(),
        });
    }
    else {
        user_1.default.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                return res.status(422).render("auth/login", {
                    error: [{ msg: "Email or password invalid" }],
                });
            }
            console.log("USER: ", user);
            bcrypt_1.default
                .compare(req.body.password, user.password)
                .then(() => {
                req.session.user = user;
                req.session.isLoggedIn = true;
                res.status(200).redirect("/");
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
};
exports.postLogin = postLogin;
