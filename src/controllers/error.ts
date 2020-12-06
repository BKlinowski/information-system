import {RequestHandler} from "express"

export const get404: RequestHandler = (req, res, next) => {
    res.status(404).render("404.ejs")
}