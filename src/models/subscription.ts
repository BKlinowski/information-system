import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export interface SubscriptionDoc extends mongoose.Document {
  subscription: {
    endpoint: string;
    expirationTime: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
  userId: mongoose.Types.ObjectId;
}

export default mongoose.model<SubscriptionDoc>(
  "Subscription",
  subscriptionSchema
);
