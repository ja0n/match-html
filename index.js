var jsdom = require("jsdom").jsdom;
var window = jsdom().defaultView;
var document = window.document;


var every = function (context, fn) { return Array.prototype.every.call(context, fn) }
var find = function (context, fn) { return Array.prototype.find.call(context, fn) }
var map = function (context, fn) { return Array.prototype.map.call(context, fn) }
var lowerCase = function (str) { return str && str.toLowerCase() }
var reservedAttributes = map(['acceptTags', 'childCount'], lowerCase)
var whitespaceRegex = /\>\s+\</g

function matchHTML(model, input) {
  var modelDOM = makeDOM(removeWhitespace(model))
  var inputDOM = makeDOM(removeWhitespace(input))

  return matchDOM(modelDOM, inputDOM)
}

function makeDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html
  return div
}

function removeWhitespace(str) {
  return str.replace(whitespaceRegex, '><')
}

function matchDOM(modelNode, inputNode) {
  if (!inputNode || !inputNode) {
    return false
  }

  if (modelNode.nodeType === document.TEXT_NODE) {
    return true
    return lowerCase(modelNode.wholeText) === lowerCase(inputNode.wholeText)
  }

  var acceptTags = modelNode.getAttribute('acceptTags')
  var childCount = modelNode.getAttribute('childCount')

  var acceptedTags = [lowerCase(modelNode.tagName)]

  if (acceptTags) {
    acceptedTags = acceptedTags.concat(lowerCase(acceptTags).split('|'))
  }

  if (!acceptedTags.includes('*') && !acceptedTags.includes(lowerCase(inputNode.tagName))) {
    return false
  }

  if (childCount && inputNode.childElementCount != childCount) {
    return false
  }

  var matchAttr = every(modelNode.attributes, function (modelAttr) {
    if (reservedAttributes.indexOf(lowerCase(modelAttr.nodeName)) !== -1) {
      return true
    }

    return find(inputNode.attributes, function (inputAttr) {
      var nameIsEqual = inputAttr.nodeName == modelAttr.nodeName
      var valueIsEqual = lowerCase(inputAttr.value) == lowerCase(modelAttr.value)

      return nameIsEqual && valueIsEqual
    })
  })

  if (!matchAttr) {
    return false
  }


  if (modelNode.hasChildNodes()) {
    return every(modelNode.childNodes, function (node, index) {
      return matchDOM(node, inputNode.childNodes[index])
    })
  }

  return true
}

module.exports = matchHTML
