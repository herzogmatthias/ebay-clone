import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  bids: [],
  products: [],
});

export default mongoose.model("User", UserSchema);
