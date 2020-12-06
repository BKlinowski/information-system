import {RequestHandler} from "express"

export const getLogin: RequestHandler = (req, res, next) => {
    res.render("auth/login")
}

export const getSignup: RequestHandler = (req, res, next) => {
    res.render("auth/signup")
}