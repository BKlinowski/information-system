"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformations = void 0;
const info = require("../data/information.json");
const getInformations = (req, res, next) => {
    res.render("user/information", {
        info: info.information
    });
};
exports.getInformations = getInformations;
