const fs = require('fs');
const path = require('path');

const read = (dir) => 
  fs.readdirSync(dir)
    .reduce((files, file) =>
      fs.statSync(path.join(dir, file)).isDirectory() 
        ? files.concat(read(path.join(dir, file))) 
        : files.concat(path.join(dir, file)), []);

const files = read(__dirname).filter(filename => filename.endsWith('.spec.js'));

const exportable = {};
files.forEach(function(file) {
  // extract name of file as export name
  const name = path.basename(file, '.spec.js');
  exportable[name] = require(file);
});

module.exports = exportable;
