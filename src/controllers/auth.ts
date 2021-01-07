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
        permissions: 0,
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
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user;
            req.session.userLoggedIn = true;
            req.session.adminLoggedIn = user.permissions >= 10 ? true : false;
            return req.session.save((err) => {
              console.log(err);
              res.status(200).redirect("/");
            });
          }
          res.redirect("login");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
