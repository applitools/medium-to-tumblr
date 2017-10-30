'use strict'
const {JSDOM} = require('jsdom')
const jQuery = require('jquery-slim')

function translate(prefix, postfix, html) {
  const {window} = new JSDOM(html)
  const {document} = window

  const $ = jQuery(window)

  $('style').remove()
  $('figcaption').remove()
  $('*[style]').removeAttr('style')
  $('*[class]').removeAttr('class')

  prefix && $('body').prepend(prefix)
  postfix && $('body').append(postfix)

  return document.documentElement.innerHTML
}

module.exports = translate
