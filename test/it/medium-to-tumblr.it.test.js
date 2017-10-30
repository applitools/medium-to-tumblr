'use strict'
const {promisify: p} = require('util')
const path = require('path')
const fs = require('fs')
const os = require('os')
const {describe, it} = require('mocha')
const chai = require('chai')
const chaiFiles = require('chai-files')
const {expect} = chai
const {file} = chaiFiles

chai.use(chaiFiles)

const app = require('../..')

describe.only('medium-to-tumblr (it)', function() {
  it('should write default html', async () => {
    const tmpDir = await p(fs.mkdtemp)(os.tmpdir() + '/')
    const outputFile = path.join(tmpDir, 'tumblr-output.html')

    await app([path.join(__dirname, 'resources/medium-simple-post.html'), '-o', outputFile])

    expect(file(outputFile)).to.equal(
      file(path.join(__dirname, 'resources/tumblr-simple-post.html')),
    )
  })
})
