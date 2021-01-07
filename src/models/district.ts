import mongoose from "mongoose";

const Schema = mongoose.Schema;

const districtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
});

export interface DistrictDoc extends mongoose.Document {
  name: string;
  imageURL: string;
  subscriptions: Array<mongoose.Types.ObjectId>;
}

export default mongoose.model<DistrictDoc>("District", districtSchema);
