'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
var git  = require('gift');
var fs = require('fs');
var url = require('url');

// https://github.com/aliaksandr-pasynkau/generator-node-lib
var REPO_EXP = /^.+?github.com\/([^\/]+)\/([^\/]+).+?\/?(?:\?.*)?$/;

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
	},

	git: function () {
		var done = this.async();
		var that = this;
		var destination = this.destinationPath();

		that.options.repository = undefined;

		if (!fs.existsSync(destination + '/.git')) {
			done();
			return;
		}

		git(destination).config(function (err, config) {
			if (err) {
				done();
				return;
			}

			var items = ((config || {}).items || {});
			var parsedUrl = url.parse(items['remote.origin.url'] || '');
			delete parsedUrl.auth;

			that.options.repository = url.format(parsedUrl);

			done();
		});
	},

	prompting: function () {
		var that = this;
		var done = this.async();

		this.log(yosay( 'Welcome to the ' + chalk.red('Node Lib') + ' generator!' ));

		this.prompt([
			{
				type: "input",
				name: 'appname',
				message: 'Library Name',
				default: path.basename(this.destinationPath()),
				validate: function (value) {
					return /^[_a-zA-Z][a-zA-Z0-9_-]*$/.test(value);
				}
			},
			{
				type: 'input',
				name: 'version',
				message: 'Version',
				default: '1.0.0',
				validate: function (value) {
					return /^\d+\.\d+\.\d+(-.+)?$/.test(value);
				}
			},
			{
				type: "input",
				name: 'repository',
				message: 'GitHub Repository',
				validate: function (value) {
					return !value.length || REPO_EXP.test(value);
				},
				default: this.options.repository
			},
			{
				type: 'confirm',
				message: 'Add Travis-CI?',
				name: 'travis',
				default: true,
				when: function (answ) {
					return Boolean(answ.repository);
				}
			},
			{
				type: 'confirm',
				message: 'Add Coverals.io?',
				name: 'coveralls',
				default: true,
				when: function (answ) {
					return Boolean(answ.repository && answ.travis);
				}
			},
			{
				type: 'confirm',
				message: 'add shields?',
				name: 'shields',
				default: true,
				when: function (answ) {
					return Boolean(answ.repository);
				}
			},
			{
				type: 'list',
				message: "Test Engine",
				name: "testEngine",
				choices: [
					{ value: 'nodeunit', name: "NodeUnit", checked: true }
				]
			},
			{
				type: "input",
				name: 'license',
				message: 'License',
				default: 'MIT'
			},
			{
				type: "list",
				name: 'indentType',
				message: 'CodeFormat: indent type',
				choices: [
					{ name: "tab", checked: true },
					{ name: "space" }
				]
			},
			{
				type: "input",
				name: 'indentSize',
				message: 'CodeFormat: indent size',
				default: 4
			}
		], function (props) {
			that.options.props = props;
			done();
		});
	},

	prepareProps: function () {
		this.options.appname = {};
		this.options.appname.value = this.options.props.appname;
		this.options.appname.varName = _.camelCase(this.options.appname.value.replace(/^[^a-zA-Z_$]+/, 'lib'));
		this.options.appname.cevEnvName = 'NODE_LIB_' + this.options.appname.varName.toUpperCase()+'_COVERAGE';

		this.options.repository = null;

		if (this.options.props.repository) {
			var repo = this.options.props.repository;

			this.options.repository = {};
			this.options.repository.url = (repo || '').replace(/\.git$/, '');
			this.options.user = repo.replace(REPO_EXP, '$1');
			this.options.name = repo.replace(REPO_EXP, '$2');
		}

		console.log(this.options);
	},

	writing: {
		app: function () {
			// copy and template
			this._copyTplDir('lib');
			this._copyTplDir('test');

			this._copyTpl('LICENSE');
			this._copyTpl('package.json');
			this._copyTpl('README.md');
			this._copyDotTplFile('editorconfig');

			// simple copy
			this._copyDotFile('gitattributes');
			this._copyDotFile('gitignore');
			this._copyDotFile('jshintrc');
			this._copyDotFile('travis.yml');
			this._copyFile('Gruntfile.js');
			this._copyFile('index.js');
		}
	},

	install: function () {
		this.installDependencies({
			bower: false,
			npm: true,
			skipInstall: this.options['skip-install'],
			callback: function () {
				console.log('Everything is ready!');
			}
		});
	},

	_copyDir: function (dirname) {
		this.expandFiles(dirname + '/**/*', { cwd: this.templatePath() }).forEach(function (file) {
			this.fs.copy(
				this.templatePath(file),
				this.destinationPath(file)
			);
		}, this);
	},

	_copyTplDir: function (dirname) {
		this.expandFiles(dirname + '/**/*', { cwd: this.templatePath() }).forEach(function (file) {
			this.fs.copyTpl(
				this.templatePath(file),
				this.destinationPath(file),
				this.options
			);
		}, this);
	},

	_copyFile: function (file) {
		this.fs.copy(
			this.templatePath(file),
			this.destinationPath(file)
		);
	},

	_copyDotFile: function (file) {
		this.fs.copy(
			this.templatePath(file),
			this.destinationPath('.' + file)
		);
	},

	_copyDotTplFile: function (file) {
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath('.' + file),
			this.options
		);
	},

	_copyTpl: function (file) {
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath(file),
			this.options
		);
	}
});
