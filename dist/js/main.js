!function(){"use strict";document.addEventListener("DOMContentLoaded",function(){const e=document.documentElement,t=document.querySelector(".header"),o=document.querySelector(".burger");if(t&&o&&o.addEventListener("click",()=>{t.classList.toggle("open"),o.classList.toggle("open"),e.classList.toggle("lock")}),window.addEventListener("scroll",function(){t&&90<window.scrollY&&1280<=window.innerWidth?t.classList.add("min"):t.classList.remove("min")}),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){let t=!0;document.addEventListener("touchstart",()=>{var e=document.querySelectorAll("video");t&&e.length&&e.forEach(e=>e.play()),t=!1})}const n=document.querySelectorAll(".openModal"),c=document.querySelector(".modal"),i=(n.length&&c&&(n.forEach(e=>{e.addEventListener("click",()=>{c.classList.add("open")})}),c.querySelector(".modal__close").addEventListener("click",()=>{c.classList.remove("open")}),window.addEventListener("click",e=>{e.target.classList.contains("modal")&&c.classList.remove("open")})),document.querySelectorAll("input[type='radio'][name='raise']")),s=document.querySelector(".form__input--raise"),d=(i&&s&&i.forEach(e=>{e.addEventListener("click",()=>{"yes"===e.id&&e.checked?s.classList.remove("hide"):s.classList.add("hide")})}),document.querySelector(".btn--send"));d&&d.addEventListener("click",e=>{d.classList.add("animation"),setTimeout(()=>{d.classList.remove("animation")},1500)});var r=document.querySelector("#goUp");r&&1280<=window.innerWidth&&r.addEventListener("click",()=>{window.scrollTo(0,0)});const l=document.querySelectorAll(".portfolio__tab");l.length&&l.forEach(e=>{e.addEventListener("click",()=>{l.forEach(e=>e.classList.remove("active")),e.classList.add("active")})})})}();