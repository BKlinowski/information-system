"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const app = express_1.default();
const MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbmdu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
    collection: "sessions",
});
const dist = require("./data/disctricts.json");
app.use(express_1.default.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
}));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// express.json()
const auth_1 = __importDefault(require("./routes/auth"));
app.use("/auth", auth_1.default);
const user_1 = __importDefault(require("./routes/user"));
app.use(user_1.default);
const admin_1 = __importDefault(require("./routes/admin"));
app.use("/admin", admin_1.default);
app.get("/", (req, res, next) => {
    res.render("main", {
        disctricts: dist.disctricts,
    });
    res.end();
});
const error_1 = require("./controllers/error");
app.use(error_1.get404);
mongoose_1.default
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbmdu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port ${process.env.PORT || 3000}`);
    });
})
    .catch((err) => {
    console.log(err);
});
