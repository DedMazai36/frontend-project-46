#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiffEngine.js';

const program = new Command();

program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const format = options.format ? `${options.format}` : 'stylish';
    return console.log(genDiff(filepath1, filepath2, format));
  });

program.parse();
