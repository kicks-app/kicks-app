#!/usr/bin/env node

var install = require('./install');

var path = require('path');
var fs = require('fs');
var program = require('commander');
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), { encoding: 'utf8' }));
      
program
  .version(pkg.version)
  .arguments('<src> [<dest>]')
  .option('-n, --name [name]', "set project name")
  .option('-d, --description [description]', "set project description")
  .option('-f, --force', "force clean install in a non-empty directory")
  .action(function(src, dest) {
    var
      opts = program.opts();
    install(src, dest, opts).done(function() {
      console.log("\nDone.");
    })
  })
  .parse(process.argv);