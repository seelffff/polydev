import chalk from 'chalk';
import { TraderStats } from '../types';

export const log = console.log;

export const banner = () => {
  console.clear();
  log(chalk.magenta.underline(`
    _/_/_/      _/_/    _/    _/      _/  _/      _/    _/_/      _/_/_/  _/    _/  _/_/_/  _/      _/  _/_/_/_/   
   _/    _/  _/    _/  _/      _/  _/    _/_/  _/_/  _/    _/  _/        _/    _/    _/    _/_/    _/  _/          
  _/_/_/    _/    _/  _/        _/      _/  _/  _/  _/_/_/_/  _/        _/_/_/_/    _/    _/  _/  _/  _/_/_/       
 _/        _/    _/  _/        _/      _/      _/  _/    _/  _/        _/    _/    _/    _/    _/_/  _/            
_/          _/_/    _/_/_/_/  _/      _/      _/  _/    _/    _/_/_/  _/    _/  _/_/_/  _/      _/  _/_/_/_/       
        `));
  log('Algo and Copy trade machine');
};

export const contacts = () => {
  log(chalk.magenta.underline('Twitter: https://x.com/seelffff'));
  log(chalk.magenta.underline('GitHub: https://github.com/seelffff'));
  log(chalk.magenta.underline('Sub pls ^_^'));
};

export const help = () => {
  log(chalk.cyan('\nAvailable commands:'));
  log('  Trader Lookup  - Search trader stats by address');
  log('  Exit           - Exit the CLI\n');
};

export const traderStats = (t: TraderStats) => {
  log(chalk.green(`\nTrader: ${t.trader_name || t.trader}`));
  log(`Address: ${t.trader}`);
  log(`Rank: ${t.rank}`);
  log(`Profit: $${t.overall_gain.toFixed(2)}`);
  log(`Win Amount: $${t.win_amount.toFixed(2)}`);
  log(`Loss Amount: $${t.loss_amount.toFixed(2)}`);
  log(`Current Value: $${t.total_current_value.toFixed(2)}`);
  log(`Win Rate: ${(t.win_rate * 100).toFixed(1)}%`);
  log(`Wins: ${t.win_count}`);
  log(`Positions: ${t.total_positions} (Active: ${t.active_positions})`);
  log(`Events: ${t.event_ct}`);
  log(`Tags: ${t.trader_tags || 'None'}`);
};

export const error = (msg: string) => log(chalk.red(msg));
export const success = (msg: string) => log(chalk.green(msg));
export const info = (msg: string) => log(chalk.cyan(msg));
