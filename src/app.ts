import express, { Response, Request, NextFunction, } from "express"
import path from "path"

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", (path.join(__dirname, "views")))

// express.json()



app.use('/' ,(req: Request, res: Response, next: NextFunction) =>{
    res.render("main")
})

app.listen(3000)