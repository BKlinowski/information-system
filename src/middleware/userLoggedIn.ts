import { RequestHandler } from "express";

const userLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
};

export default userLoggedIn;
