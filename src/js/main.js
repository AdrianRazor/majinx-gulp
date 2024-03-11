import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;

  // ----- ANIMATIONS
  gsap.registerPlugin(ScrollTrigger);

  // let isScrollLocked = false;

  // // Debounce function to limit the frequency of scroll events
  // function debounce(func, delay) {
  //   let timeout;
  //   return function () {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       func.apply(this, arguments);
  //     }, delay);
  //   };
  // }

  // // Function to be executed on scroll
  // function handleScroll(e) {
  //   if (isScrollLocked) return;

  //   // Lock the scroll
  //   isScrollLocked = true;

  //   // Your scroll-related code goes here
  //   console.log("e", e);

  //   // Set a timeout to unlock the scroll after 500 milliseconds (adjust as needed)
  //   setTimeout(() => {
  //     isScrollLocked = false;
  //   }, 500);
  // }

  // window.addEventListener("scroll", debounce(handleScroll, 100)); // Adjust the debounce delay as needed

  // const main = document.querySelector(".main");
  // const fullpage = document.querySelector(".main__fullpage");
  // const sections = document.querySelectorAll(".section");

  // const local = window.localStorage.getItem("activeSection");

  // let offsets = [];
  // let activeSection = local || 0;
  // let translateY = 0;
  // let speed = 0.6;
  // let isScrollLocked = false;

  // function debounce(func, delay) {
  //   let timeout;

  //   return function () {
  //     console.log("test");
  //     clearTimeout(timeout);
  //     console.log("func", func);
  //     timeout = setTimeout(() => {
  //       func.apply(this, arguments);
  //     }, delay);
  //     console.log("a timeout", timeout);
  //   };
  // }

  // if (fullpage && sections.length) {
  //   const talent = document.querySelector(".talent");

  //   let page = fullpage.offsetHeight;
  //   let vh = window.innerHeight;

  //   document.body.style.overflow =
  //     window.innerWidth >= 1280 ? "hidden" : "initial";

  //   // Create array with section offsets
  //   sections.forEach((section) => {
  //     const y = section.offsetTop;
  //     const height = section.offsetHeight;
  //     const offsetY = (vh - height) / 2;

  //     const result = y === 0 ? 0 : offsetY < 150 ? y - 150 : y - offsetY;

  //     offsets.push({
  //       offset: result,
  //       isOverflow: offsetY < 150,
  //     });
  //   });

  //   if (local) {
  //     translateY = offsets[activeSection].offset;
  //     fullpage.style.transform = `translateY(-${translateY}px)`;

  //     window.localStorage.clear();
  //   }

  //   function handleScroll(e) {
  //     console.log("handleScroll");
  //     if (isScrollLocked) return;

  //     isScrollLocked = true;

  //     // Scroll
  //     offsets[activeSection].isOverflow
  //       ? e.deltaY > 0
  //         ? scrollDown()
  //         : scrollUp()
  //       : scrollScreen(e);

  //     // When scrolled down
  //     if (translateY > page - vh) translateY = page - vh;

  //     activeSection > 0 && activeSection < sections.length - 1
  //       ? main.classList.add("gradient")
  //       : main.classList.remove("gradient");

  //     activeSection === 3 && talent
  //       ? talent.classList.add("animation")
  //       : talent.classList.remove("animation");

  //     // Set styles
  //     fullpage.style.transition = `${speed}s ease`;
  //     fullpage.style.transform = `translateY(-${translateY}px)`;

  //     // Header minimal
  //     activeSection
  //       ? header.classList.add("min")
  //       : header.classList.remove("min");

  //     // Enable scroll after X miliseconds
  //     setTimeout(() => {
  //       console.log("setTimeout");
  //       isScrollLocked = false;
  //     }, 500);
  //   }

  //   function scrollScreen(e) {
  //     if (e.deltaY > 0) {
  //       if (activeSection < offsets.length - 1) activeSection++;
  //     } else {
  //       if (activeSection > 0) activeSection--;
  //     }

  //     translateY = offsets[activeSection].offset;
  //   }

  //   function scrollUp() {
  //     if (offsets[activeSection].offset >= translateY) {
  //       if (activeSection > 0) activeSection--;
  //       translateY = offsets[activeSection].offset;
  //     } else {
  //       translateY = translateY <= 0 ? 0 : translateY - 200;
  //     }
  //   }

  //   function scrollDown() {
  //     const next = sections[activeSection + 1];

  //     if (next && translateY + vh > next.offsetTop) {
  //       if (activeSection < offsets.length - 1) activeSection++;
  //       translateY = offsets[activeSection].offset;
  //     } else {
  //       translateY = translateY >= page - vh ? page - vh : translateY + 200;
  //     }
  //   }

  //   // Footer button "go up"
  //   const goUpBtn = document.querySelector("#goUp");

  //   if (goUpBtn && window.innerWidth >= 1280) {
  //     goUpBtn.addEventListener("click", () => {
  //       activeSection = 0;
  //       translateY = 0;

  //       fullpage.style.transform = "translateY(0)";
  //       header.classList.remove("min");
  //     });
  //   }

  //   // Mouse scroll on desktop
  //   window.innerWidth >= 1280
  //     ? window.addEventListener("wheel", debounce(handleScroll, 300)())
  //     : window.removeEventListener("wheel", debounce(handleScroll, 300)());
  // }

  // ----- LOGIC
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

  // Apply link
  const applyLink = document.querySelector("#applyLink");

  if (applyLink && window.innerWidth >= 1280) {
    applyLink.addEventListener("click", (e) => {
      e.preventDefault();

      if (window.location.pathname !== "/") {
        window.localStorage.setItem("activeSection", 5);
        window.location.href = "/";
      } else {
        activeSection = 5;
        translateY = offsets[activeSection].offset;

        fullpage.style.transform = `translateY(-${translateY}px)`;
      }
    });
  }

  // Video
  // const videos = document.querySelectorAll(".video");

  // if (videos) videos.forEach((el) => el.play());

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
});
