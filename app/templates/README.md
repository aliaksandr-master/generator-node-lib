<% if (githubRepoName && githubUser) { %>
[![npm](http://img.shields.io/npm/v/<%= appname %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= githubRepoName %>)
[![npm](http://img.shields.io/npm/l/<%= appname %>.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/<%= githubUser %>/<%= githubRepoName %>.svg?style=flat-square)](https://david-dm.org/<%= githubUser %>/<%= githubRepoName %>)
[![devDependency Status](https://david-dm.org/<%= githubUser %>/<%= githubRepoName %>/dev-status.svg?style=flat-square)](https://david-dm.org/<%= githubUser %>/<%= githubRepoName %>#info=devDependencies)
[![Build Status](https://travis-ci.org/<%= githubUser %>/<%= githubRepoName %>.svg?branch=master&style=flat-square)](https://travis-ci.org/<%= githubUser %>/<%= githubRepoName %>)
[![Coverage Status](https://img.shields.io/coveralls/<%= githubUser %>/<%= githubRepoName %>.svg?style=flat-square)](https://coveralls.io/r/<%= githubUser %>/<%= githubRepoName %>?branch=master)
<% } %>

# <%= appname %>
<%= description %>

## Install
```shell
$ npm i <%= appname %> --save
```

# Enjoy !
