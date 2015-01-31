"use strict";

module.exports = process.env.<%= appnameCov %> ? require('./../../lib-cov') : require('./../../lib');
