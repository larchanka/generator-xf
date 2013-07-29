'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec;

var XframeworkGenerator = module.exports = function XframeworkGenerator(args, options, config) {
  "use strict";

  this.args = args;

  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(XframeworkGenerator, yeoman.generators.Base);

XframeworkGenerator.prototype.xfclone = function xfclone() {
    this.template('bowerrc', '.bowerrc');
    this.template('_bower.json', 'bower.json');
};

XframeworkGenerator.prototype.xfmove = function xfmove() {
    var _self = this,
        dirs = [
            'x-framework',
            'x-framework/data',
            'x-framework/img',
            'x-framework/js',
            'x-framework/mocks',
            'jquery',
            'backbone',
            'underscore'
        ],
        totalDirs = dirs.length,
        uploadedDirs = 0;

    var checkXframework = setInterval(function () {

        dirs.map(function (dir) {

          fs.exists(dir, function (exists) {
            uploadedDirs = (exists) ? uploadedDirs + 1 : uploadedDirs;
          });
        });

        if (uploadedDirs >= totalDirs) {

            clearInterval(checkXframework);
            console.log('\n\u001b[34mX-Framework downloaded and installed. \n\u001b[0mCopying to proper directories.');
            runCopy(_self);
        } else {
            uploadedDirs = 0;
        }
    }, 2000);
};

var runCopy = (function(evnts) {
    exec('cp -r ./x-framework/* ./', {maxBuffer: 10000 * 1024}, function (cpmsg) {

        if (cpmsg === null) {

            exec('rm -r ./x-framework', {maxBuffer: 10000 * 1024}, function (rmmsg) {

                if (rmmsg === null) {

                    var checkLibs = setInterval(function() {

                        fs.exists('js/lib', function (exists) {
                            if (exists) {
                                clearInterval(checkLibs);
                                moveLibs();
                            }
                        });
                    }, 2000);
                } else {
                    console.log(rmmsg);
                }
            });
        } else {
            console.log(cpmsg);
        }
    });
});

var moveLibs = (function() {
    console.log('Moving libs.');
    exec('cp -r ./jquery/index.js ./js/lib/jquery.js '
         + '& cp -r ./backbone/index.js ./js/lib/backbone.js '
         + '& cp -r ./underscore/index.js ./js/lib/underscore.js ', {maxBuffer: 10000 * 1024}, function (mvmsg) {

        if (mvmsg === null) {
            console.log(':) \u001b[31mAll moved.');
            exec('rm -r ./jquery '
                 + '& rm -r ./backbone '
                 + '& rm -r ./underscore ', {maxBuffer: 10000 * 1024}, function (rmmsg) {

                if (rmmsg === null) {

                    exec('grunt', {maxBuffer: 10000 * 1024}, function (grmsg) {

                        if (grmsg !== null) {
                            console.log(grmsg);
                        }
                    });
                } else {
                    console.log(rmmsg);
                }
            });
        } else {
            console.log(mvmsg);
        }
    });
});
