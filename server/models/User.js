const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
      default: "",
    },
    wallpaper: {
      type: String,
      required: false,
      default: "",
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      defaut: false,
    },
    decs:{
      type:String,
      max:50
    },
    city:{
      type:String,
      max:50
    },
    from:{
      type:String,
      max:50
    },
    relationShip:{
      type: Number,
      enum: [1,2,3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
