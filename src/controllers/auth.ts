import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

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
  } else {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then((hash) => {
      const user = new User({
        email,
        password: hash,
      });
      user.save().then((data) => {
        res.redirect("/");
        res.end();
      });
    });
  }
};

export const postLogin: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      error: errors.array(),
    });
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          error: [{ msg: "Email or password invalid" }],
        });
      }
      console.log("USER: ", user);
      bcrypt
        .compare(req.body.password, user.password)
        .then(() => {
          req.session.user = user;
          req.session.isLoggedIn = true;
          res.status(200).redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
};
