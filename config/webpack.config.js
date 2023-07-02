"use strict";

var glob = require('glob');
var path = require('path');

const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const PATHS = require("./paths");

// Merge webpack configuration files
const config = merge(common, {
  entry: glob.sync(PATHS.src + '/**.js').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
  },{}),
});

module.exports = config;
