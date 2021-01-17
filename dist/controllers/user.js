"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postWebPush = exports.postSubscribe = exports.getInformations = void 0;
const district_1 = __importDefault(require("../models/district"));
const information_1 = __importDefault(require("../models/information"));
const subscription_1 = __importDefault(require("../models/subscription"));
const mongoose_1 = __importDefault(require("mongoose"));
const getInformations = (req, res, next) => {
    if (req.session.userLoggedIn) {
        district_1.default.find({ subscriptions: mongoose_1.default.Types.ObjectId(req.session.user._id) }).then(async (docs) => {
            const informations = [];
            for (let i = 0; i < docs.length; i++) {
                await information_1.default.find({ districtId: docs[i]._id }).then((info) => {
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
    // console.log(name);
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
                    // console.log(userIds);
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
const postWebPush = (req, res, next) => {
<<<<<<< HEAD
    if (req.session.userLoggedIn) {
        const subscription = req.body.subscription;
        const user = req.session.user;
        let newSub = new subscription_1.default({
            subscription,
            userId: mongoose_1.default.Types.ObjectId(user._id),
        });
        console.log(subscription);
        subscription_1.default
            .exists({ userId: mongoose_1.default.Types.ObjectId(user._id) })
            .then((exist) => {
            if (exist) {
                subscription_1.default
                    .updateOne({ userId: mongoose_1.default.Types.ObjectId(user._id) }, { subscription: subscription })
                    .then((updated) => {
                    // console.log("Updated", updated);
                });
                return res.status(422);
            }
            newSub.save().then((doc) => {
                return res.status(200);
=======
    const subscription = req.body.subscription;
    console.log(subscription);
    const user = req.session.user;
    console.log(user);
    let newSub = new subscription_1.default({
        subscription,
        userId: mongoose_1.default.Types.ObjectId(user._id),
    });
    subscription_1.default.exists({ userId: mongoose_1.default.Types.ObjectId(user._id) }).then((exist) => {
        if (exist) {
            console.log(exist);
            subscription_1.default
                .updateOne({ userId: user._id }, { subscription: subscription })
                .then((updated) => {
                // return res.status(200);
                // console.log("Updated", updated);
            })
                .catch((err) => {
                console.log(err);
>>>>>>> d867022c14c81da4869017727e1d1d28bf1c8f3b
            });
            // return res.status(422);
        }
        else {
            newSub
                .save()
                .then((doc) => {
                // return res.status(200);
            })
                .catch((err) => {
                console.log(err);
            });
        }
    });
};
exports.postWebPush = postWebPush;
