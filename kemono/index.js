// ==UserScript==
// @name         kemono.su
// @namespace    http://tampermonkey.net/
// @version      2024-09-21
// @description  自动下载telegra.ph页面上的图片为ZIP
// @author       You
// @match        https://kemono.su/patreon/user/*/post/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// ==/UserScript==

;(function () {
    'use strict'
    const fn = () => {
      // 下载图片到压缩包
      const downloadImagesAsZip = async imgList => {
        const JSZip = window.JSZip
        const jszip = new JSZip()
        let promises = []
  
        imgList.forEach(img => {
          const url = img.href
          const imgName = decodeURIComponent(url).split('=').at(-1)
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
      // 交互的按钮
      const button = document.createElement('button')
      // 获取头部
      const header = document.getElementsByClassName('post__header')[0]
      // 添加下载头部
      header.appendChild(button)
      button.innerText = '开始下载'
      // 获取容器
      const container = document.getElementsByClassName('post__files')[0]
      button.onclick = () => {
        const imgList = container.querySelectorAll('a')
        alert('共找到' + imgList.length + '张图片')
        button.innerText = '正在打包下载，请稍等'
        downloadImagesAsZip(imgList)
      }
    }
    setTimeout(fn, 3000)
  })()