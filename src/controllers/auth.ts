import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import User from "../models/user";

export const getLogin: RequestHandler = (req, res, next) => {
  res.render("auth/login");
  res.end();
};

export const getSignup: RequestHandler = (req, res, next) => {
  res.render("auth/signup");
  res.end();
};

export const postSignup: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      error: errors.array(),
    });
  }
  User.exists({ email: req.body.email }).then((result) => {
    if (!result) {
      const user = new User(req.body);
      user.save().then((data) => {
        res.redirect("/");
        res.end();
      });
    }
  });
};
