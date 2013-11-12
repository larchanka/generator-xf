
# [X-Framework](https://github.com/epam/x-framework) Generator

![https://travis-ci.org/larchanka/generator-xf](https://api.travis-ci.org/larchanka/generator-xf.png)

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
- `yo xf:update scripts` — update js files (inluding thirdparty libraries) of X-Framework, check latest versions of jQuery, Backbone, Underscore
- `yo xf:update styles` — update less files of X-Framework

### Build
Allows you to build xf.js and xf.min js. Can use parameters:
- `yo xf:build` — create build with all [UI](https://github.com/epam/x-framework/tree/master/xf/ui) elements
- `yo xf:build button:fieldset:...` — create build 'button' and 'fieldset' elements

Full list of available elements can be found at [xf/ui](https://github.com/epam/x-framework/tree/master/xf/ui) directory of X-Framework.

### Application
Allows you to create boilerplate. Can use parameters:
- `yo xf:application [init] [name]` — create simple boilerplate for your app, where 'name' is the name of the app

### Collection
Allows you to create simple collection. Can use parameters:
- `yo xf:collection [name]` — create simple collection with name

### View
Allows you to create simple view. Can use parameters:
- `yo xf:view [name]` — create simple view with name

### Component
Allows you to create simple component. Can use parameters:
- `yo xf:component [name]` — create simple component with name

### Model
Allows you to create simple model. Can use parameters:
- `yo xf:model [name]` — create simple model with name

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
