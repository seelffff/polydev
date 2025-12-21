export enum OrderSide { 
    BUY = 'BUY', 
    SELL = 'SELL'
}
export enum OrderStatus { 
    PENDING = 'PENDING',
    FILLED = 'FILLED',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}

export interface Order { 
    orderId: string; 
    market: string; 

    price: number
    size: number 

    openedAt: Date;
    closedAt?: Date; 
    
    exitPrice?: number; 
    pnl?: number; 
    pnlPercent?: number; 

    error?: string;

    orderType: 'limit' | 'market'; 
    fee?: number;
    blockchain?: { 
        txHash?: string; 
        timestamp: number; 
        blockNumber: number; 
    }
}

export interface Position {
    market: string;
    side: OrderSide;
    tokens: number;
    entryPrice: number;
    currentPrice: number;
    unrealizedPnL: number;
    percentChange: number;
  }
  
  // === WALLET STATS REPORT ===
  
  export interface WalletStatsReport {
    // === ИДЕНТИФИКАЦИЯ ===
    walletAddress: string;
    username?: string;
    profileUrl?: string;
    twitterHandle?: string;
    createdAt: Date;
  
    // === ТЕКУЩЕЕ СОСТОЯНИЕ ===
    currentBalance: number;
    totalPortfolioValue: number;
    activePositionsCount: number;
    activePositions: Position[];
    unrealizedPnL: number;
  
    // === СТАТИСТИКА ТОРГОВЛИ ===
    totalTradesExecuted: number;
    winCount: number;
    lossCount: number;
    breakEvenCount: number;
    winRate: number;
    winLossRatio: number;
  
    // === PNL ПО ВРЕМЕННЫМ ПРОМЕЖУТКАМ ===
    pnlAllTime: number;
    pnlLast24Hours: number;
    pnlLast7Days: number;
  
    // === ИСТОРИЯ ===
    firstTradeAt?: Date;
    lastTradeAt?: Date;
  
    // === ОШИБКИ ===
    totalErrorsCount: number;
  }

  export interface StatsCollectorConfig {
    mongoUri: string; 
    walletAddress: string;
    dbName?: string; 
    privateKey?: string; 
  }


  export type StatusCount = { 
    PENDING: number;  
    FILLED: number; 
    CANCELLED: number;
    FAILED: number;
  }