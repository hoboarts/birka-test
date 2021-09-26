import express from 'express';
import expressAsyncHandler from 'express-async-handler';
//import data from '../data.js';
import Config from '../models/configModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, payVerif } from '../utils.js';

const orderRouter = express.Router();

/* orderRouter.get('/ss', expressAsyncHandler(async (req, res) => {
    const createdConf = await Config.insertMany(data.config);
    res.send({ createdConf });
})); */

orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

        const orders = await Order.find({}).populate(
            'user',
            'name'
        );
        res.set('Cache-Control', 'public, max-age=1').send(orders);
    })
);

orderRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPriceUAH' },
                },
            },
        ]);
        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPriceUAH' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const productCategories = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.set('Cache-Control', 'public, max-age=1').send({ users, orders, dailyOrders, productCategories });
    })
);

orderRouter.get('/history', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.set('Cache-Control', 'public, max-age=1').send(orders);
}));

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 3001 });
    } else {
        const count = await Config.find({ type: 'ShopOrdCounter' });
        const itemDecrementer = await Config.find({ type: 'StockQtyDecrementer' });
        const order = new Order({
            shopOrderId: (String(count[0].value).substr(0, 2) + ("-") + String(count[0].value).substr(2, 6)),
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            totalPriceUAH: req.body.totalPriceUAH,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        count[0].value ++;
        await count[0].save();
        if (itemDecrementer[0].useIt) {
            order.orderItems.map(async item => {
                const opItem = await Product.findById(item.product);
                opItem.countInStock -= item.qty;
                await opItem.save();
            });
        };
        res.status(201).set('Cache-Control', 'public, max-age=1').send({ message: 3002, order: createdOrder });
    }
}));

orderRouter.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.set('Cache-Control', 'public, max-age=1').send(order);
    } else {
        res.status(404).send({ message: 3003 });
    }
}));

orderRouter.post('/verif', payVerif, expressAsyncHandler(async (req, res) => {
    const parsedMd = JSON.parse(req.body.merchant_data);
    const order = await Order.findById((parsedMd[0].value));
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();
        res.redirect(`/order/${parsedMd[0].value}`);
    } else { res.redirect('/') };
}));

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({ message: 3007, order: deleteOrder });
        } else {
            res.status(404).send({ message: 3003 });
        }
    })
);

orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.set('Cache-Control', 'public, max-age=1').send({ message: 3008, order: updatedOrder });
        } else {
            res.status(404).send({ message: 3003 });
        }
    })
);

export default orderRouter;