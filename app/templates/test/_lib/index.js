'use strict';
/*eslint no-process-env:0 */

module.exports = process.env.<%= app.coverageEnvName %> ? require('./../../lib-cov') : require('./../../lib');
