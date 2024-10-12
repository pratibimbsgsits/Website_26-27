import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false ,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    batch : {
      type: String,
      required: true
    },
    branch : {
      type : String,
      required : true
    },
    enrollment : {
      type : String,
      required : true
    }

  },
  { timestamps: true }
);

const User = mongoose.model('User',userSchema);

export default User;
