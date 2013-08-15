'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js'),
    bowerhook = require('../app/bowerhook.js');

var UpdateGenerator = module.exports = function UpdateGenerator(args, options, config) {

    if (args.length === 0) {
        args[0] = 'all';
    }

    yeoman.generators.NamedBase.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(UpdateGenerator, yeoman.generators.NamedBase);

UpdateGenerator.prototype.update = function update() {
    var _self = this;

    this.copy('../../app/templates/_package.json', 'package.json');
    this.copy('../../app/templates/_bower.json', 'bower.json');

    bowerhook.checkDirs(function() {
        XF.runUpdate(_self);
    });
};
