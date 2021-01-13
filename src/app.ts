import express, { Response, Request, NextFunction } from "express";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import { UserDoc } from "./models/user";
import districtModel from "./models/district";
import webpush from "web-push";

declare module "express-session" {
  interface Session {
    user: UserDoc;
    userLoggedIn: boolean;
    adminLoggedIn: boolean;
  }
}

declare let process: {
  env: {
    SESSION_SECRET: string;
    NODE_ENV: string;
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_DEFAULT_DATABASE: string;
    PORT: number;
  };
};

const app = express();
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbmdu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
  collection: "sessions",
});
const dist = require("./data/disctricts.json");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.userLoggedIn = req.session.userLoggedIn;
  res.locals.adminLoggedIn = req.session.adminLoggedIn;
  res.locals.user = req.session.user;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// express.json()
import authRoutes from "./routes/auth";
app.use("/auth", authRoutes);

import userRoutes from "./routes/user";
app.use(userRoutes);

import adminRoutes from "./routes/admin";
app.use("/admin", adminRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  districtModel.find((err, docs) => {
    res.render("main", {
      districts: docs,
    });
    console.log(err);
  });
});

import { get404 } from "./controllers/error";

app.use(get404);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbmdu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
