var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {

    console.log('\033[2J');

    if (args.length === 0) {
        args[0] = 'component';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

ComponentGenerator.prototype.process = function create() {

    XF.checkUpdate();

    this.component = this.args[0];
    this.copy('../../app/templates/_package.json', 'package.json');
    this.copy('../../app/templates/_bower.json', 'bower.json');

    console.log('\nCreating component with name "' + this.component + '"');

    this.template('../../app/templates/component/_component.js', './js/components/' + this.component + '.js');

    var dirsList = fs.readdirSync('./tmpl')

    if (dirsList.length > 0) {

        for (var i = 0; i < dirsList.length; ++i) {
            var dirItem = fs.statSync('./tmpl/' + dirsList[i]);
            if (dirItem.isDirectory()) {
                this.template('../../app/templates/component/_component.tmpl', './tmpl/' + dirsList[i] + '/' + this.component + '.tmpl');
            }
        }

    } else {
         this.template('../../app/templates/component/_component.tmpl', './tmpl/' + this.component + '.tmpl');
    }

};