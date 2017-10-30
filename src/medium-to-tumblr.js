'use strict'
const {promisify: p} = require('util')
const fs = require('fs')
const yargs = require('yargs')
const translate = require('./translate')

async function main(argv, {shouldExitOnError = false} = {}) {
  const commandLineOptions = yargs
    .option('output', {
      description: 'where to output the file. if not defined, will write to stdout',
      alias: 'o',
    })
    .exitProcess(shouldExitOnError)
    .strict()
    .help()

  const options = commandLineOptions.parse(argv)

  const fileToTranslate = options._[0]

  const html = await p(fs.readFile)(fileToTranslate, 'utf-8')

  const translatedHtml = translate(html)

  if (!options.output) {
    process.stdout.write(translatedHtml)
    process.stdout.write('\n')
  } else {
    await p(fs.writeFile)(translatedHtml)
  }
}

module.exports = main
