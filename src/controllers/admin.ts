import { RequestHandler } from "express";

import { validationResult } from "express-validator";
import webpush from "web-push";

import districtModel from "../models/district";
import informationModel from "../models/information";
import subscriptionModel from "../models/subscription";

import mongoose from "mongoose";

export const getAddDistrict: RequestHandler = (req, res, next) => {
  res.render("admin/addDistrict", {
    isEdit: false,
    name: null,
    imageURL: null,
    oldName: "",
    error: null,
  });
};

export const getAddNewInformation: RequestHandler = (req, res, next) => {
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

export const postAddDistrict: RequestHandler = (req, res, next) => {
  const isEdit = req.body.isEdit == "true" ? true : false;
  const errors = validationResult(req);
  // console.log("ADD DISTRICT", errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/addDistrict", {
      isEdit,
      error: errors.array(),
      name: req.body.name,
      imageURL: req.body.imageURL,
      oldName: req.body.oldName,
    });
  } else {
    const name = req.body.name;
    const url = req.body.imageURL;
    const newDistrict = new districtModel({
      name,
      imageURL: url,
    });
    if (isEdit) {
      const oldName = req.body.oldName;
      // console.log("OLD", oldName);
      districtModel
        .updateOne(
          { name: oldName },
          {
            name,
            imageURL: url,
          }
        )
        .then((doc) => {
          return res.redirect("/");
        });
    } else {
      newDistrict.save().then((doc) => {
        return res.redirect("/");
      });
    }
  }
};

export const postAddInformation: RequestHandler = (req, res, next) => {
  const isEdit = req.body.isEdit == "true" ? true : false;
  const errors = validationResult(req);
  const title = req.body.title;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const importance = req.body.importance;
  const district = req.body.district;
  const oldName = req.body.oldName;
  // console.log(errors.array());
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
  } else {
    districtModel.findOne({ name: district }).then((doc) => {
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

      const newInformation = new informationModel({
        title,
        description,
        imageURL,
        importance,
        districtId: mongoose.Types.ObjectId(doc._id),
      });
      if (isEdit) {
        const oldName = req.body.oldName;
        // console.log("OLD", oldName);
        // console.log(district);
        informationModel
          .updateOne(
            { title: oldName },
            {
              title,
              description,
              importance,
              imageURL,
              districtId: mongoose.Types.ObjectId(doc._id),
            }
          )
          .then(() => {
            for (let i = 0; i < doc.subscriptions.length; i++) {
              subscriptionModel.findOne({ userId: doc.subscriptions[i] }).then(async (sub) => {
                if (sub) {
                  await webpush.setVapidDetails("mailto:informationApp@test.org", process.env.PUBLIC_VAPID_KEY!, process.env.PRIVATE_VAPID_KEY!);
                  const payload = JSON.stringify({
                    title,
                    description,
                    importance,
                    imageURL,
                    district,
                  });

                  webpush.sendNotification(sub.subscription, payload).catch((err) => {
                    console.log(err);
                  });
                }
              });
            }
            return res.redirect("/");
          });
      } else {
        newInformation.save().then(async () => {
          for (let i = 0; i < doc.subscriptions.length; i++) {
            await subscriptionModel.findOne({ userId: doc.subscriptions[i] }).then(async (sub) => {
              if (sub) {
                await webpush.setVapidDetails("mailto:informationApp@test.org", process.env.PUBLIC_VAPID_KEY!, process.env.PRIVATE_VAPID_KEY!);
                console.log(process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
                const payload = JSON.stringify({
                  title,
                  description,
                  importance,
                  imageURL,
                  district,
                });
                await webpush.sendNotification(sub.subscription, payload);
              }
            });
          }
          return res.redirect("/");
        });
      }
    });
  }
};

export const getEditDistricts: RequestHandler = (req, res, next) => {
  districtModel.find((err, docs) => {
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

export const getEditInformations: RequestHandler = (req, res, next) => {
  informationModel
    .find()
    .populate("districtId")
    .then(async (docs) => {
      // console.log(docs);
      res.render("admin/editInformations", {
        info: docs,
      });
    });
};

export const postEditInformation: RequestHandler = (req, res, next) => {
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

export const postEditDistrict: RequestHandler = (req, res, next) => {
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

export const postDeleteDistrict: RequestHandler = async (req, res, next) => {
  await districtModel.deleteOne({ name: req.body.name });
  res.redirect("/admin/edit-districts");
};

export const postDeleteInformation: RequestHandler = async (req, res, next) => {
  await informationModel.deleteOne({ title: req.body.title });
  res.redirect("/admin/edit-informations");
};
