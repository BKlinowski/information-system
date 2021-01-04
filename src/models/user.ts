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
});

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

export default mongoose.model<UserDoc>("User", userSchema);
