"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformations = void 0;
const info = require("../data/information.json");
const getInformations = (req, res, next) => {
    res.render("user/informations", {
        info: info.informations,
    });
};
exports.getInformations = getInformations;
