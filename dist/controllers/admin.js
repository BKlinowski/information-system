"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAddInformation = exports.postAddDistrict = exports.getAddNewInformation = exports.getAddDistrict = void 0;
const express_validator_1 = require("express-validator");
const district_1 = __importDefault(require("../models/district"));
const information_1 = __importDefault(require("../models/information"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAddDistrict = (req, res, next) => {
    res.render("admin/addDistrict");
};
exports.getAddDistrict = getAddDistrict;
const getAddNewInformation = (req, res, next) => {
    res.render("admin/addInformation");
};
exports.getAddNewInformation = getAddNewInformation;
const postAddDistrict = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("admin/addDistrict", {
            error: errors.array(),
        });
    }
    else {
        const name = req.body.name;
        const url = req.body.imageURL;
        const newDistrict = new district_1.default({
            name,
            imageURL: url,
        });
        newDistrict.save().then((doc) => {
            return res.redirect("/");
        });
    }
};
exports.postAddDistrict = postAddDistrict;
const postAddInformation = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("admin/addInformation", {
            error: errors.array(),
        });
    }
    else {
        const title = req.body.title;
        const description = req.body.description;
        const imageURL = req.body.imageURL;
        const importance = req.body.importance;
        const district = req.body.district;
        district_1.default.findOne({ name: district }).then((doc) => {
            if (!doc) {
                return res.redirect("/admin/add-new-information");
            }
            const newInformation = new information_1.default({
                title,
                description,
                imageURL,
                importance,
                district,
                districtId: mongoose_1.default.Types.ObjectId(doc._id),
            });
            newInformation.save().then(() => {
                return res.redirect("/");
            });
        });
    }
};
exports.postAddInformation = postAddInformation;
