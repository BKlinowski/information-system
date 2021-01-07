"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminLoggedIn = (req, res, next) => {
    if (!req.session.adminLoggedIn) {
        return res.redirect("/auth/login");
    }
    next();
};
exports.default = adminLoggedIn;
