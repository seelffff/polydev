import {ApiKeyCreds, ClobClient, OrderType, Side,} from '@polymarket/clob-client'; 
import {Wallet} from 'ethers'; 
import dotenv from 'dotenv'; 
import {Order, OrderSide, OrderOptions, OrderStatus} from '../types'
import { CLOB_CONFIG } from '../config/constants';
import {OrderPayload} from '../types'

dotenv.config()


class Arms {
    private clobClient: ClobClient | null = null; 
    private signer: Wallet; 
    private walletAddress: string; 

    constructor() { 
        const privateKey = process.env.POLYMARKET_PRIVATE_KEY
        if(!privateKey) { 
            throw new Error('POLYMARKET_PRIVATE_KEY не найден в .env')
        }
        this.signer = new Wallet(privateKey!)
        this.walletAddress = this.signer.address; 
    }

    async initialize(): Promise<void> { 
        const tempClient = new ClobClient ( 
            CLOB_CONFIG.host,
            CLOB_CONFIG.chainId,
            this.signer,
            undefined,  // creds пока нет!
            CLOB_CONFIG.signatureType,          // EOA
            undefined   // нет фундера
          );

          const creds = await tempClient.createOrDeriveApiKey();

          this.clobClient = new ClobClient(
            CLOB_CONFIG.host,
            CLOB_CONFIG.chainId,
            this.signer,
            creds,      
            CLOB_CONFIG.signatureType,
             undefined
          )
    }
    async createOrder(tokenId: string, side: OrderSide, price: number, size: number, options?: OrderOptions): Promise<Order> { 
         if(!this.clobClient)  {
            throw new Error('Ошибка инициализации клоб клиента')
         }

        const clobSide = side === OrderSide.BUY ? Side.BUY : Side.SELL;
        const tickSize = options?.tickSize || CLOB_CONFIG.defaultTickSize;
        const negRisk = options?.negRisk ?? CLOB_CONFIG.defaultNegRisk;
        const orderType = options?.orderType || CLOB_CONFIG.defaultOrderType;
        
        const orderData = { 
            tokenID: tokenId, 
            price: price, 
            size: size, 
            side: clobSide,
        }
        const response = await this.clobClient.createAndPostOrder(orderData, {tickSize: tickSize as any, negRisk} )

        if(!response.success) { 
            throw new Error(response.errorMsg)
        }   
        
        const order = {
            orderId: response.orderID,
            market: tokenId,
            side: side,
            status: OrderStatus.PENDING,    // Новый ордер = PENDING
            price: price,
            size: size,
            openedAt: new Date(),           // Сейчас
            orderType: 'limit' as const
            }
            return order
        }
 
        async cancelOrder(orderId: string): Promise<void> { 
            if(!this.clobClient) { 
                throw new Error('Ошибка инициализации клоб клиента')
            }   
            try {
                const response = await this.clobClient.cancelOrder({orderID: orderId});

                if(!response.canceled.includes(orderId)) { 
                    const reason = response.not_canceled[orderId] || 'Неизвестная ошибка';
                    throw new Error(`Ошибка отмены оредра: ${reason}`);

                }

            }catch(error) { 
                if(error instanceof Error) { 
                    throw new Error(`Ошибка при отмене ордера ${orderId}: ${error.message}`)
                }
                throw new Error(`Ошибка при отмене ордера ${orderId}: неизвестная ошибка`);
            }

        }
        
    }



