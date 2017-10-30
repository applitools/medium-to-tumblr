'use strict'
const {describe, it} = require('mocha')
const {expect} = require('chai')

const translate = require('../../src/translate')

describe('translate (unit)', function() {
  it('should remove style tags', () => {
    const input = '<p>lalala</p><style>bababab</style><p>foo</p>'
    const expected = '<p>lalala</p><p>foo</p>'

    expect(removePreambles(translate(input))).to.equal(expected)
  })

  it('should remove all style attributes', () => {
    const input = '<p style="color:red">lalala</p><p><span style="color:blue">f</span>oo</p>'
    const expected = '<p>lalala</p><p><span>f</span>oo</p>'

    expect(removePreambles(translate(input))).to.equal(expected)
  })

  it('should remove all class attributes', () => {
    const input = '<p class="foo bar">lalala</p><p><span class="foo zar">f</span>oo</p>'
    const expected = '<p>lalala</p><p><span>f</span>oo</p>'

    expect(removePreambles(translate(input))).to.equal(expected)
  })

  it('should remove all figcaptions', () => {
    const input = '<figure><img src="asdfasdf"><figcaption>Credit!</figcaption></figure>'
    const expected = '<figure><img src="asdfasdf"></figure>'

    expect(removePreambles(translate(input))).to.equal(expected)
  })

  it('should add a style preamble', () => {
    const input = '<p>foo</p>'
    const expectedToInclude1 = '<style>'
    const expectedToInclude2 = '</style>' + input

    expect(removePreambles(translate(input), false))
      .to.include(expectedToInclude1)
      .and.to.include(expectedToInclude2)
  })
})

function removePreambles(html, includingStyle = true) {
  const pre = html.replace('<head></head><body>', '').replace('</body>', '')

  if (!includingStyle) {
    return pre
  }

  return pre.replace(/<style>(.|\s)*<\/style>/, '')
}
