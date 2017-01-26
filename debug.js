var jsdom = require("jsdom").jsdom;
global.window = window = jsdom().defaultView;

module.exports = require('./index')
