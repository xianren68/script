// ==UserScript==
// @name         pixiv.net
// @namespace    http://pixiv.net/
// @version      2024-09-21
// @description  获取pixiv.net的图片下载链接
// @author       You
// @match        https://www.pixiv.net/artworks/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// ==/UserScript==

;(function () {
    'use strict'
    const fn = () => {
        const container = document.getElementsByTagName('figure')[0]
        console.log(container)
        const link = container.querySelectorAll('a')[0].href
        const title = document.querySelector('h1')
        const linkTitle = document.createElement('span')
        linkTitle.innerText = '下载链接：' + link
        title.appendChild(linkTitle)
    }
    setTimeout(fn, 3000)
  })()