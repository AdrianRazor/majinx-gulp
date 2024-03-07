import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;

  // Header
  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");

  if (header && burger) {
    burger.addEventListener("click", () => {
      header.classList.toggle("open");
      burger.classList.toggle("open");
      root.classList.toggle("lock");
    });
  }

  // Modal contact
  const contactBtn = document.querySelectorAll(".openModal");
  const modal = document.querySelector(".modal");

  if (contactBtn.length && modal) {
    contactBtn.forEach((el) => {
      el.addEventListener("click", () => {
        modal.classList.add("open");
      });
    });

    const closeBtn = modal.querySelector(".modal__close");

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        modal.classList.remove("open");
      }
    });
  }

  // Form
  const raiseRadio = document.querySelectorAll(
    "input[type='radio'][name='raise']"
  );
  const raiseInput = document.querySelector(".form__input--raise");

  if (raiseRadio && raiseInput) {
    raiseRadio.forEach((el) => {
      el.addEventListener("click", () => {
        el.id === "yes" && el.checked
          ? raiseInput.classList.remove("hide")
          : raiseInput.classList.add("hide");
      });
    });
  }

  // Form button
  const formBtn = document.querySelector(".btn--send");

  if (formBtn) {
    formBtn.addEventListener("click", (e) => {
      formBtn.classList.add("animation");

      setTimeout(() => {
        formBtn.classList.remove("animation");
      }, 1500);
    });
  }

  // Portfolio tabs
  const tab = document.querySelectorAll(".portfolio__tab");

  if (tab.length) {
    tab.forEach((el) => {
      el.addEventListener("click", () => {
        tab.forEach((e) => e.classList.remove("active"));
        el.classList.add("active");
      });
    });
  }

  // ----- ANIMATIONS
  gsap.registerPlugin(ScrollTrigger);

  const fullpage = document.querySelector(".main__fullpage");
  const sections = document.querySelectorAll(".section");

  if (fullpage && sections.length) {
    let offsets = [];
    let activeSection = 0;
    let translateY = 0;
    let speed = 0.6;
    let isScroll = false;

    sections.forEach((section, i) => {
      // gsap.to(section, {
      //   scrollTrigger: {
      //     trigger: section,
      //     start: "top center",
      //     end: "bottom center",
      //     toggleActions: "play none none reverse",
      //   },
      //   y: "50%",
      //   opacity: 1,
      //   duration: 0.6,
      //   ease: "power2.inOut",
      // });

      const y = section.offsetTop;
      const height = section.offsetHeight;
      const offsetY = (window.innerHeight - height) / 2;

      const result = y === 0 ? 0 : offsetY < 150 ? y - 150 : y - offsetY;

      offsets.push({
        offset: result,
        isOverflow: offsetY < 150,
      });
    });

    console.log("offsets", offsets);

    document.addEventListener("wheel", (e) => {
      if (!isScroll) {
        isScroll = true;

        if (offsets[activeSection].isOverflow) {
          if (e.deltaY > 0) {
            console.log("overflow down");

            if (
              sections[activeSection + 1] &&
              translateY + window.innerHeight >
                sections[activeSection + 1].offsetTop
            ) {
              if (activeSection < offsets.length - 1) activeSection++;
              translateY = offsets[activeSection].offset;
              speed = 0.6;
            } else {
              translateY =
                translateY >= fullpage.offsetHeight - window.innerHeight
                  ? fullpage.offsetHeight - window.innerHeight
                  : translateY + 100;
              speed = 0.001;
            }
          } else {
            console.log("overflow up");

            if (offsets[activeSection].offset >= translateY) {
              if (activeSection > 0) activeSection--;
              translateY = offsets[activeSection].offset;
              speed = 0.6;
            } else {
              translateY = translateY <= 0 ? 0 : translateY - 100;
              speed = 0.001;
            }

            console.log("offset", offsets[activeSection].offset);
            console.log("translateY", translateY);
          }
        } else {
          if (e.deltaY > 0) {
            console.log("not overflow down");

            if (activeSection < offsets.length - 1) activeSection++;
            speed = 0.6;
          } else {
            console.log("not overflow up");

            if (activeSection > 0) activeSection--;
            speed = 0.6;
          }

          translateY = offsets[activeSection].offset;
        }

        fullpage.style.transition = `${speed}s ease`;
        fullpage.style.transform = `translateY(-${translateY}px)`;

        // if (true) {
        //   const style = window.getComputedStyle(fullpage);
        //   const matrix = new WebKitCSSMatrix(style.transform);
        //   const currentOffsaetY = matrix.m42;
        //   let newOffsetY = Math.abs(currentOffsaetY - 100);
        //   if (e.deltaY < 0) {
        //     newOffsetY = Math.abs(currentOffsaetY + 100);
        //   }
        //   fullpage.style.transform = `translateY(-${newOffsetY}px)`;
        // } else {
        // }

        activeSection
          ? header.classList.add("min")
          : header.classList.remove("min");

        setTimeout(() => {
          isScroll = false;
        }, speed * 1000);
      }
    });
  }
});
