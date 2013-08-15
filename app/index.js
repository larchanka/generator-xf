'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('./xf.js'),
    bowerhook = require('./bowerhook.js');


    console.log('WORKING >>>\n\n');

var XframeworkGenerator = module.exports = function XframeworkGenerator(args, options, config) {

  this.args = args;

  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(XframeworkGenerator, yeoman.generators.Base);

XframeworkGenerator.prototype.xfmove = function xfmove() {
    var _self = this;
    this.copy('_package.json', 'package.json');
    this.template('bowerrc', '.bowerrc');
    this.template('_bower.json', 'bower.json');

    bowerhook.checkDirs(function() {
        XF.runGet(_self);
    });
};

