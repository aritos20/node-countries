const fs = require('fs');

const data = fs.readFileSync('./countries.txt', {encoding: 'utf8', flag: 'r'});

console.log(data);