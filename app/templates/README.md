<% if (repository) { %>
[![npm](http://img.shields.io/npm/v/<%= app.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= repository.name %>)
[![npm](http://img.shields.io/npm/l/<%= app.name %>.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/<%= repository.user %>/<%= repository.name %>.svg?style=flat-square)](https://david-dm.org/<%= repository.user %>/<%= repository.name %>)
[![devDependency Status](https://david-dm.org/<%= repository.user %>/<%= repository.name %>/dev-status.svg?style=flat-square)](https://david-dm.org/<%= repository.user %>/<%= repository.name %>#info=devDependencies)
[![Build Status](https://travis-ci.org/<%= repository.user %>/<%= repository.name %>.svg?branch=master&style=flat-square)](https://travis-ci.org/<%= repository.user %>/<%= repository.name %>)
[![Coverage Status](https://img.shields.io/coveralls/<%= repository.user %>/<%= repository.name %>.svg?style=flat-square)](https://coveralls.io/r/<%= repository.user %>/<%= repository.name %>?branch=master)
<% } %>

# <%= app.name %>
Powerfull nodeJs library

## Getting started 

To install `<%= app.name %>` from npm, run:
```bash
npm install -g <%= app.name %> --save
```

Finally, use the library:
```js
<%= app.varName %> = require('<%= app.name %>');

// do something helpful
```

### Enjoy!

## Contributing
If you want to develop this library do not be shy - Do that! [How to contribute open-source projects](https://guides.github.com/activities/contributing-to-open-source/)

### Run tests <%= app.name %>
```shell
$ npm test
```
