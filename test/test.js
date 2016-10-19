var install = require('../lib/install');
var fs = require("fs");
var assert = require("assert");
var rimraf = require("rimraf");
var subset = require('json-subset');
describe('Install', function() {
  describe('kicks-app-test', function(done) {
    this.timeout(100000);
    var src = "wordpress#bootstrap_4";
    var dest = 'tmp';
    it('should throw error if package.json does not match expected results', function(done) {
      rimraf(dest, function() {
        install(src, {
          name: 'my-project',
          description: 'My Project',
          dest: 'tmp'
        }).done(function() {
          assert.ok(subset(JSON.parse(fs.readFileSync('test/expected/package.json', 'utf-8')), JSON.parse(fs.readFileSync('tmp/package.json', 'utf-8'))));
          done();
        });
      });
    });
  });
});