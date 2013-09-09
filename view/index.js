var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {

    console.log('\033[2J');

    if (args.length === 0) {
        args[0] = 'view';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.process = function create() {

    XF.checkUpdate();

    this.view = this.args[0];
    this.copy('../../app/templates/_package.json', 'package.json');
    this.copy('../../app/templates/_bower.json', 'bower.json');

    console.log('\nCreating view with name "' + this.view + '"');

    this.template('../../app/templates/view/_view.js', './js/views/' + this.view + '.js');

};