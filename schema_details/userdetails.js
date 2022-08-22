require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "username minimum length should be 3"],
    minlength: 3,
  },
  institutionName: {
    type: String,
  },
  branch: {
    type: String,
    required: [true, 'Branch field is required'],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, 'mobile number is required'],
    maxlength: [10, 'mobile number should have length of 10 only'],
    minlength: [10, 'mobile number should have length of 10 only'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm password is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpuser: {
    type: Number
  },
}
//, {timestamps: true}
);
//UserSchema.index({"otpuser":1},{expireAfterSeconds: 10});

// UserSchema.methods.generateAcessToken = async function (req, res, next) {
//   try {
//     const pay_load = { _id: this._id };
//     const options = {
//       expiresIn: "2d",
//     };
//     const acesstoken = jwt.sign(
//       pay_load,
//       options,

//       process.env.TOKEN_SECRET_KEY
//     );
//     return acesstoken;
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send(err);
//   }
// };

const User = new mongoose.model("User", UserSchema);
module.exports = User;
