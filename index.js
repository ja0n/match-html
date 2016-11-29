var every = function (context, fn) { return Array.prototype.every.call(context, fn) }
var find = function (context, fn) { return Array.prototype.find.call(context, fn) }
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
    return modelNode.wholeText.toLowerCase() === inputNode.wholeText.toLowerCase()
  }

  var acceptTags = modelNode.getAttribute('acceptTags')
  var childCount = modelNode.getAttribute('childCount')

  var acceptedTags = [modelNode.tagName.toLowerCase()]

  if (acceptTags) {
    acceptedTags = acceptedTags.concat(acceptTags.toLowerCase().split('|'))
  }

  if (!acceptedTags.includes('*') && !acceptedTags.includes(inputNode.tagName.toLowerCase())) {
    return false
  }

  if (childCount && inputNode.childElementCount != childCount) {
    return false
  }

  var matchAttr = every(modelNode.attributes, function (modelAttr) {
    return find(inputNode.attributes, function (inputAttr) {
      var nameIsEqual = inputAttr.nodeName == modelAttr.nodeName
      var valueIsEqual = inputAttr.value == modelAttr.value

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
