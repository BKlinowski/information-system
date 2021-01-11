"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteInformation = exports.postDeleteDistrict = exports.postEditDistrict = exports.postEditInformation = exports.getEditInformations = exports.getEditDistricts = exports.postAddInformation = exports.postAddDistrict = exports.getAddNewInformation = exports.getAddDistrict = void 0;
const express_validator_1 = require("express-validator");
const district_1 = __importDefault(require("../models/district"));
const information_1 = __importDefault(require("../models/information"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAddDistrict = (req, res, next) => {
    res.render("admin/addDistrict", {
        isEdit: false,
        name: null,
        imageURL: null,
        oldName: "",
        error: null,
    });
};
exports.getAddDistrict = getAddDistrict;
const getAddNewInformation = (req, res, next) => {
    res.render("admin/addInformation", {
        isEdit: false,
        title: null,
        description: null,
        importance: null,
        imageURL: null,
        district: null,
        oldName: "",
        error: null,
    });
};
exports.getAddNewInformation = getAddNewInformation;
const postAddDistrict = (req, res, next) => {
    const isEdit = req.body.isEdit == "true" ? true : false;
    const errors = express_validator_1.validationResult(req);
    console.log("ADD DISTRICT", errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("admin/addDistrict", {
            isEdit,
            error: errors.array(),
            name: req.body.name,
            imageURL: req.body.imageURL,
            oldName: req.body.oldName,
        });
    }
    else {
        const name = req.body.name;
        const url = req.body.imageURL;
        const newDistrict = new district_1.default({
            name,
            imageURL: url,
        });
        if (isEdit) {
            const oldName = req.body.oldName;
            // console.log("OLD", oldName);
            district_1.default
                .updateOne({ name: oldName }, {
                name,
                imageURL: url,
            })
                .then((doc) => {
                return res.redirect("/");
            });
        }
        else {
            newDistrict.save().then((doc) => {
                return res.redirect("/");
            });
        }
    }
};
exports.postAddDistrict = postAddDistrict;
const postAddInformation = (req, res, next) => {
    const isEdit = req.body.isEdit == "true" ? true : false;
    const errors = express_validator_1.validationResult(req);
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const importance = req.body.importance;
    const district = req.body.district;
    const oldName = req.body.oldName;
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(422).render("admin/addInformation", {
            error: errors.array(),
            isEdit,
            title,
            description,
            importance,
            imageURL,
            district,
            oldName,
        });
    }
    else {
        district_1.default.findOne({ name: district }).then((doc) => {
            if (!doc) {
                return res.status(422).render("admin/addInformation", {
                    error: [{ msg: "There is no district with this name!" }],
                    isEdit,
                    title,
                    description,
                    importance,
                    imageURL,
                    district,
                    oldName,
                });
            }
            const newInformation = new information_1.default({
                title,
                description,
                imageURL,
                importance,
                districtId: mongoose_1.default.Types.ObjectId(doc._id),
            });
            if (isEdit) {
                const oldName = req.body.oldName;
                console.log("OLD", oldName);
                console.log(district);
                information_1.default
                    .updateOne({ title: oldName }, {
                    title,
                    description,
                    importance,
                    imageURL,
                    districtId: mongoose_1.default.Types.ObjectId(doc._id),
                })
                    .then((doc) => {
                    return res.redirect("/");
                });
            }
            else {
                newInformation.save().then(() => {
                    return res.redirect("/");
                });
            }
        });
    }
};
exports.postAddInformation = postAddInformation;
const getEditDistricts = (req, res, next) => {
    district_1.default.find((err, docs) => {
        if (err) {
            console.log(err);
        }
        if (!docs) {
            return res.redirect("/");
        }
        return res.render("admin/editDistricts", {
            districts: docs,
        });
    });
};
exports.getEditDistricts = getEditDistricts;
const getEditInformations = (req, res, next) => {
    information_1.default
        .find()
        .populate("districtId")
        .then(async (docs) => {
        // console.log(docs);
        res.render("admin/editInformations", {
            info: docs,
        });
    });
};
exports.getEditInformations = getEditInformations;
const postEditInformation = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const importance = req.body.importance;
    const district = req.body.district;
    res.render("admin/addInformation", {
        isEdit: true,
        title,
        description,
        imageURL,
        importance,
        district,
        oldName: title,
        error: null,
    });
};
exports.postEditInformation = postEditInformation;
const postEditDistrict = (req, res, next) => {
    const name = req.body.name;
    const imageURL = req.body.imageURL;
    res.render("admin/addDistrict", {
        isEdit: true,
        name,
        imageURL,
        oldName: name,
        error: null,
    });
};
exports.postEditDistrict = postEditDistrict;
const postDeleteDistrict = async (req, res, next) => {
    await district_1.default.deleteOne({ name: req.body.name });
    res.redirect("/admin/edit-districts");
};
exports.postDeleteDistrict = postDeleteDistrict;
const postDeleteInformation = async (req, res, next) => {
    await information_1.default.deleteOne({ title: req.body.title });
    res.redirect("/admin/edit-informations");
};
exports.postDeleteInformation = postDeleteInformation;
