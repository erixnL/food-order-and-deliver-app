import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
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
        enum: ['customer', 'delivery_person'],
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
});

const User = models.User || model("User", UserSchema);

export default User;