// ==UserScript==
// @name         telegraph
// @namespace    http://tampermonkey.net/
// @version      2024-09-21
// @description  自动下载telegra.ph页面上的图片为ZIP
// @author       You
// @match        https://telegra.ph/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// ==/UserScript==

;(function () {
    'use strict'
    // 交互的按钮
    const button = document.createElement('button')
    // telegra.ph页面的头部
    const header = document.getElementsByClassName('tl_article_header')[0]
    const downloadImagesAsZip = async imgList => {
      const JSZip = window.JSZip
      const jszip = new JSZip()
      let promises = []
  
      imgList.forEach((img, index) => {
        // 添加顺序，防止图片下载顺序错乱
        const url = img.src
        const imgName = `${index + 1}.jpg`
        promises.push(
          fetch(url)
            .then(res => res.blob())
            .then(blob => {
              jszip.file(imgName, blob)
            })
        )
      })
  
      try {
        await Promise.all(promises)
        // 打包为zip
        const content = await jszip.generateAsync({ type: 'blob' })
        saveAs(content, 'images.zip')
      } catch (error) {
        button.innerText = '下载失败'
      }
    }
  
  
  
    button.innerText = '开始下载'
    button.onclick = () => {
      const imgList = document.querySelectorAll('.figure_wrapper img')
      console.log(`共找到 ${imgList.length} 张图片`)
      button.innerText = '正在打包下载，请稍等'
      downloadImagesAsZip(imgList)
    }
  
    header.appendChild(button)
  })()