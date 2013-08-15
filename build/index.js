'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js');

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {

    if (args.length === 0) {
        args[0] = 'all';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(BuildGenerator, yeoman.generators.NamedBase);

BuildGenerator.prototype.build = function build() {

    this.copy('../../app/templates/_package.json', 'package.json');

    XF.runBuild(this);
};
