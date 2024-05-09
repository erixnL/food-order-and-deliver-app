import { Schema, model, models } from 'mongoose';

const CartItemSchema = new Schema({
    _id: false,
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity
    },
    itemName: {
        type: String,
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    phone: {
        type: String,
        unique: [true, 'Phone already exists!'],
        required: [true, 'Phone is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    password: {
        type: String,
        required: [true, 'Invalid password!'],
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
    },
    postcode: {
        type: String,
        required: [true, 'Postcode is required!'],
    },
    role: {
        type: String,
        enum: ['customer', 'delivery_person', 'restaurant'],
        required: [true, 'Role is required!'],
    },
    membership: {
        type: String,
        enum: ['none', 'monthly', 'yearly'],
        default: 'none',
    },
    payment: {
        cardNumber: {
            type: String,
            required: function() {
                return this.membership !== 'none';
            },
        },
        cardExpiry: {
            type: String,
            required: function() {
                return this.membership !== 'none';
            },
        },
        cardCVV: {
            type: String,
            required: function() {
                return this.membership !== 'none';
            },
        },
    },
    orderHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    cart: {
        items: [CartItemSchema], // Use the CartItemSchema for items array
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'resturant'
    }
});

const User = models.User || model("User", UserSchema);

export default User;