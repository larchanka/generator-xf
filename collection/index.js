var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js');

var CollectionGenerator = module.exports = function CollectionGenerator(args, options, config) {

    console.log('\033[2J');

    if (args.length === 0) {
        args[0] = 'collection';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.process = function create() {

    XF.checkUpdate();

    this.collection = this.args[0];
    this.copy('../../app/templates/_package.json', 'package.json');
    this.copy('../../app/templates/_bower.json', 'bower.json');

    console.log('\nCreating collection with name "' + this.collection + '"');

    this.template('../../app/templates/collection/_collection.js', './js/collections/' + this.collection + '.js');

};