const fs = require('fs');

const filePath = './01-read-file/text.txt';

// Read file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
  } else {
    console.log('File content:');
    console.log(data);
  }
});
