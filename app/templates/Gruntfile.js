"use strict";

module.exports = require('grunto')(function(grunt) {
	grunt.registerTask('check',   [ 'newer:jshint:all', 'nodeunit' ]);
	grunt.registerTask('default', [ 'check', 'watch' ]);

	return {
		nodeunit: {
			all: [
				'test/*.js'
			]
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: [
				'**/*.{js,json}',
				'!node_modules/**/*.{js,json}',
				'!lib-cov/**/*.{js,json}'
			]
		},
		watch: {
			files: [
				'**/*',
				'!node_modules/**/*',
				'!lib-cov/**/*'
			],
			tasks: [
				'check'
			]
		}
	};
});
