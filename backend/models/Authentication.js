import mongoose, { now } from "mongoose";

// Schema for Authentication
const authenticationSchema = new mongoose.Schema({
  app_key: {
    type: String,
    required: true,
  },
  app_name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  created: {
    type: Date,
    default: now(),
  },
});

const Auth = mongoose.model("Auth", authenticationSchema);

export default Auth;
