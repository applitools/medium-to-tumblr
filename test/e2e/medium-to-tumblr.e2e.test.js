'use strict'
const path = require('path')
const {describe, it, before, after} = require('mocha')
const {expect} = require('chai')
const fetch = require('node-fetch')
const {dockerComposeTool} = require('docker-compose-mocha')
const {getAddressForService} = require('@applitools/docker-compose-testkit')

describe('rendering-api-app e2e', function() {
  const composePath = path.join(__dirname, 'docker-compose.yml')
  const envName = dockerComposeTool(before, after, composePath, {
    shouldPullImages: !!process.env.NODE_ENV && process.env.NODE_ENV !== 'development',
    brutallyKill: true,
  })

  it('should return OK on /', async () => {
    const appAddress = await getAddressForService(envName, composePath, 'app', 80)

    const response = await fetch(`http://${appAddress}/`)

    expect(response.status).to.equal(200)
    expect(await response.text()).to.equal('')
  })
})
