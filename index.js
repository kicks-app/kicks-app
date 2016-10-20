#!/usr/bin/env node

var install = require('./lib/install');

var path = require('path');
var fs = require('fs');
var program = require('commander');
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), { encoding: 'utf8' }));
      
program
  .version(pkg.version)
  .arguments('<src> [<dest>]')
  .option('-n, --name [name]', "set project name")
  .option('-d, --description [description]', "set project description")
  .action(function(src, dest) {
    var
      opts = (function (program) {
        // Get cli options
        var
          result = {};
          keys = program.options.map( function (option) { return option.long.replace(/^-+/, "")});
          Object.keys(program)
            .filter( function (key) { return keys.indexOf(key) >= 0; })
            .forEach( function(key) {
              result[key] = program[key];
            });
          return result;
      })(program)
    install(src, dest, opts)
      .then(function() {
        console.log("Done.");
      }, function(err) {
        console.error("Error:", err);
      });
  })
  .parse(process.argv);