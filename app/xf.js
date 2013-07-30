'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec;

var XF = module.exports = {
    runBuild : function(evnts) {
        exec('cp -r ./x-framework/* ./', {maxBuffer: 10000 * 1024}, function (cpmsg) {

            if (cpmsg === null) {

                exec('mkdir ./js/lib & rm -r ./x-framework', {maxBuffer: 10000 * 1024}, function (rmmsg) {

                    if (rmmsg === null) {

                        var checkLibs = setInterval(function() {

                            fs.exists('js/lib', function (exists) {
                                if (exists) {
                                    clearInterval(checkLibs);
                                    XF.moveLibs(evnts);
                                }
                            });
                        }, 2000);
                    } else {
                        console.log(rmmsg);
                    }
                });
            } else {
                console.log(cpmsg);
            }
        });
    },

    runUpdate : function(evnts) {
        var updEl = evnts.args[1] || 'all',
            exStr = 'cp -r ./x-framework/js/* ./js/ & cp -r ./x-framework/styles/xf.*.*ss ./styles/';

        if (updEl === 'js') {
            exStr = 'cp -r ./x-framework/js/* ./js/';
        } else if (updEl === 'css') {
            exStr = 'cp -r ./x-framework/styles/xf.*.*ss ./styles/';
        }
        exec(exStr, {maxBuffer: 10000 * 1024}, function (cpmsg) {

            if (cpmsg === null) {

                exec('rm -r ./x-framework', {maxBuffer: 10000 * 1024}, function (rmmsg) {

                    if (rmmsg === null) {

                        if (updEl === 'all' || updEl === 'js') {
                            XF.moveLibs(evnts);
                        } else {
                            exec('rm -r ./jquery '
                             + '& rm -r ./backbone '
                             + '& rm -r ./underscore ', {maxBuffer: 10000 * 1024}, function () { });
                        }
                    } else {
                        console.log(rmmsg);
                    }
                });
            } else {
                console.log(cpmsg);
            }
        });
    },

    moveLibs : function(evnts) {

        var uploadedDirs = 0,
            dirs = [
                'node_modules/grunt',
                'node_modules/grunt-cli',
                'node_modules/grunt-contrib-uglify',
                'node_modules/grunt-contrib-jshint',
                'node_modules/grunt-contrib-nodeunit'
            ],
            totalDirs = dirs.length;

        exec('cp -r ./jquery/index.js ./js/lib/jquery.js '
             + '& cp -r ./backbone/index.js ./js/lib/backbone.js '
             + '& cp -r ./underscore/index.js ./js/lib/underscore.js ', {maxBuffer: 10000 * 1024}, function (mvmsg) {

            if (mvmsg === null) {
                exec('rm -r ./jquery '
                     + '& rm -r ./backbone '
                     + '& rm -r ./underscore ', {maxBuffer: 10000 * 1024}, function (rmmsg) {

                    if (rmmsg === null) {
                        exec('npm install', {maxBuffer: 10000 * 1024}, function (npmmsg) {

                            var checkGrunt = setInterval(function() {
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
                    } else {
                        console.log(rmmsg);
                    }
                });
            } else {
                console.log(mvmsg);
            }
        });
    },

    startGrunt : function(evnts) {
        var custombuild = '';

        if (evnts.args[1]) {
            custombuild = ':' + evnts.args[1];
        }
        exec('grunt build' + custombuild, {maxBuffer: 10000 * 1024}, function (grmsg) {

            if (grmsg !== null) {
                console.log(grmsg.toString());
                XF.startGrunt(modules);
            }
        });
    }
};