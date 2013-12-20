
var util = require('util'),
path = require('path'),
yeoman = require('yeoman-generator'),
fs = require('fs'),
exec = require('child_process').exec,
XF = require('../app/xf.js');

var HelpGenerator = module.exports = function HelpGenerator(args, options, config) {

    console.log('\033[2J');
    
    if (args.length === 0) {
        args[0] = 'help';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(HelpGenerator, yeoman.generators.NamedBase);

HelpGenerator.prototype.process = function update() {

    XF.checkUpdate();

    console.log('HELP\n__________________\n\n');
    
    console.log('How to start XFramework application in new folder:\n');
    console.log('- mkdir [DIR_NAME]\n');
    console.log('- cd [DIR_NAME]\n\n');
    console.log('- yo xf\n');
    console.log('- yo xf:build\n\n');
    
    console.log('- yo xf:application init [APPLICATION_NAME]\n');
    console.log('- yo xf:application build\n\n');
    
    console.log('Now you can find your application in `prod` directory and deploy it.\n');
};