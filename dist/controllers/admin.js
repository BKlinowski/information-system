"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddNewInformation = exports.getAddDistrict = void 0;
const getAddDistrict = (req, res, next) => {
    res.render("admin/addDistrict");
};
exports.getAddDistrict = getAddDistrict;
const getAddNewInformation = (req, res, next) => {
    res.render("admin/addInformation");
};
exports.getAddNewInformation = getAddNewInformation;
