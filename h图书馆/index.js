// ==UserScript==
// @name         hlib.cc
// @namespace    https://hlib.cc/
// @version      2024-09-21
// @description 复制h图书馆文本
// @author       You
// @match       https://hlib.cc/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// ==/UserScript==

(function () {
  "use strict";
  const textCenter = document.getElementsByClassName("text-center")[0];
  const btn = document.createElement("button");
  btn.innerText = "点击复制";
  btn.addEventListener("click", () => {
    const content = document.getElementsByTagName("pre")[0];
    const pList = content.getElementsByTagName("p");
    let str = "";
    for (const p of pList) {
      let temp = p.innerText;
      if (temp) {
        str = str + temp + "\n";
      }
    }
    navigator.clipboard.writeText(str);
  });
  textCenter.appendChild(btn);
})();
