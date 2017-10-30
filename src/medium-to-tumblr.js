'use strict'
const {promisify: p} = require('util')
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const translate = require('./translate')

async function main(argv, {shouldExitOnError = false} = {}) {
  const commandLineOptions = yargs
    .option('output', {
      description: 'where to output the file. if not defined, will write to stdout',
      alias: 'o',
    })
    .option('author', {
      description: 'bio of author, as found in src/resources/bio-<author>.html',
      alias: 'a',
      default: 'gil',
    })
    .option('guest', {
      description: 'guest post string',
      alias: 'g',
      default: 'Gil Tayar, Senior Architect at Applitools',
    })
    .option('utm', {
      description: 'utm tag for analyzing',
      alias: 'u',
      default: 'gil-blog-post',
    })
    .exitProcess(shouldExitOnError)
    .strict()
    .help()

  const options = commandLineOptions.parse(argv)
  const fileToTranslate = options._[0]

  const html = await p(fs.readFile)(fileToTranslate, 'utf-8')
  const prefix = `<p>Guest post by ${options.guest}</p>`
  const bio = await p(fs.readFile)(
    path.join(__dirname, `resources/bio-${options.author}.html`),
    'utf-8',
  )
  const postfix = await p(fs.readFile)(path.join(__dirname, `resources/postfix.html`), 'utf-8')
  const postfixWithBioAndStuff = postfix.replace('${bio}', bio).replace('${utm}', options.utm)

  const translatedHtml = translate(prefix, postfixWithBioAndStuff, html)

  if (!options.output) {
    process.stdout.write(translatedHtml)
  } else {
    await p(fs.writeFile)(options.output, translatedHtml)
  }
}

module.exports = main
