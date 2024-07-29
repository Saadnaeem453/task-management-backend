import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
