# Polydev Project Rules

## Project Overview
Polymarket trading bot with algo and copy trading capabilities.

## Directory Structure
```
src/
├── cli/           # CLI interface (minimal logic, uses logger)
├── components/    # Core business logic
│   ├── arms.ts       # Trading operations (CLOB client)
│   ├── eyes.ts       # External API calls (analytics)
│   ├── statsCollector.ts  # Statistics collection
│   ├── brain.ts      # Decision making (TODO)
│   ├── skeleton.ts   # Structure (TODO)
│   └── spirit.ts     # Core logic (TODO)
├── config/        # Configuration
│   ├── constants.ts  # CLOB config defaults
│   └── env.ts        # Environment variables
├── db/            # Database layer
│   ├── mongo.ts      # MongoDB connection
│   ├── schemas.ts    # Mongoose schemas
│   └── repositories/ # Data access layer
├── strategies/    # Trading strategies
│   └── baseStrategy.ts
├── types/         # TypeScript types (all in index.ts)
├── utils/         # Utilities
│   ├── logger.ts     # All console output
│   └── errors.ts     # Error handling
└── main.ts        # Entry point
```

## Architecture Patterns

### Components (Body Parts Metaphor)
- `Arms` — executes trades (CLOB client)
- `Eyes` — observes external data (APIs)
- `Brain` — makes decisions
- `StatsCollector` — tracks performance

### Data Flow
1. `Eyes` fetches external data
2. `Brain` analyzes and decides
3. `Arms` executes trades
4. `StatsCollector` records results

## Code Style

### Naming
- Classes: PascalCase (`Eyes`, `Arms`, `OrderRepository`)
- Methods: camelCase (`getTraderStats`, `createOrder`)
- Files: camelCase (`statsCollector.ts`)
- Constants: UPPER_SNAKE_CASE (`CLOB_CONFIG`)

### Types
- All types in `src/types/index.ts`
- Use interfaces for objects
- Use enums for fixed values (`OrderStatus`, `OrderSide`)

### CLI
- `cli/cli.ts` — minimal, only logic flow
- No `console.log` in CLI — use `utils/logger.ts`
- All output functions in logger (banner, help, traderStats, error, success)

### Components
- Each component is a class with methods
- Initialize with constructor
- Async methods for API/DB calls
- Return typed data, throw on errors

### Database
- Schemas in `db/schemas.ts`
- Repository pattern in `db/repositories/`
- Repository methods: save, findById, findAll, findByStatus, update

## Dependencies
- `@polymarket/clob-client` — Polymarket trading
- `ethers` — Ethereum wallet
- `mongoose` — MongoDB ODM
- `inquirer` — CLI prompts
- `chalk` — Terminal colors
- `dotenv` — Environment variables

## Environment Variables
```
POLYMARKET_PRIVATE_KEY=
CLOB_HOST=https://clob.polymarket.com
CLOB_CHAIN_ID=137
CLOB_SIGNATURE_TYPE=0
DEFAULT_TICK_SIZE=0.001
DEFAULT_NEG_RISK=false
DEFAULT_ORDER_TYPE=GTC
```

## Commands
- `npm start` — Run CLI
- `npm run dev` — Development mode
- `npm run build` — Build TypeScript
