var 
  path = require('path'),
  fs = require('fsext');
module.exports = function(options) {
  var file = path.join(options.dest, "package.json");
  if (fs.existsSync(file)) {
    var data = fs.readFileSync(file, { encoding: 'utf8' });
    if (data) {
      var pkg = JSON.parse(data);
      pkg.name = options.name || pkg.name;
      data = JSON.stringify(pkg, null, 2);
      fs.writeFileSync(file, data, 'utf8');
    }
  }
};
