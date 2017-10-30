'use strict'
const {describe, it} = require('mocha')
const {expect} = require('chai')

const translate = require('../../src/translate')

describe('translate (unit)', function() {
  it('should remove style tags', () => {
    const input = '<p>lalala</p><style>bababab</style><p>foo</p>'
    const expected = '<p>lalala</p><p>foo</p>'

    expect(translate(input)).to.equal(expected)
  })
})
