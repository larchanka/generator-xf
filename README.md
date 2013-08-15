# Yeoman Generator for [X-Framework](https://github.com/epam/x-framework)


## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-xf`
- Run: `yo xf`

## Subgenerators
XF generator has some subgenerators.

### Update
Allows you to update sources. Can use parameters:
- `yo xf:update all` - update less and js files (inluding thirparty libraries)
- `yo xf:update js` update js files (inluding thirparty libraries)
- `yo xf:update css` update less files

### Build
Allows you to build xf.js and xf.min js. Can use parameters:
- `yo xf:build` - create build with all UI elements
- `yo xf:build button:fieldset` - create build 'button' and 'fiedset' elements.

Full list of available elements can be found at [xf/ui](https://github.com/epam/x-framework/tree/master/xf/ui) directory.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
