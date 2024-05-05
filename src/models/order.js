import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required!'],
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Restaurant is required!'],
    },
    items: [
        {
            itemId: {
                type: Schema.Types.ObjectId,
                required: [true, 'Menu item id is required!'],
            },
            menuItem: {
                type: String,
                required: [true, 'Menu item name is required!'],
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required!'],
            },
            price: {
                type: Number,
                required: [true, 'Price is required!'],
            },
        },
    ],
    deliveryFee: {
        type: Number,
        required: [true, 'Delivery Fee is required!'],
    },
    serviceFee: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required!'],
    },
    paid: {
        type: Boolean,
        default: false,
    },
    orderStatus: {
        type: String,
        enum: ['accepted', 'preparing', 'ready_for_delivery', 'delivered'],
        default: 'accepted',
    },
    deliveryPerson: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Delivery person is required!'],
    },
    estimatedArrivalTime: {
        type: String,
        default: '',
    },
    deliveryContactInfo: {
        type: String,
        default: '',
    },
    feedback: {
        type: String,
        default: '',
    },
    
}, {
    timestamps: true // Add createdAt and updatedAt fields
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
