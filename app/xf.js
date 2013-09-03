var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec;

var XF = module.exports = {

    // Default method. Makes copy of XF repository and main libraries
    runGet: function (evnts) {

        console.log('\033[2J');

        exec('cp -r ./x-framework/* ./', {
            maxBuffer: 10000 * 1024
        }, function (cpmsg) {

            if (cpmsg === null) {
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

                exec('rm -r ./x-framework', {
                    maxBuffer: 10000 * 1024
                }, function (rmmsg) {

                    if (rmmsg === null) {

                        var checkLibs = setInterval(function () {

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

    // Run Grunt to build xf.js and xf.min.js
    runBuild: function (evnts) {

        console.log('\033[2J');

        exec('rm -r ./jquery ' + '& rm -r ./backbone ' + '& rm -r ./underscore & rm -r ./x-framework', {
            maxBuffer: 10000 * 1024
        }, function () {

            XF.startGrunt(evnts);
        });
    },

    // Run update of css/less and js files. Can be executed with attributes: js|css|all
    runUpdate: function (evnts) {

        console.log('\033[2J');

        var updEl = evnts.args[0] || 'all',
            exStr = 'cp -r ./x-framework/js/* ./js/ & cp -r ./x-framework/styles/xf.*.*ss ./styles/' + ' & cp -r ./x-framework/Gruntfile.js ./Gruntfile.js';

        if (updEl === 'js') {
            exStr = 'cp -r ./x-framework/js/* ./js/ & cp -r ./x-framework/Gruntfile.js ./Gruntfile.js';
        } else if (updEl === 'css') {
            exStr = 'cp -r ./x-framework/styles/xf.*.*ss ./styles/';
        }

        exec(exStr, {
            maxBuffer: 10000 * 1024
        }, function (cpmsg) {

            if (cpmsg === null) {

                exec('rm -r ./x-framework', {
                    maxBuffer: 10000 * 1024
                }, function (rmmsg) {

                    if (rmmsg === null) {

                        if (updEl === 'all' || updEl === 'js') {
                            XF.moveLibs(evnts);
                        } else {
                            exec('rm -r ./jquery ' + '& rm -r ./backbone ' + '& rm -r ./underscore ', {
                                maxBuffer: 10000 * 1024
                            }, function () {

                                XF.runBuild(evnts);
                            });
                        }

                        console.log('\nUpdating sources\n\n');
                    } else {
                        console.log(rmmsg);
                    }
                });
            } else {
                console.log(cpmsg);
            }
        });
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

        exec('cp -r ./jquery/index.js ./js/lib/jquery.js ' + '& cp -r ./backbone/index.js ./js/lib/backbone.js ' + '& cp -r ./underscore/index.js ./js/lib/underscore.js ', {
            maxBuffer: 10000 * 1024
        }, function (mvmsg) {

            if (mvmsg === null) {
                exec('rm -r ./jquery ' + '& rm -r ./backbone ' + '& rm -r ./underscore ', {
                    maxBuffer: 10000 * 1024
                }, function (rmmsg) {

                    if (rmmsg === null) {
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
                    } else {
                        console.log(rmmsg);
                    }
                });
            } else {
                console.log(mvmsg);
            }
        });
    },

    // Start Grunt tasks with attributes
    startGrunt: function (evnts) {
        var custombuild = '';

        console.log('\nBuilding xf.js and xf.min.js.\t\nCompressing less.\n');

        if (evnts.args[0] && evnts.args[0] !== 'all') {
            custombuild = ':' + evnts.args[0];
        }
        exec('grunt build' + custombuild, {
            maxBuffer: 10000 * 1024
        }, function (grmsg) {

            if (grmsg !== null) {
                console.log(grmsg.toString());
                XF.startGrunt(evnts);
            } else {
                console.log('Build successful!\n\n');
            }
        });
    }
};