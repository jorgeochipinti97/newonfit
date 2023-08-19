
import OrderOnfit from '@/Models/Order';
import { db } from '@/database';





export default function handler(req, res) {


    switch (req.method) {
        case 'POST':
            return createOrder(req, res);;
        case 'GET':
            return getOrders(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async (req, res) => {
    await db.connectDB();
    try {
            const newOrder = new OrderOnfit({ ...req.body, isPaid: false, });
            newOrder.total = Math.round(newOrder.total * 100) / 100;
            console.log(newOrder)
            await newOrder.save();
            await db.disconnect();
            return res.status(201).json(newOrder);


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }
}



const getOrders = async (req, res) => {

    await db.connectDB();
    const orders = await OrderOnfit.find()      
    .sort({ createdAt: 'desc' })
    .lean()
    return res.status(200).json(orders)

}