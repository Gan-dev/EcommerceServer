const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: [true, "Usuario Obligatorio"],
      minlength: [3, "el nombre de usuario es demasiado corto"]
    },
    avatar: {
      type: String,
    },
    birth: {
      type: Date,
      required: [true, "Debes introducir tu edad cruck"]
    },
    cart: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
