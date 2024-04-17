import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;

  // ----- ANIMATIONS
  gsap.registerPlugin(ScrollTrigger);

  // Talent section
  const talent = document.querySelector(".talent");

  if (talent) {
    const title = talent.querySelectorAll("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: talent,
        start: "top 60%",
        end: "bottom top",
      },
    });

    tl.from(title, {
      duration: 1.2,
      opacity: 0,
      stagger: 0.3,
      ease: "power2.out",
    });
  }

  // Sections scroll
  // const main = document.querySelector(".main");
  // const fullpage = document.querySelector(".main__fullpage");
  // const sections = document.querySelectorAll(".section");

  // const local = window.localStorage.getItem("activeSection");

  // let offsets = [];
  // let activeSection = local || 0;
  // let translateY = 0;
  // let speed = 0.3;
  // let isScrollLocked = false;

  // if (fullpage && sections.length) {

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

  //     // Set styles
  //     fullpage.style.transition = `${speed}s ease`;
  //     fullpage.style.transform = `translateY(-${translateY}px)`;

  //     // Header minimal
  //     activeSection
  //       ? header.classList.add("min")
  //       : header.classList.remove("min");

  //     setTimeout(() => {
  //       isScrollLocked = false;
  //     }, speed * 1000);
  //   }

  //   function scrollScreen(e) {
  //     if (e.deltaY > 0) {
  //       if (activeSection < offsets.length - 1) activeSection++;
  //       speed = 1.2;
  //     } else {
  //       if (activeSection > 0) activeSection--;
  //       speed = 1.2;
  //     }

  //     translateY = offsets[activeSection].offset;
  //   }

  //   function scrollUp() {
  //     if (offsets[activeSection].offset >= translateY) {
  //       if (activeSection > 0) activeSection--;
  //       translateY = offsets[activeSection].offset;
  //       speed = 1.2;
  //     } else {
  //       translateY = translateY <= 0 ? 0 : translateY - 200;
  //       speed = 0.3;
  //     }
  //   }

  //   function scrollDown() {
  //     const next = sections[activeSection + 1];

  //     if (next && translateY + vh > next.offsetTop) {
  //       if (activeSection < offsets.length - 1) activeSection++;
  //       translateY = offsets[activeSection].offset;
  //       speed = 1.2;
  //     } else {
  //       translateY = translateY >= page - vh ? page - vh : translateY + 200;
  //       speed = 0.3;
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
  //     ? window.addEventListener("wheel", handleScroll)
  //     : window.removeEventListener("wheel", handleScroll);
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

    const nav = header.querySelectorAll(".nav__item");

    if (nav) {
      nav.forEach((el) => {
        el.addEventListener("click", () => {
          header.classList.remove("open");
          burger.classList.remove("open");
          root.classList.remove("lock");
        });
      });
    }
  }

  function setHeaderMin() {
    header && window.scrollY > 90 && window.innerWidth >= 1280
      ? header.classList.add("min")
      : header.classList.remove("min");
  }

  window.addEventListener("scroll", setHeaderMin);

  // Apply link
  // const applyLink = document.querySelector("#applyLink");

  // if (applyLink && window.innerWidth >= 1280) {
  //   applyLink.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     if (window.location.pathname !== "/") {
  //       window.localStorage.setItem("activeSection", 5);
  //       window.location.href = "/";
  //     } else {
  //       activeSection = 5;
  //       translateY = offsets[activeSection].offset;

  //       fullpage.style.transform = `translateY(-${translateY}px)`;
  //     }
  //   });
  // }

  // Video
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    let firstTouch = true;

    document.addEventListener("touchstart", () => {
      const videos = document.querySelectorAll("video");

      if (firstTouch && videos.length) videos.forEach((el) => el.play());
      firstTouch = false;
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

  // Textarea
  const textarea = document.querySelector("textarea");
  const amountSymbols = document.querySelector("#amountSymbols");

  if (textarea && amountSymbols) {
    textarea.addEventListener("input", () => {
      amountSymbols.textContent = textarea.value.length;
    });
  }

  // Form button
  const form = document.querySelector(".form");
  const formBtn = document.querySelector(".btn--send");

  if (form && formBtn) {
    formBtn.addEventListener("click", (e) => {
      form.style.height = `${form.clientHeight}px`;
      formBtn.classList.add("animation");

      setTimeout(() => {
        formBtn.classList.remove("animation");
        showThanks();
      }, 1500);
    });

    function showThanks() {
      const thanks = document.querySelector(".thanks");

      if (thanks) {
        const offsetY = window.scrollY + form.getBoundingClientRect().y - 100;
        window.scrollTo(0, offsetY);

        form.classList.add("hide");
        form.style.height = `${thanks.clientHeight}px`;
        thanks.classList.add("show");
      }
    }
  }

  // Footer button "go up"
  const goUpBtn = document.querySelector("#goUp");

  if (goUpBtn && window.innerWidth >= 1280) {
    goUpBtn.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }

  // Tabs
  const tab = document.querySelectorAll(".tabs__tab");

  if (tab.length) {
    tab.forEach((el) => {
      el.addEventListener("click", () => {
        tab.forEach((e) => e.classList.remove("active"));
        el.classList.add("active");
      });
    });
  }

  // Filter
  const filter = document.querySelector(".filter");

  if (filter) {
    const head = filter.querySelector(".filter__head");
    const li = filter.querySelectorAll("li");

    head.addEventListener("click", () => {
      filter.classList.toggle("open");
    });

    li.forEach((el) => {
      el.addEventListener("click", () => {
        filter.classList.remove("open");
      });
    });

    window.addEventListener("click", (e) => {
      if (!e.target.closest(".filter")) {
        filter.classList.remove("open");
      }
    });
  }

  // Article anchor links
  const anchors = document.querySelectorAll(".article__aside li");

  if (anchors) {
    anchors.forEach((li) => {
      const a = li.querySelector("a");

      a.addEventListener("click", () => {
        anchors.forEach((el) => el.classList.remove("active"));

        li.classList.add("active");
      });
    });
  }

  // Article slider
  if (document.querySelector("#splideRelated")) {
    var splideRelated = new Splide("#splideRelated", {
      perPage: 1,
      perMove: 1,
      gap: 20,
      pagination: false,

      mediaQuery: "min",
      breakpoints: {
        1024: {
          destroy: true,
        },
      },
    });

    const sliderLength = document.querySelectorAll(
      "#splideRelated .splide__slide"
    ).length;

    // Set total slides
    splideRelated.on("mounted", function () {
      const amount = document.querySelector("#splideRelated .amount");
      amount.textContent = sliderLength;
    });

    // Change number of active slide
    splideRelated.on("move", function (newIndex) {
      const current = document.querySelector("#splideRelated .current");
      current.textContent = newIndex + 1;
    });

    splideRelated.mount();
  }
});
