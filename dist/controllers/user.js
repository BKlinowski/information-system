"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSubscribe = exports.getInformations = void 0;
const info = require("../data/information.json");
const district_1 = __importDefault(require("../models/district"));
const information_1 = __importDefault(require("../models/information"));
const mongoose_1 = __importDefault(require("mongoose"));
const getInformations = (req, res, next) => {
    if (req.session.userLoggedIn) {
        district_1.default
            .find({ subscriptions: mongoose_1.default.Types.ObjectId(req.session.user._id) })
            .then(async (docs) => {
            const informations = [];
            for (let i = 0; i < docs.length; i++) {
                await information_1.default
                    .find({ districtId: docs[i]._id })
                    .then((info) => {
                    if (info) {
                        for (let j = 0; j < info.length; j++) {
                            informations.push({
                                doc: info[j],
                                districtName: docs[i].name,
                            });
                        }
                    }
                });
            }
            // console.log(informations);
            res.render("user/informations", {
                info: informations.reverse(),
            });
        });
    }
};
exports.getInformations = getInformations;
const postSubscribe = (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    district_1.default.findOne({ name }).then((doc) => {
        if (!doc) {
            return res.redirect("/");
        }
        let userIds = [];
        const userId = mongoose_1.default.Types.ObjectId(req.session.user._id);
        if (!doc.subscriptions) {
            userIds.push(userId);
        }
        else {
            userIds = [...doc.subscriptions];
            {
                if (userIds.some((val) => String(val) == String(userId))) {
                    userIds = userIds.filter((id) => String(id) !== String(userId));
                    console.log(userIds);
                }
                else {
                    userIds.push(userId);
                }
            }
            district_1.default.updateOne({ name }, { subscriptions: userIds }).then(() => {
                res.redirect("/");
            });
        }
    });
};
exports.postSubscribe = postSubscribe;
