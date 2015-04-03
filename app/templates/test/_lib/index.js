"use strict";

module.exports = process.env.<%= appname.covName %> ? require('./../../lib-cov') : require('./../../lib');
