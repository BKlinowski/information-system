import express, { Response, Request, NextFunction, } from "express"
import path from "path"

const app = express()

const dist = require("./data/disctricts.json")

app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", (path.join(__dirname, "views")))

// express.json()
import authRoutes from "./routes/auth"
app.use("/auth", authRoutes)

import userRoutes from "./routes/user"
app.use(userRoutes)

import adminRoutes from "./routes/admin"
app.use("/admin", adminRoutes)

app.get('/' ,(req: Request, res: Response, next: NextFunction) =>{
    res.render("main", {
        disctricts: dist.disctricts
    })
})

import {get404} from "./controllers/error"

app.use(get404)







app.listen(3000)