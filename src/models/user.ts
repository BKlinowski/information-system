import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

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

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  permissions: number;
  subscriptions: [
    userId: {
      _id: mongoose.ObjectId;
    }
  ];
}

export default mongoose.model<UserDoc>("User", userSchema);
