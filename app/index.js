'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
var git  = require('gift');
var fs = require('fs');
var url = require('url');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');

		var that = this;
		var done = this.async();
		var destPath = this.destinationPath();

		if (fs.existsSync(destPath + '/.git')) {
			var repo = git(destPath);
			repo.config(function (err, config) {
				if (err) {
					done();
					return;
				}
				var items = ((config || {}).items || {});
				var parsedUrl = url.parse(items['remote.origin.url'] || '');
				delete parsedUrl.auth;

				that.options.repo = url.format(parsedUrl);

				done();
			});
			return;
		}

		that.options.repo = undefined;
		done();
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to the ' + chalk.red('Node Lib') + ' generator!'
		));

		// https://github.com/aliaksandr-pasynkau/generator-node-lib
		var REPO_EXP = /^.+?github.com\/([^\/]+)\/([^\/]+).*$/;

		var prompts = [
			{
				type: "input",
				name: 'appname',
				message: 'AppName',
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
				name: 'keywords',
				message: 'Keywords',
				default: ''
			},
			{
				type: "input",
				name: 'description',
				message: 'Description',
				default: ''
			},
			{
				type: "input",
				name: 'githubRepo',
				message: 'Github Repository',
				validate: function (value) {
					return REPO_EXP.test(value);
				},
				default: this.options.repo
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
					"tab",
					"space"
				],
				default: 'tab'
			},
			{
				type: "input",
				name: 'indentSize',
				message: 'CodeFormat: indent size',
				default: 4
			}
		];

		this.prompt(prompts, function (props) {
			_.extend(this.options, props);
			this.options.githubRepo = (this.options.githubRepo || '').replace(/\.git$/, '');
			this.options.appnameVar = _.camelCase(this.options.appname.replace(/^[^a-zA-Z_$]+/, 'lib'));
			this.options.appnameCov = 'NODE_LIB_' + this.options.appnameVar.toUpperCase()+'_COVERAGE';

			this.options.githubUser     = this.options.githubRepo.replace(REPO_EXP, '$1');
			this.options.githubRepoName = this.options.githubRepo.replace(REPO_EXP, '$2');

			done();
		}.bind(this));
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
	},

	writing: {
		app: function () {
			this._copyTplDir('lib');
			this._copyTplDir('test');
			this._copyDotTplFile('editorconfig');
			this._copyDotFile('gitattributes');
			this._copyDotFile('gitignore');
			this._copyFile('Gruntfile.js');
			this._copyFile('index.js');
			this._copyDotFile('jshintrc');
			this._copyTpl('LICENSE');
			this._copyTpl('package.json');
			this._copyTpl('README.md');
			this._copyDotFile('travis.yml');
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
	}
});
