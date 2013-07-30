'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('./xf.js');

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
    this.template('_package.json', 'package.json');
};

XframeworkGenerator.prototype.xfmove = function xfmove() {
    var action = 'build',
        modules = '';
    var _self = this,
        dirs = [
            'x-framework',
            'x-framework/js',
            'jquery',
            'backbone',
            'underscore'
        ],
        totalDirs = dirs.length,
        uploadedDirs = 0;

    if (this.args[0]) {
        action = this.args[0];
    }

    if (this.args[1]) {
        modules = this.args[1];
    }

    var checkXframework = setInterval(function () {

        dirs.map(function (dir) {

          fs.exists(dir, function (exists) {
            uploadedDirs = (exists) ? uploadedDirs + 1 : uploadedDirs;
          });
        });

        if (uploadedDirs >= totalDirs) {
            clearInterval(checkXframework);

            switch (action) {
                case 'build' :
                    XF.runBuild(_self);
                    break;

                case 'update' :
                    XF.runUpdate(_self);
                    break;

                // default not defined
            }
        } else {
            uploadedDirs = 0;
        }
    }, 2000);
};

