//WORK WITH DB


import {OrderModel} from '../../db/schemas'
import {Order, OrderStatus,StatusCount} from '../../types/index'


export class orderRepository {

    constructor(private orderModel: typeof OrderModel) { 

    }
    async save(order: Order): Promise<Order> { 
        try{ 
            const existingOrder = await this.orderModel.findOne({
                orderId: order.orderId
            })
            if(!existingOrder) { 
                const newOrder = await this.orderModel.create(order); 
                return newOrder
            }else { 
                const updatedOrder = await this.orderModel.findOneAndUpdate(
                    {orderId: order.orderId },
                    order, 
                    {new: true}
                );
                if(!updatedOrder) { 
                    throw new Error('Ошибка: ордер не найден при обновлении')
                }
                return updatedOrder; 
            }
        }catch(error){
            throw error;
        }

    }

    async findById(orderId: string, ) : Promise<Order> { 
        try{
            const existingOrder = await this.orderModel.findOne({
            orderId: orderId
            })
            if(!existingOrder) { 
                throw new Error('Ордер не найден')
            }
            return existingOrder
        }catch(error) { 
            throw error
        }    
    }

    async findAll(): Promise<Order[]> { 
        try{
            const allOrders = await this.orderModel.find()
            return allOrders
        }catch(error) { 
            throw error;
        }
    }

    async findByStatus(status: OrderStatus): Promise<Order[]> { 
        try{
            const orderByStatus = await this.orderModel.find({
                status 
            })
            return orderByStatus
        } catch(error) { 
            throw error
        }
    }

    async findByMarket(market: string ): Promise<Order[]> { 
        try{
            const orderByMarket = await this.orderModel.find({
                market
            })
            if(!orderByMarket) { 
                throw new Error('По данному маркету отсутсвуют ордера')
            }
            return orderByMarket
        }catch(error) { 
            console.log('Произошла ошибка')
            throw error
        }
    }


    async findActive(): Promise<Order[]> { 
        try{ 
            const orderActive = await this.orderModel.find({
                status: OrderStatus.FILLED, 
                closedAt: null
            })
            return orderActive
        }catch(error) { 
            throw error
        }
    }

    async countByStatus(): Promise<StatusCount> { 
        try{
            const result = { 
                FILLED: 0, 
                PENDING: 0, 
                CANCELLED: 0, 
                FAILED: 0, 
           }
           result.FILLED = await this.orderModel.countDocuments({
               status: OrderStatus.FILLED
           })
           result.PENDING = await this.orderModel.countDocuments({
               status: OrderStatus.PENDING
           })
           result.FAILED = await this.orderModel.countDocuments({
               status: OrderStatus.FAILED
           })
           result.CANCELLED = await this.orderModel.countDocuments({
               status: OrderStatus.CANCELLED
           })
           return result
        }catch (error){ 
            throw error 
        }
    }

    async update(updates: Partial<Order>, orderId: string): Promise<Order> { 
        try{
            const order = await this.orderModel.findOne({
                orderId: orderId
            })
            if(!order) { 
                throw new Error('Ордер не найден')
            }
            const updateOrder = await this.orderModel.findOneAndUpdate(
                {orderId: order.orderId}, 
                updates, 
                {new: true},
            )
            if(!updateOrder) { 
                throw new Error('Не удалось обновить ордер')
            }
            return updateOrder
        }catch (error){ 
            throw error 
        }
    }
}