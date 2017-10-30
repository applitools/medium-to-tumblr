'use strict'
const {describe, it} = require('mocha')
const {expect} = require('chai')

const translate = require('../../src/translate')

describe('translate (unit)', function() {
  const simpleTranslate = html => removePreambles(translate('', '', html))

  it('should remove style tags', () => {
    const input = '<p>lalala</p><style>bababab</style><p>foo</p>'
    const expected = '<p>lalala</p><p>foo</p>'

    expect(simpleTranslate(input)).to.equal(expected)
  })

  it('should remove all style attributes', () => {
    const input = '<p style="color:red">lalala</p><p><span style="color:blue">f</span>oo</p>'
    const expected = '<p>lalala</p><p><span>f</span>oo</p>'

    expect(simpleTranslate(input)).to.equal(expected)
  })

  it('should remove all class attributes', () => {
    const input = '<p class="foo bar">lalala</p><p><span class="foo zar">f</span>oo</p>'
    const expected = '<p>lalala</p><p><span>f</span>oo</p>'

    expect(simpleTranslate(input)).to.equal(expected)
  })

  it('should remove all figcaptions', () => {
    const input = '<figure><img src="asdfasdf"><figcaption>Credit!</figcaption></figure>'
    const expected = '<figure><img src="asdfasdf"></figure>'

    expect(simpleTranslate(input)).to.equal(expected)
  })

  it('should add a prefix and postfix', () => {
    const input = '<body>x<p>foo</p>y</body>'
    const prefix = '<div>prefix</div>'
    const postfix = '<div>postfix</div>'
    const expected = '<head></head><body><div>prefix</div>x<p>foo</p>y<div>postfix</div></body>'

    expect(translate(prefix, postfix, input)).to.equal(expected)
  })
})

function removePreambles(html) {
  return html.replace('<head></head><body>', '').replace('</body>', '')
}
