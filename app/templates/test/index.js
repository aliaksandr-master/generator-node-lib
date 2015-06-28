'use strict';

exports['test loading'] = function (test) {
	test.doesNotThrow(function () {
		require('./_lib');
	});

	test.done();
};
