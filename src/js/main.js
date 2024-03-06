document.addEventListener("DOMContentLoaded", function (event) {
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

  console.log("DOM fully loaded and parsed");
});
