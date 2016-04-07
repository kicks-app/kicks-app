#!/usr/bin/env node

var install = require('./install');

var userArgs = process.argv.slice(2);
userArgs = typeof userArgs === "string" ? [userArgs] : userArgs;
install(userArgs[0], {name: userArgs[1]}).done(function() {
  console.log("\nDone.");
})
