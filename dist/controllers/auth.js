"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignup = exports.getLogin = void 0;
const getLogin = (req, res, next) => {
    res.render("auth/login");
};
exports.getLogin = getLogin;
const getSignup = (req, res, next) => {
    res.render("auth/signup");
};
exports.getSignup = getSignup;
