'use strict';

var grunto = require('grunto');

module.exports = grunto(function (grunt) {
	grunt.registerTask('test',   [
		'newer:eslint'/*<% if (testEngine === 'nodeunit') { %>*/,
		'nodeunit'/*<% } %>*/
	]);

	grunt.registerTask('default', [
		'test',
		'watch'
	]);

	return {
		/*<% if (testEngine === 'nodeunit') { %>*/
		nodeunit: {
			all: [
				'test/*.js'
			]
		},
		/*<% } %>*/

		eslint: {
			all: [
				'**/*.js',
				'!node_modules/**/*',
				'!lib-cov/**/*'
			]
		},

		watch: {
			files: [
				'lib/**/*',
				'!node_modules/**/*',
				'!lib-cov/**/*'
			],
			tasks: [
				'test'
			]
		}
	};
});
