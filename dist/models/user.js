"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    permissions: {
        type: Number,
        required: true,
    },
    subscriptions: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: false,
            },
        },
    ],
});
exports.default = mongoose_1.default.model("User", userSchema);
