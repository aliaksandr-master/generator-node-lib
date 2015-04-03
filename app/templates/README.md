<% if (props.shields && repository) { %>
[![npm](http://img.shields.io/npm/v/<%= appname.value %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= repository.name %>)
[![npm](http://img.shields.io/npm/l/<%= appname.value %>.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/<%= repository.user %>/<%= repository.name %>.svg?style=flat-square)](https://david-dm.org/<%= repository.user %>/<%= repository.name %>)
[![devDependency Status](https://david-dm.org/<%= repository.user %>/<%= repository.name %>/dev-status.svg?style=flat-square)](https://david-dm.org/<%= repository.user %>/<%= repository.name %>#info=devDependencies)
[![Build Status](https://travis-ci.org/<%= repository.user %>/<%= repository.name %>.svg?branch=master&style=flat-square)](https://travis-ci.org/<%= repository.user %>/<%= repository.name %>)
[![Coverage Status](https://img.shields.io/coveralls/<%= repository.user %>/<%= repository.name %>.svg?style=flat-square)](https://coveralls.io/r/<%= repository.user %>/<%= repository.name %>?branch=master)
<% } %>

# <%= appname.value %>

## Install
```shell
$ npm i <%= appname.value %> --save
```

# Enjoy !
