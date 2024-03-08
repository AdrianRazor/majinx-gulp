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
    let page = fullpage.offsetHeight;
    let vh = window.innerHeight;

    let offsets = [];
    let activeSection = 0;
    let translateY = 0;
    let speed = 0.6;
    let isScroll = false;

    // Create array with section offsets
    sections.forEach((section) => {
      const y = section.offsetTop;
      const height = section.offsetHeight;
      const offsetY = (vh - height) / 2;

      const result = y === 0 ? 0 : offsetY < 150 ? y - 150 : y - offsetY;

      offsets.push({
        offset: result,
        isOverflow: offsetY < 150,
      });
    });

    function handleScroll(e) {
      if (!isScroll) {
        isScroll = true;

        // Scroll
        offsets[activeSection].isOverflow
          ? e.deltaY > 0
            ? scrollDown()
            : scrollUp()
          : scrollScreen(e);

        // When scrolled down
        if (translateY > page - vh) translateY = page - vh;

        // Set styles
        fullpage.style.transition = `${speed}s ease`;
        fullpage.style.transform = `translateY(-${translateY}px)`;

        // Header minimal
        activeSection
          ? header.classList.add("min")
          : header.classList.remove("min");

        // Enable scroll after X miliseconds
        setTimeout(() => {
          isScroll = false;
        }, speed * 500);
      }
    }

    function scrollScreen(e) {
      if (e.deltaY > 0) {
        if (activeSection < offsets.length - 1) activeSection++;
      } else {
        if (activeSection > 0) activeSection--;
      }

      translateY = offsets[activeSection].offset;
    }

    function scrollUp() {
      if (offsets[activeSection].offset >= translateY) {
        if (activeSection > 0) activeSection--;
        translateY = offsets[activeSection].offset;
      } else {
        translateY = translateY <= 0 ? 0 : translateY - 200;
      }
    }

    function scrollDown() {
      const next = sections[activeSection + 1];

      if (next && translateY + vh > next.offsetTop) {
        console.log("section down");
        if (activeSection < offsets.length - 1) activeSection++;
        translateY = offsets[activeSection].offset;
      } else {
        console.log("scroll down");
        translateY = translateY >= page - vh ? page - vh : translateY + 200;
      }
    }

    // Footer button "go up"
    const goUpBtn = document.querySelector("#goUp");

    if (goUpBtn && window.innerWidth >= 1280) {
      goUpBtn.addEventListener("click", () => {
        activeSection = 0;
        translateY = 0;

        fullpage.style.transform = "translateY(0)";
        header.classList.remove("min");
      });
    }

    // Mouse scroll on desktop
    window.innerWidth >= 1280
      ? document.addEventListener("wheel", handleScroll)
      : document.removeEventListener("wheel", handleScroll);

    let resizeTimeout;

    // Resize
    function handleResize() {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        window.scrollTo(0, 0);
        activeSection = 0;
        translateY = 0;
      }, 300);
    }

    window.addEventListener("resize", handleResize);
  }
});
