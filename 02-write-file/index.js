const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/output.txt';
const exitKeyword = 'exit';

const fileStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Welcome! Enter text, or type "exit" to terminate.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.toLowerCase() === exitKeyword) {
    console.log('Farewell! Exiting...');
    fileStream.end(() => process.exit(0));
  } else {
    fileStream.write(`${input}\n`);
    console.log('Enter more text, or type "exit" to terminate.');
  }
});

process.on('SIGINT', () => {
  console.log('Farewell! Exiting...');
  fileStream.end(() => process.exit(0));
});
