var 
  path = require('path'),
  fs = require('fsext');
module.exports = function(dest, options) {
  var file = path.join(dest, "package.json");
  if (fs.existsSync(file)) {
    var data = fs.readFileSync(file, { encoding: 'utf8' });
    if (data) {
      var pkg = JSON.parse(data);
      pkg.name = typeof options.name === 'string' ? options.name : pkg.name;
      pkg.description = typeof options.description === 'string' ? options.description : pkg.description;
      pkg.version = typeof options.version === 'string' ? options.version : pkg.version;
      data = JSON.stringify(pkg, null, 2);
      fs.writeFileSync(file, data, 'utf8');
    }
  }
};
