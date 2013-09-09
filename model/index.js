var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {

    console.log('\033[2J');

    if (args.length === 0) {
        args[0] = 'model';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.process = function create() {

    XF.checkUpdate();

    this.model = this.args[0];
    this.copy('../../app/templates/_package.json', 'package.json');
    this.copy('../../app/templates/_bower.json', 'bower.json');

    console.log('\nCreating model with name "' + this.model + '"');

    this.template('../../app/templates/model/_model.js', './js/models/' + this.model + '.js');

};