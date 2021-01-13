"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const subscriptionSchema = new Schema({
    subscription: {
        endpoint: {
            type: String,
        },
        expirationTime: {
            type: String,
        },
        keys: {
            p256dh: {
                type: String,
            },
            auth: {
                type: String,
            },
        },
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});
exports.default = mongoose_1.default.model("Subscription", subscriptionSchema);
