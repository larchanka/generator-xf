'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('./xf.js');


var BH = module.exports = {
    modules : '',
    dirs : [
            'js/lib/xframework',
            'js/lib/xframework/js',
            'js/lib/jquery',
            'js/lib/backbone',
            'js/lib/underscore'
        ],

    checkDirs : function(callback) {
        var _global = this;

        var totalDirs  = this.dirs.length,
        uploadedDirs = 0;

        var checkXframework = setInterval(function () {

            _global.dirs.map(function (dir) {

                fs.exists(dir, function (exists) {
                    uploadedDirs = (exists) ? uploadedDirs + 1 : uploadedDirs;
                });
            });

            if (uploadedDirs >= totalDirs) {
                clearInterval(checkXframework);

                callback();

            } else {
                uploadedDirs = 0;
            }
        }, 2000);
    }
};