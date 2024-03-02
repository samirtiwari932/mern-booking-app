import mongoose from "mongoose";

import bcrypt from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
}); // is essentially a middleware for a mongodb .just tell the mongo that any obtained through documents get saved check the pawword has been changed ,if yes hash the password and next() is called which is handled by the database

const User = mongoose.model<UserType>("User", userSchema);

export default User;
