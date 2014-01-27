var util = require('util'),
path = require('path'),
yeoman = require('yeoman-generator'),
bower = require('bower'),
fs = require('fs'),
exec = require('child_process').exec,
updateNotifier = require('update-notifier'),
os = require('os'),
fse = require('fs-extra'),
bowerhook = require('./bowerhook.js');

console.log(/^win/.test(os.platform()) ? 'WINDOWS' : 'UNIX');
var execCommands = {
    'cp' : /^win/.test(os.platform()) ? 'xcopy {FILES} /E' : 'cp -r {FILES}',
    'rm' : /^win/.test(os.platform()) ? 'rmdir {FILES} /s /q' : 'rm -r {FILES}'
}
var XF = module.exports = {
    
    attempts: 10,
    curAttempt: 0,

    runGet: function (evnts) {

        console.log('\033[2J');

        fse.copySync('./js/lib/xframework/','./', function () {});

        // if (cpmsg === null) {
            fs.exists('js/lib', function (exists) {
                if (!exists) {
                    exec('mkdir js/lib', {
                        maxBuffer: 10000 * 1024
                    }, function (mkmsg) {

                        if (mkmsg !== null) {
                            console.log(mkmsg);
                        }
                    });
                }
            });
                
            fse.removeSync('./js/lib/xframework/', function () {});

            var checkLibs = setInterval(function () {

                fs.exists('js/lib', function (exists) {
                    if (exists) {
                        clearInterval(checkLibs);
                        XF.moveLibs(evnts);
                    }
                });
            }, 2000);
        },

        // Run Grunt to build xf.js and xf.min.js
        runBuild: function (evnts) {

            console.log('\nBuilding xf.js and xf.min.js.\t\nCompressing less.\n');

            fse.removeSync('./js/lib/xframework/', function () {});

            XF.startGrunt(evnts);
        },

        // Run update of css/less and js files. Can be executed with attributes: js|css|all
        runUpdate: function (evnts) {

            var updEl = evnts.args[0] || 'all';

            if (updEl === 'scripts') {
                fse.copySync('./js/lib/xframework/js/','./js/', function () {});
                fse.copySync('./js/lib/xframework/Gruntfile.js', './Gruntfile.js', function () {});
            } else if (updEl === 'styles') {
                fse.copySync('./js/lib/xframework/styles/', './styles/', function () {});
            } else {
                fse.copySync('./js/lib/xframework/js/','./js/', function () {});
                fse.copySync('./js/lib/xframework/styles/', './styles/', function () {});
                fse.copySync('./js/lib/xframework/Gruntfile.js', './Gruntfile.js', function () {});
            }
            
            fse.removeSync('./js/lib/xframework/', function () {});

            if (updEl === 'all' || updEl === 'scripts') {
                XF.moveLibs(evnts);
            } else {
                XF.runBuild(evnts);
            }

            console.log('\nUpdating sources\n\n');
        },

        // Move thirdparty libs to ./js/lib directory
        moveLibs: function (evnts) {

            var uploadedDirs = 0,
            dirs = [
            'node_modules/grunt',
            'node_modules/grunt-cli',
            'node_modules/grunt-contrib-uglify',
            'node_modules/grunt-contrib-jshint',
            'node_modules/grunt-contrib-nodeunit'
            ],
            totalDirs = dirs.length;

            exec('npm install', {
                maxBuffer: 10000 * 1024
            }, function (npmmsg) {

                var checkGrunt = setInterval(function () {
                    dirs.map(function (dir) {

                        fs.exists(dir, function (exists) {
                            uploadedDirs = (exists) ? uploadedDirs + 1 : uploadedDirs;
                        });
                    });

                    if (uploadedDirs >= totalDirs) {

                        clearInterval(checkGrunt);
                        XF.startGrunt(evnts);
                    } else {
                        uploadedDirs = 0;
                    }
                }, 2000);
            }); 
        },

        // Start Grunt tasks with attributes
        startGrunt: function (evnts) {
            var custombuild = '',
            _self = this;

            if (evnts.args[0] && evnts.args[0] !== 'all') {
                custombuild = ':' + evnts.args[0];
            }
            exec('grunt', {
                maxBuffer: 10000 * 1024
            }, function (grmsg) {

                if (grmsg !== null) {

                    if (_self.curAttempt < _self.attempts) {
                        XF.startGrunt(evnts);
                        _self.curAttempt = _self.curAttempt + 1;
                    } else {
                        console.log('\x1b[0m\033[31mBuild failed!\n' + grmsg.toString() + '\n\n');
                        _self.curAttempt = 0;
                    }
                } else {
                    console.log('\x1b[0m\033[31mBuild successful!\n\n');
                }
            });
        },

        // Check generator's version
        checkUpdate : function () {

            var notifier = updateNotifier({
                packagePath : '../package.json'
            });

            if (notifier.update) {
                notifier.notify('\x1b[0m\033[32mUpdate available: ' + notifier.update.latest);
            }
        }
    };