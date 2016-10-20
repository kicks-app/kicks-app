var nodegit = require('nodegit');
var path = require('path');
var glob = require('glob').sync;
var Q = require("q");
var rimraf = require("rimraf");
var path = require('path');
var merge = require('deepmerge');
var mkdir = require('mkdirp');
var sanitize = require("sanitize-filename");
var fs = require('fs-extended');
fs.isEmptySync = require('extfs').isEmptySync;
module.exports = function install(src, dest, options) {
  
  options = typeof dest === 'object' ? dest : options || {};
  dest = typeof dest === 'object' ? options.dest || path.basename(options.name) : dest;
  
  var defer = Q.defer();
  var cwd = process.cwd();
  
  if (!dest && options.name && !fs.isEmptySync(cwd)) {
    dest = cwd + "/" + options.name;
  }
  
  if (!dest) {
    dest = '.';
  }
  
  dest = path.resolve(dest);
  
  var name = typeof options.name === 'string' && options.name || path.basename(dest);
  
  src = resolve(src);

  options = merge(options, {
    version: '0.0.1',
    name: name
  });
  
  if (fs.existsSync(dest) && !fs.isEmptySync(dest)) {
    defer.reject(dest + " exists and is not an empty directory");
    return defer.promise;
  }
  
  clone(src, dest).done(function() {
    // Plugins
    glob(path.join(__dirname,'.', 'installers', '*.js')).map(function(file) {
      return require('./installers/' + path.basename(file, path.extname(file)) + '.js');
    }).forEach(function(plugin) {
      plugin(dest, options);
    });
    defer.resolve();
  });
  
  return defer.promise;
};


function copy(src, dest, callback) {
  var
    defer = Q.defer();
  if (src && dest) {
    fs.copyDirSync(src, dest, {
      // Opts
    });
    defer.resolve();
  }
  return defer.promise;
}

function clone(src, dest) {
  var
    defer = Q.defer(),
    branch = src.indexOf('#') >= 0 && src.match(/#(.*)$/)[1] || "master",
    url = src.replace(/#.*/, "") || src,
    cloneOptions = new nodegit.CloneOptions(),
    twirlTimer = (function() {
      var
        P = ["\\", "|", "/", "-"],
        x = 0;
      return setInterval(function() {
        process.stdout.write("\r" + P[x++] + " Downloading " + src + "...");
        x &= 3;
      }, 250);
    })();
  if (url && dest) {
    nodegit.Clone(url, dest, {
      checkoutBranch: branch
    }).then(function(message) {
      clearInterval(twirlTimer);
      console.log("\n");
      // Remove git repository
      rimraf(path.join(dest, ".git"), function() {
        defer.resolve();
      }, function() {
        console.log('Error %o', arguments);
        defer.reject();
      });
    }).done(function() {
      // Done.
    });
  }
  return defer.promise;
}

function resolve(src) {
  var
    isAbsoluteURL = /^(?:[a-z]+:)?\/\//i.test(src),
    name,
    branch;
  if (!isAbsoluteURL) {
    if (fs.existsSync(src)) {
      // Copy local files
      console.log("TODO: Copy local files");
    } else if (path.basename(src) === src) {
      // Could be kicks-app
      branch = src.indexOf('#') >= 0 && src.match(/#(.*)$/)[1],
      name = src.replace(/#.*/, "") || src,
      src = "https://github.com/kicks-app/kicks-app-" + name + ".git" + (branch ? "#" + branch : "");
    }
  }
  return src;
}
