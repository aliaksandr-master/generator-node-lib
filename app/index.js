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
var REPO_EXP = /^.+?(?:github\.com|bitbucket\.org)\/([^\/]+)\/([^\/]+).+?\/?(?:\?.*)?$/;

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
		this.answers = {};

		this._git();
	},

	_git: function () {
		var done = this.async();
		var that = this;
		var destinationPath = this.destinationPath();

		if (!fs.existsSync(path.resolve(destinationPath, '.git'))) {
			done();
			return;
		}

		git(destinationPath).config(function (err, config) {
			if (err) {
				return done();
			}

			var items = (config || {}).items || {};
			var parsedUrl = url.parse(items['remote.origin.url'] || '');

			delete parsedUrl.auth;
			delete parsedUrl.query;
			delete parsedUrl.search;
			delete parsedUrl.hash;
			delete parsedUrl.path;

			that.repository = url.format(parsedUrl);

			done();
		});
	},

	prompting: function () {
		var that = this;
		var done = this.async();

		this.log(yosay( 'Welcome to the ' + chalk.red('Node Lib') + ' generator!' ));

		var prompts = [
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
				default: this.repository
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
		];

		this.prompt(prompts, function (answers) {
			_.each(prompts, function (v) {
				if (!answers.hasOwnProperty(v.name)) {
					answers[v.name] = null;
				}
			});

			that.answers = answers;
			done();
		});
	},

	prepareProps: function () {
		var cfg = _.clone(this.answers);

		delete cfg.repository;
		delete cfg.appname;

		cfg.app = {};
		cfg.app.name = this.answers.appname;
		cfg.app.varName = _.camelCase(cfg.app.name.replace(/^[^a-zA-Z_$]+/, 'lib'));
		cfg.app.coverageEnvName = 'NODE_LIB_' + cfg.app.varName.toUpperCase()+'_COVERAGE';

		cfg.repository = null;
		if (this.answers.repository) {
			var repo = this.answers.repository;

			cfg.repository = {};
			cfg.repository.url = (repo || '').replace(/\.git$/, '');
			cfg.repository.user = repo.replace(REPO_EXP, '$1');
			cfg.repository.name = repo.replace(REPO_EXP, '$2');
		}

		this.config.set(cfg);
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
			this._copyDotTplFile('travis.yml');

			// simple copy
			this._copyDotFile('gitattributes');
			this._copyDotFile('gitignore');
			this._copyDotFile('jshintrc');
			this._copyFile('Gruntfile.js');
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

	saveConfig: function () {
		this.config.save();
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
				this.config.getAll()
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
			this.config.getAll()
		);
	},

	_copyTpl: function (file) {
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath(file),
			this.config.getAll()
		);
	}
});
