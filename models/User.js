
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    fullname: { type: String},
    email: { type: String },
    password: { type: String},
    img: { type: String},
    profession: { type: String},
    birthday: { type: Date},
    address: { type: String},
    phone: { type: String},
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);