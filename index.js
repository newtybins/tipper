#!/usr/bin/env node
'use strict';

const program = require('commander');
const chalk = require('chalk');
const pkg = require('./package.json');

program
    .version(pkg.version)
    .option('-b, --bill <cost>', 'The total cost of your bill.', parseFloat)
    .option('-q, --quality [1-5]', 'Allows you to set a quality of the service you recieved.', parseInt)
    .parse(process.argv);

// checks
if (program.bill === undefined) return console.log(chalk.red.bold('You didn\'t specify the total of your bill!'));
if (isNaN(program.amount)) return console.log(chalk.red.bold('The bill amount is not a number.'));
if (isNaN(program.quality) && program.quality !== undefined) return console.log(chalk.red.bold('The quality of service is not a number.'));

// quality parsing
let quality;

if (program.quality === 1 || program.quality === undefined) quality = 30;
if (program.quality === 2) quality = 20;
if (program.quality === 3) quality = 15;
if (program.quality === 4) quality = 10;
if (program.quality === 5) quality = 5;

// calculate the tip
const tip = (program.bill + (program.bill / 100) * quality).toFixed(2);
if (isNaN(tip)) return console.log(chalk.red.bold('The tip calculated is not a number.'))

// display the tip
console.log(`You should tip ${chalk.green.bold(`$${tip}`)}.`);