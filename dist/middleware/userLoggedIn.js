"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    next();
};
exports.default = userLoggedIn;
