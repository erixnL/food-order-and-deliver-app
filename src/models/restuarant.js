import mongoose, {model, models, Schema} from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema({
//   image: {type: String},
  name: {type: String},
  description: {type: String},
  basePrice: {type: Number},
  sizes: {type:[ExtraPriceSchema]},
  extraIngredientPrices: {type:[ExtraPriceSchema]},
}, {timestamps: true});

const ResstaurantInfoSecham = new Schema({
  name: {type: String},
  image: {type: String},
  address: {type: String},
  phone: {type: String},
  category: {type: String},
  menu: {type: [MenuItemSchema]},
}, {timestamps: true});

export const ResstaurantInfo = models?.ResstaurantInfo || model('ResstaurantInfo', ResstaurantInfoSecham);