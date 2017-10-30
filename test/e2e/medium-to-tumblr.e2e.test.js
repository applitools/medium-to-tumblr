'use strict'
const {promisify: p} = require('util')
const path = require('path')
const fs = require('fs')
const os = require('os')
const {execFile} = require('child_process')
const {describe, it} = require('mocha')
const chai = require('chai')
const chaiFiles = require('chai-files')
const {expect} = chai
const {file} = chaiFiles

chai.use(chaiFiles)

describe('medium-to-tumblr (e2e)', function() {
  it('should write default html', async () => {
    const tmpDir = await p(fs.mkdtemp)(os.tmpdir() + '/')
    const outputFile = path.join(tmpDir, 'tumblr-output.html')

    const {stdout, stderr} = await p(execFile)(
      path.resolve(__dirname, '../../scripts/run-medium-to-tumblr.js'),
      [path.join(__dirname, 'resources/medium-simple-post.html'), '-o', outputFile],
    )
    expect(stdout).to.be.empty
    expect(stderr).to.be.empty

    expect(file(outputFile)).to.equal(
      file(path.join(__dirname, 'resources/tumblr-simple-post.html')),
    )
  })
  it('should write default html to stdout', async () => {
    const {stdout, stderr} = await p(execFile)(
      path.resolve(__dirname, '../../scripts/run-medium-to-tumblr.js'),
      [path.join(__dirname, 'resources/medium-simple-post.html')],
    )

    expect(stdout).to.equal(file(path.join(__dirname, 'resources/tumblr-simple-post.html')))
    expect(stderr).to.be.empty
  })
})
