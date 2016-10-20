var install = require('../lib/install');
var fs = require('fs-extended');
var path = require("path");
var assert = require("assert");
var rimraf = require("rimraf");
var subset = require('json-subset');


describe('Install', function() {
  describe('kicks-app-test', function(done) {
    this.timeout(100000);
    var src = "wordpress#bs4";
    var dest = 'tmp';
    it('should throw error if package.json does not match expected results', function(done) {
      rimraf(dest, function() {
        install(src, {
          name: 'my-project',
          description: 'My Project',
          dest: 'tmp'
        }).done(function() {
          var npm = true, composer = true;
          // NPM
          if (fs.existsSync('tmp/package.json')) {
            npm = subset(JSON.parse(fs.readFileSync('test/expected/package.json', 'utf-8')), JSON.parse(fs.readFileSync('tmp/package.json', 'utf-8')));
          }
          // Composer
          if (fs.existsSync('tmp/composer.json')) {
            composer = subset(JSON.parse(fs.readFileSync('test/expected/composer.json', 'utf-8')), JSON.parse(fs.readFileSync('tmp/composer.json', 'utf-8')));
          }
          // Bower
          if (fs.existsSync('tmp/bower.json')) {
            composer = subset(JSON.parse(fs.readFileSync('test/expected/bower.json', 'utf-8')), JSON.parse(fs.readFileSync('tmp/bower.json', 'utf-8')));
          }
          assert.ok(npm && composer);
          done();
        });
      });
    });
  });
});