var jsdom = require("jsdom").jsdom;
global.window = window = jsdom().defaultView;
global.document = window.document;

module.exports = require('./index')
