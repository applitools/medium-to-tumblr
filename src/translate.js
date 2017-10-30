'use strict'
const {JSDOM} = require('jsdom')
const jQuery = require('jquery-slim')

function translate(html, utmContent) {
  const {window} = new JSDOM(html)
  const {document} = window

  const $ = jQuery(window)

  $('style').remove()
  $('figcaption').remove()
  $('*[style]').removeAttr('style')
  $('*[class]').removeAttr('class')

  $('body').append(`<!-- postfix -->
  <style>
  h2,
  h3,
  h4,
  h5 {
    font-weight: bold
  }
  </style>
  <p>
  <a href="https://applitools.com/landing/free-account-qa/?utm_source=Blog&amp;utm_medium=banner&amp;utm_content=${utmContent}"
    target="_blank">
    <img src="https://dl.dropboxusercontent.com/s/0llyxvhfyuj3ich/Automation_expert_coverage.png" style="min-width:600px!important;margin-left:-20px!important;">
  </a>
</p>

<p>
  <u>About the Author:</u>
  <br> 30 years of experience have not dulled the fascination Gil Tayar has with software development. From the olden days of
  DOS, to the contemporary world of Software Testing, Gil was, is, and always will be, a software developer. He has in the
  past co-founded WebCollage, survived the bubble collapse of 2000, and worked on various big cloudy projects at Wix.
  <br> His current passion is figuring out how to test software, a passion which he has turned into his main job as Evangelist
  and Senior Architect at Applitools. He has religiously tested all his software, from the early days as a junior software
  developer to the current days at Applitools, where he develops tests for software that tests software, which is almost
  one meta layer too many for him.
  <br> In his private life, he is a dad to two lovely kids (and a cat), an avid reader of Science Fiction, (he counts Samuel
  Delany, Robert Silverberg, and Robert Heinlein as favorites) and a passionate film buff. (Stanley Kubrick, Lars Von Trier,
  David Cronenberg, anybody?)
  <br> Unfortunately for him, he hasn’t really answered the big question of his life - he still doesn't know whether static languages
  or dynamic languages are best.
</p>`)

  return document.documentElement.innerHTML
}

module.exports = translate
