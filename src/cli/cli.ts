import inquirer from 'inquirer';
import { Eyes } from '../components/eyes';
import * as logger from '../utils/logger';

async function traderLookup() {
  const eyes = new Eyes();
  const { address } = await inquirer.prompt([{ type: 'input', name: 'address', message: 'Enter trader address:' }]);
  
  const t = await eyes.getTraderStats(address);
  t ? logger.traderStats(t) : logger.error('Trader not found');
}

export async function startCLI(): Promise<void> {
  logger.banner();
  logger.contacts();
  logger.help();
  
  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'Select action:',
    choices: ['Trader Lookup', 'Exit']
  }]);
  
  if (action === 'Trader Lookup') await traderLookup();
}
