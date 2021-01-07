import { RequestHandler } from "express";

import { validationResult } from "express-validator";

import districtModel from "../models/district";
import informationModel from "../models/information";

import mongoose from "mongoose";

export const getAddDistrict: RequestHandler = (req, res, next) => {
  res.render("admin/addDistrict");
};

export const getAddNewInformation: RequestHandler = (req, res, next) => {
  res.render("admin/addInformation");
};

export const postAddDistrict: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/addDistrict", {
      error: errors.array(),
    });
  } else {
    const name = req.body.name;
    const url = req.body.imageURL;
    const newDistrict = new districtModel({
      name,
      imageURL: url,
    });
    newDistrict.save().then((doc) => {
      return res.redirect("/");
    });
  }
};

export const postAddInformation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/addInformation", {
      error: errors.array(),
    });
  } else {
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const importance = req.body.importance;
    const district = req.body.district;
    districtModel.findOne({ name: district }).then((doc) => {
      if (!doc) {
        return res.redirect("/admin/add-new-information");
      }
      const newInformation = new informationModel({
        title,
        description,
        imageURL,
        importance,
        district,
        districtId: mongoose.Types.ObjectId(doc._id),
      });
      newInformation.save().then(() => {
        return res.redirect("/");
      });
    });
  }
};
