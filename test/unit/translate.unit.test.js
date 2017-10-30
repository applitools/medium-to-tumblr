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

  it('should add a preamble', () => {
    const input = '<p>foo</p>'
    const expectedToInclude1 = '<style>'
    const expectedToInclude2 = '</style>'

    expect(removePreambles(translate(input, 'the-utm-content'), false))
      .to.include(expectedToInclude1)
      .and.to.include(expectedToInclude2)
      .and.to.include('utm_content=the-utm-content')
      .and.to.include('Gil Tayar')
  })
})

function removePreambles(html, includingPrePostFixes = true) {
  const pre = html.replace('<head></head><body>', '').replace('</body>', '')

  if (!includingPrePostFixes) {
    return pre
  }

  return pre.replace(/<!-- postfix -->(.|\s)*$/, '')
}
