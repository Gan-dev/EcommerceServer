const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true
    },
    description: {
      type: String,
      required: [true, "La descripcion tiene que ser obligatoria"],
      minlength: [10, "La descripcion debe tener por lo menos 10 caractares"]
    },
    category: {
      type: String,
      required: [true, "Debes introducir el tipo de producto es"]
    },
    price: {
      type: Number,
      required: [true, "Debe tener precio"],
      min: [0, "el precio tiene que ser un numero real"]
    },
    image: {
      type: String,
      required: [true, "El producto tiene que tiener una imagen"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      rate: {
        type: Number
      },
      rating: {
        type: Number
      }
    }
  },
  {
    timestamps: true
  },
);

const Product = model("Product", productSchema);

module.exports = Product;
