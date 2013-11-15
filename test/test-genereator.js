/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('XF generator', function () {
  var xf;

  beforeEach(function (done) {
    var deps = [
      '../../app',
      '../../application',
      '../../build',
      '../../collection', 
      '../../component', 
      '../../model', 
      '../../update', 
      '../../view'
    ];
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        done(err);
      }
      xf = helpers.createGenerator('xf:app', deps);
      done();
    });
  });


  function generatorTest(generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {
    var xfGenerator;
    var name = 'foo';
    var deps = [path.join('../..', generatorType)];
    xfGenerator = helpers.createGenerator('xf:' + generatorType, deps, [name]);
    xf.options['skip-install'] = true;
    xf.run([], function (){
      xfGenerator.run([], function () {
        helpers.assertFiles([
          [path.join(targetDirectory, name + '.js')],
        ]);
        done();
      });
    });
  }
 
  describe('Collection', function () {
    it('should generate a new collection', function (done) {
      generatorTest('collection', 'collection', 'js/collections', _.camelize, _.camelize, '', done);
    });
  });
 
  describe('Model', function () {
    it('should generate a new model', function (done) {
      generatorTest('model', 'model', 'js/models', _.camelize, _.camelize, '', done);
    });
  });
 
  describe('View', function () {
    it('should generate a new view', function (done) {
      generatorTest('view', 'view', 'js/views', _.camelize, _.camelize, '', done);
    });
  });
  
  describe('Application', function () {
    it('should generate a new Application', function (done) {
        var name = "init";
        var deps = [path.join('../../application')];
        var xfApp = helpers.createGenerator('xf:application', deps, [name]);
        
        var expected = ['index.html',
                        'cache.manifest',
                        'images/thumbs.jpg',
                        'styles/app.css',
                        'js/app.js',
                        'js/components/home.js',
                        'tmpl/desktop/home.tpl'
        ];
        xfApp.run([], function() {
            helpers.assertFiles(expected);
            done();
        });
    });
  });
});