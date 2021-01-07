import { RequestHandler } from "express";

const adminLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.session.adminLoggedIn) {
    return res.redirect("/auth/login");
  }
  next();
};

export default adminLoggedIn;
