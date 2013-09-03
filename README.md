
# [X-Framework](https://github.com/epam/x-framework) Generator


## Getting started
- Make sure you have [yeoman](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-xf`
- Run: `yo xf`. It will download last versions of X-Framework, jQuery, Backbone and Underscore and run [Build](#build).

## Subgenerators
XF generator has some subgenerators.

### Update
Allows you to update sources and run [Build](#build). Can use parameters:
- `yo xf:update [all]` — update less and js files of X-Framework, check latest versions of jQuery, Backbone, Underscore
- `yo xf:update js` — update js files (inluding thirdparty libraries) of X-Framework, check latest versions of jQuery, Backbone, Underscore
- `yo xf:update css` — update less files of X-Framework

### Build
Allows you to build xf.js and xf.min js. Can use parameters:
- `yo xf:build` — create build with all [UI](https://github.com/epam/x-framework/tree/master/xf/ui) elements
- `yo xf:build button:fieldset` — create build 'button' and 'fieldset' elements.

Full list of available elements can be found at [xf/ui](https://github.com/epam/x-framework/tree/master/xf/ui) directory of X-Framework.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
