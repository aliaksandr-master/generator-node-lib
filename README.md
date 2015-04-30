[![npm](http://img.shields.io/npm/v/generator-node-lib.svg?style=flat-square)](https://www.npmjs.com/package/generator-node-lib)
[![npm](http://img.shields.io/npm/l/generator-node-lib.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-pasynkau/generator-node-lib.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/generator-node-lib)
[![devDependency Status](https://david-dm.org/aliaksandr-pasynkau/generator-node-lib/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/generator-node-lib#info=devDependencies)

# generator-node-lib 
Complete open-source nodeJs library development process

> [Yeoman](http://yeoman.io) generator

Thank you for usage

## Features
- github.com and bitbacke.org git repositories support
- base config files: jshint, editorconfig, gitignore
- tests by different engines 
	- [nodeunit](https://github.com/caolan/nodeunit)
- continues integration (by [travis-ci](https://travis-ci.org))
- code test coverage (by [coveralls.io](https://coveralls.io))
- default shields in readme.md for your project (if you specified the repository), such as npm-version, npm-licence, devDependencies, dependencies, travis-ci build status, coverage percent

## Getting Started
You need answer on the questions:

1. Library Name `(default: directory name)`
2. Version `(default: 1.0.0)`
3. Enter git repository `(default: will use from existing file ./.git/config or empty)`
4. Add Travis-CI? `(default: true)`
5. Add Coverals.io? `(default: true)`
6. Test Engine `(default: nodeunit)`
7. License `(default: MIT)`
8. CodeFormat: indent type `(default: TAB)`
9. CodeFormat: indent size `(default: 4)`

### Usage generator
To install generator-node-lib from npm, run:
```shell
$ npm install -g generator-node-lib
```

Finally, initiate the generator:
```shell
$ yo node-lib

#or, if you want to install dependencies manually
$ yo node-lib --slip-install 
```

### Usage generated library
After answers on all questions you have base infrastructure for development, testing and deployment your library

Install dependencies of your library
```shell
$ npm install
```

Watch project files and run check tasks (jshint, tests)
```shell
$ grunt default
# or
$ grunt check watch
```

For add new dependencies 
```shell
$ npm install needed-package --save 
```

For running your tests need
```shell
$ npm test
#or
$ grunt check
```


## What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo
```

## License
MIT

## Support
If you have any problems, catch the bug or have any suggestion - please [find an existing issue or create new](https://github.com/aliaksandr-pasynkau/generator-node-lib/issues)

## Contributing
Do that! [How to contribute open-source projects](https://guides.github.com/activities/contributing-to-open-source/)

### Together we can change the world!
