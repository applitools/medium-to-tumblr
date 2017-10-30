'use strict'
const {JSDOM} = require('jsdom')
const jQuery = require('jquery-slim')

function translate(html) {
  const {window} = new JSDOM(html)
  const {document} = window

  const $ = jQuery(window)

  $('style').remove()
  $('figcaption').remove()
  $('*[style]').removeAttr('style')
  $('*[class]').removeAttr('class')
  $('body').prepend(`<style>
    h2,
    h3,
    h4,
    h5 {
      font-weight: bold
    }
  </style>`)

  return document.documentElement.innerHTML
}

module.exports = translate
