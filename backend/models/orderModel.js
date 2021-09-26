import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: {
            RU: { type: String, required: true},
            UA: { type: String, required: true},
            UK: { type: String, required: true},
        },
        qty: { type: Number, required: true },
        image: { type: Array, required: true },
        priceUSD: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    }],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNum: { type: String, required: true },
        address: { type: String, required: true },
        postOfficeId: { type: String, required: true },
        city: { type: String, required: true },
    },
    shopOrderId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, required: true },
    totalPriceUAH: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;