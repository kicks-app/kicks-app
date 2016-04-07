var fs = require('fs');
function existsSync(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
module.exports = existsSync;