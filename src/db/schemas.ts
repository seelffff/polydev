import {Schema, model} from 'mongoose'
import {Order, OrderStatus, OrderSide} from '../types'
const orderSchema = new Schema({
    orderId : { 
        type: String,
        required: true, 
        unique: true, 
        index: true
    }, 
    market: {
        type: String, 
        required: true,
        
    },
    price: { 
        type: Number, 
        required: true,
    }, 
    side: { 
        type: String,
        enum: [OrderSide.BUY, OrderSide.SELL], 
        required: true,
    }, 
    orderType: { 
        type: String, 
        enum: ['LIMIT', 'MARKET'],
        required: true, 
    },
    size: { type: Number, required: true },
    status: { type: String, required: true },    
    openedAt: { type: Date, required: true },
    closedAt: { type: Date },
    exitPrice: { type: Number },
    pnl: { type: Number },
    pnlPercent: { type: Number },
    fee: { type: Number },
    blockchain: {type: Schema.Types.Mixed} ,
    error: { type: String },
})

export const OrderModel = model<Order>('Order', orderSchema);