var install = require('../install');
var fs = require("fs");
var assert = require("assert");
var rimraf = require("rimraf");
describe('Install', function() {
  describe('kicks-app-test', function(done) {
    this.timeout(100000);
    // git://github.com/<user>/<project>.git#<branch>
    //var src = "https://github.com/kicks-app/kicks-app-wordpress.git#bootstrap_4";
    var src = "wordpress#bootstrap_4";
    var dest = 'tmp';
    it('should throw if config does not match expected results', function(done) {
      rimraf(dest, function() {
        install(src, {
          name: 'my-project',
          dest: 'tmp'
        }).done(function() {
          assert.equal(fs.readFileSync('tmp/package.json', 'utf-8'), fs.readFileSync('test/expected/package.json', 'utf-8'));
          done();
        });
      });
    });
  });
});