'use strict'
const {JSDOM} = require('jsdom')
const jQuery = require('jquery-slim')

function translate(html) {
  const {window} = new JSDOM(html)
  const {document} = window

  const $ = jQuery(window)

  $('style').remove()

  return document.documentElement.innerHTML
}

module.exports = translate
