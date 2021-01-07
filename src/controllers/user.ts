import { RequestHandler } from "express";
const info = require("../data/information.json");

import districtModel from "../models/district";
import informationModel from "../models/information";
import { InformationDoc } from "../models/information";

import mongoose from "mongoose";
import userLoggedIn from "../middleware/userLoggedIn";

export const getInformations: RequestHandler = (req, res, next) => {
  if (req.session.userLoggedIn) {
    districtModel
      .find({ subscriptions: mongoose.Types.ObjectId(req.session.user._id) })
      .then(async (docs) => {
        const informations: Array<Object> = [];
        for (let i = 0; i < docs.length; i++) {
          await informationModel
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

export const postSubscribe: RequestHandler = (req, res, next) => {
  const name = req.body.name;
  console.log(name);
  districtModel.findOne({ name }).then((doc) => {
    if (!doc) {
      return res.redirect("/");
    }
    let userIds = [];
    const userId = mongoose.Types.ObjectId(req.session.user._id);
    if (!doc.subscriptions) {
      userIds.push(userId);
    } else {
      userIds = [...doc.subscriptions];
      {
        if (userIds.some((val) => String(val) == String(userId))) {
          userIds = userIds.filter((id) => String(id) !== String(userId));
          console.log(userIds);
        } else {
          userIds.push(userId);
        }
      }
      districtModel.updateOne({ name }, { subscriptions: userIds }).then(() => {
        res.redirect("/");
      });
    }
  });
};
