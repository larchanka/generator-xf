'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    bower = require('bower'),
    fs = require('fs'),
    exec = require('child_process').exec;

var UpdateGenerator = module.exports = function UpdateGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the update subgenerator with the argument ' + this.name + '.');
};

util.inherits(UpdateGenerator, yeoman.generators.NamedBase);

UpdateGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
