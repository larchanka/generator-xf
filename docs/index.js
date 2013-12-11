var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    exec = require('child_process').exec,
    XF = require('../app/xf.js'),
    md = require("github-flavored-markdown").parse,
    ent = require("entities").encode;
    
var mocksFile = './docs/mocks/menu.json',
    indexFile = './docs/index.html';

var DocsGenerator = module.exports = function DocsGenerator(args, options, config) {

    console.log('\033[2J');

    if (args.length === 0) {
        args[0] = 'model';
    }

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(DocsGenerator, yeoman.generators.NamedBase);

DocsGenerator.prototype.process = function create() {

    XF.checkUpdate();

    var splitReg = new RegExp(/\n{1}#{1}[\s]{1}[^\n]{1,}/ig)
        splitReg_ = new RegExp(/\n{1}#{1}#{1}[\s]{1}[^\n]{1,}/ig);

    console.log('\033[2J\033[39m\x1b[1mCreating documentation:\n');

    var DOCFILE = '\n' + fs.readFileSync('./README.md', 'utf8', function (err) {

        if (err) {
            throw err;
            return;
        }
    });

    var docsDivRow = DOCFILE.split(splitReg);
    var docsDividers = DOCFILE.match(splitReg);

    fs.writeFileSync(mocksFile, '[\n');
    fs.writeFileSync(indexFile, '<!doctype html><head><title>XFramework Docs</title></head><body><h1>XFramework</h1><ul>');

    for (var i = 0;i <= docsDividers.length; ++i) {

        var docsRow = docsDivRow[i].split(splitReg_);
        var docsHeaders = docsDivRow[i].match(splitReg_);

        for (var x_ in docsHeaders) {

            var x = parseFloat(x_);

            var nt = docsRow[x+1].replace(/```html([\w\s\d\W\S\D]*?)```/gim, replacer);

            var text = md(docsHeaders[x] + nt),
                fileName = docsHeaders[x].replace('## ', '')
                                        .replace(/[&\/\\,+()$~%.'":*?<>{}\s]/g, '_')
                                        .replace('_', '').toLowerCase();

            if (x === 0) {
                var divName_ = docsDividers[i-1].replace('\n# ', '')
                            .replace(/[&\/\\,+()$~%.'":*?<>{}\s]/g, '_')
                            .replace('_', '').toLowerCase(),
                    divName = docsDividers[i-1].replace('\n# ', '');

                fs.appendFileSync(mocksFile, '{\n\
                    "title": 	"'+divName+'",\n\
                    "url":		"'+fileName+'",\n\
                    "isHeader":	true\n\
                },\n');
                
                fs.appendFileSync(indexFile, '<li><a href="'+fileName+'.html"><strong>'+divName+'"</strong></a></li>');
            }

            var docName = docsHeaders[x].replace('\n## ', '');

            fs.appendFileSync(mocksFile, '{\n\
                "title": 	"'+docName+'",\n\
                "url":		"'+fileName+'"\n\
            }');
            
            fs.appendFileSync(indexFile, '<li>&nbsp; &nbsp; <a href="'+fileName+'.html">'+docName+'"</a></li>');

            if (x == docsHeaders.length - 1 && i == docsDividers.length) {
                fs.appendFileSync(mocksFile, '\n');
            } else {
                fs.appendFileSync(mocksFile, ',\n');
            }

            fs.writeFile('./docs/' + fileName + '.html', text);
            console.log('\x1b[0m\033[32m* \033[39m\x1b[1mFile ./docs/' + fileName + '.html created');
        }
    }

    fs.appendFileSync(mocksFile, '\n]');
    fs.appendFileSync(indexFile, '</ul></body></html>');

    console.log('\nDone!\n');

};

var replacer = function (match, p1, p2, p3, offset, string){
  return ent(match);
};