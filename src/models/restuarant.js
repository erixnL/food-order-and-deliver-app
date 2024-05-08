import { Schema, model, models } from 'mongoose';

const MenuItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Menu item price is required!'],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Restaurant email is required!'],
    },
    phone: {
        type: String,
        required: [true, 'Restaurant phone number is required!'],
    },
    address: {
        type: String,
        required: [true, 'Street address is required!'],
    },
    postcode: {
        type: String,
        required: [true, 'Postcode is required!'],
    },
    openingHours: {
        type: String,
        required: [true, 'Opening hours are required!'],
    },
    category: {
        type: String,
        required: [true, 'Restaurant category is required!'],
    },
    ratings: {
        averageRating: {
            type: Number,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
    },
    menu: [MenuItemSchema],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    revenueReports: {
        daily: {
            type: Number,
            default: 0,
        },
        weekly: {
            type: Number,
            default: 0,
        },
        monthly: {
            type: Number,
            default: 0,
        },
    },
    owner: {
        type: String
    }
});

const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);

export default Restaurant;