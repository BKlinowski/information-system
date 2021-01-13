"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postLogin = exports.postSignup = exports.getSignup = exports.getLogin = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const getLogin = (req, res, next) => {
    res.render("auth/login", {
        error: null,
    });
    res.end();
};
exports.getLogin = getLogin;
const getSignup = (req, res, next) => {
    res.render("auth/signup", {
        error: null,
    });
    res.end();
};
exports.getSignup = getSignup;
const postSignup = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    // console.log(errors.array());
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
                permissions: 0,
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
    // console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("auth/login", {
            error: [{ msg: "Email or password invalid" }],
        });
    }
    else {
        user_1.default.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                return res.status(422).render("auth/login", {
                    error: [{ msg: "Email or password invalid" }],
                });
            }
            // console.log("USER: ", user);
            bcrypt_1.default
                .compare(req.body.password, user.password)
                .then((doMatch) => {
                if (doMatch) {
                    req.session.user = user;
                    req.session.userLoggedIn = true;
                    req.session.adminLoggedIn = user.permissions >= 10 ? true : false;
                    return req.session.save((err) => {
                        console.log(err);
                        res.status(200).redirect("/");
                    });
                }
                res.redirect("login");
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
};
exports.postLogin = postLogin;
const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
    });
};
exports.postLogout = postLogout;
