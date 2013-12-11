
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js');

var ApplicationGenerator = module.exports = function ApplicationGenerator(args, options, config) {

    console.log('\033[2J');

    if (args.length === 0) {
        args[0] = 'init';
    }

    if (!args[1]) {
        args[1] = 'Simple app';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ApplicationGenerator, yeoman.generators.NamedBase);

ApplicationGenerator.prototype.process = function update() {

    XF.checkUpdate();

    this.event = this.args[0];
    this.appName = this.args[1];
    this.filesList = [];
    var today = new Date();
    this.today = today.getUTCMonth() + 1;
    this.today += '-' + today.getDate();
    this.today += '-' + today.getFullYear();
    this.today += ' ' + today.getHours();
    this.today += ':' + today.getMinutes();
    this.today += ':' + today.getSeconds();
    this.copy('../../app/templates/_package.json', 'package.json');
    this.copy('../../app/templates/_bower.json', 'bower.json');

    if (this.event === 'init') {

        console.log('\nCreating templates for "' + this.appName + '"');
        var _self = this;
            
        this.template('../../app/templates/application/_index.html', 'index.html');
        this.copy('../../app/templates/application/_images/thumbs.jpg', 'images/thumbs.jpg');
        this.copy('../../app/templates/application/_js/app.js', 'js/app.js');
        this.copy('../../app/templates/application/_js/components/home.js', 'js/components/home.js');
        this.copy('../../app/templates/application/_styles/app.css', 'styles/app.css');
        this.copy('../../app/templates/application/_tmpl/desktop/home.tmpl', 'tmpl/desktop/home.tmpl');
        this.template('../../app/templates/application/_cache.manifest', 'cache.manifest');

    } else if (this.event === 'build') {
        
        var _self = this;

        console.log('\nBuilding your application.');
        
        exec('rm -r ./prod', {
            maxBuffer: 10000 * 1024
        }, function (rmmsg) {

            if (rmmsg === null) {

                _self.mkdir('prod');
                
                
                
            } else {
                console.log(rmmsg);
            }
        });

    } else {

        console.log('ERROR: "' + this.event + '" is not action.\n\nAvailable actions: \n* init\n* build\n\nCheck README for more information.\n\n');

    }
};