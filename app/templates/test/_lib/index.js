"use strict";

module.exports = process.env.<%= app.coverageEnvName %> ? require('./../../lib-cov') : require('./../../lib');
