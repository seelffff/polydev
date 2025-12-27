import dotenv from 'dotenv';
import { startCLI } from './cli/cli';

dotenv.config();

async function main() {
  await startCLI();
}

main().catch(console.error);
