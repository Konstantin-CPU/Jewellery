'use strict';

import "./vendor.js"

window.addEventListener("load", function() {
  //slider

  const newOffersBlock = document.querySelector(".new-offers");

  if (newOffersBlock) {
    const slider = new Swiper(".new-offers__slider", {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
      pagination: {
        type: "fraction",
        el: ".swiper-pagination",
        renderFraction: (currentClass, totalClass) => `
        <span class="${currentClass}"></span>
        <span class="swiper-pagination-of"> of </span>
        <span class="${totalClass}"></span>
        `
      },
      breakpoints: {
        768: {
          pagination: {
            type: "bullets",
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
          }
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 30,
          pagination: {
            type: "bullets",
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
          }
        },
      }
    });
  }



  //faq

  const faq = document.querySelector(".faq");

  if (faq) {
    document.querySelectorAll(".faq__question").forEach(question => {
      question.addEventListener("click", () => {
        if (question.classList.contains("faq__question--opened")) {
          question.classList.remove("faq__question--opened")
        } else {
          question.classList.add("faq__question--opened");
        }
      })
    })
  }

  //catalog filter

  const catalogFilter = document.querySelector(".filter");
  const bodyOverlay = document.querySelector(".page__body-overlay");
  const filterContainer = document.querySelector(".catalog__filter-container");

  if (catalogFilter) {
    if (window.innerWidth >= 1024) {
      filterContainer.classList.remove("visually-hidden");
    }

    document.querySelector(".catalog__filter-button").addEventListener("click", () => {
      bodyOverlay.classList.remove("visually-hidden");
      catalogFilter.classList.add("filter--opened");
      filterContainer.classList.remove("visually-hidden");
      document.querySelector(".page__body").classList.add("page__body--scroll-disabled");
    });

    document.querySelector(".filter__toggle").addEventListener("click", () => {
      catalogFilter.classList.remove("filter--opened");
      bodyOverlay.classList.add("visually-hidden");
      filterContainer.classList.add("visually-hidden");
      document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
    })

    document.querySelectorAll(".filter__list-item").forEach(element => {
      element.addEventListener("click", () => {
        if (element.classList.contains("filter__list-item--opened")) {
          element.classList.remove("filter__list-item--opened")
        } else {
          element.classList.add("filter__list-item--opened");
        }
      })
    })

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        catalogFilter.classList.remove("filter--opened");
        bodyOverlay.classList.add("visually-hidden");
        filterContainer.classList.add("visually-hidden");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
      }
    })

    document.querySelector(".page__body-overlay").addEventListener("click", function() {
      catalogFilter.classList.remove("filter--opened");
        bodyOverlay.classList.add("visually-hidden");
        filterContainer.classList.add("visually-hidden");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
    })

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1023) {
        filterContainer.classList.add("visually-hidden");
      }

      if ((window.innerWidth >= 1024)) {
        filterContainer.classList.remove("visually-hidden");
      }
    })
  }

  // login

  const popupLogin = document.querySelector(".login--popup");
  const loginContainer = document.querySelector(".page-header__menu-item--login");
  const loginHeaderLink = document.querySelector(".page-header__login-link");
  const loginToggle = document.querySelector(".login__toggle--popup");
  const menuToggle = document.querySelector(".page-header__login-link--menu");
  const loginHeaderToggle = document.createElement("button");
  loginHeaderToggle.classList.add("page-header__menu-link");
  loginHeaderToggle.classList.add("button");
  loginHeaderToggle.innerHTML = "Login";

  loginContainer.removeChild(loginHeaderLink);
  loginContainer.appendChild(loginHeaderToggle);

  const disableFocus = function() {
    let links = document.querySelectorAll("a");
    let buttons = document.querySelectorAll("button");
    let inputs = document.querySelectorAll("input");
    let swiperPagination = document.querySelectorAll("span");
    let swiperButtonNext = document.querySelector(".swiper-button-next");
    let swiperButtonPrev = document.querySelector(".swiper-button-prev");

    if (swiperPagination) {
      swiperPagination.forEach((span) => {
        span.tabIndex = -1;
      })
    }

    if (swiperButtonNext) {
      swiperButtonNext.tabIndex = -1;
    }

    if (swiperButtonPrev) {
      swiperButtonPrev.tabIndex = -1;
    }

    links.forEach((link) => {
      link.tabIndex = -1;
    })

    buttons.forEach((button) => {
      button.setAttribute("disabled", true);
    })

    inputs.forEach((input) => {
      input.setAttribute("disabled", true);
    })

    loginToggle.removeAttribute("disabled");
    popupLogin.querySelectorAll("input").forEach((input) => {
      input.removeAttribute("disabled");
    })
  }

  const enableFocus = function() {
    let links = document.querySelectorAll("a");
    let buttons = document.querySelectorAll("button");
    let inputs = document.querySelectorAll("input");
    let swiperPagination = document.querySelectorAll("span");
    let swiperButtonNext = document.querySelector(".swiper-button-next");
    let swiperButtonPrev = document.querySelector(".swiper-button-prev");

    if (swiperPagination) {
      swiperPagination.forEach((span) => {
        span.tabIndex = 0;
      })
    }

    if (swiperButtonNext) {
      swiperButtonNext.tabIndex = 0;
    }

    if (swiperButtonPrev) {
      swiperButtonPrev.tabIndex = 0;
    }

    links.forEach((link) => {
      link.tabIndex = 0;
    })

    buttons.forEach((button) => {
      button.removeAttribute("disabled");
    })

    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    })
  }

  if (popupLogin) {
    loginHeaderToggle.addEventListener("click", () => {
      disableFocus();
      popupLogin.classList.add("login--popup-opened");
      bodyOverlay.classList.remove("visually-hidden");
      document.querySelector(".page__body").classList.add("page__body--scroll-disabled");
      document.querySelector(".login__email").focus();
      pageHeader.classList.remove("page-header--menu-opened")
    })

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        popupLogin.classList.remove("login--popup-opened");
        bodyOverlay.classList.add("visually-hidden");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
        enableFocus();
      }
    })

    document.querySelector(".page__body-overlay").addEventListener("click", function() {
      popupLogin.classList.remove("login--popup-opened");
      bodyOverlay.classList.add("visually-hidden");
      document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
      enableFocus();
    })

    loginToggle.addEventListener("click", () =>{
      popupLogin.classList.remove("login--popup-opened");
      bodyOverlay.classList.add("visually-hidden");
      document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
      enableFocus();
    })

    menuToggle.addEventListener("click", () => {
      disableFocus();
      popupLogin.classList.add("login--popup-opened");
      bodyOverlay.classList.remove("visually-hidden");
      document.querySelector(".page__body").classList.add("page__body--scroll-disabled");
      pageHeader.classList.remove("page-header--menu-opened");
      document.querySelector(".login__email").focus();

    })
  }


  document.querySelectorAll(".login__form").forEach((form) => {
    form.addEventListener("submit", () => {
      document.querySelectorAll(".login__email").forEach((email) => {
        if (email.value != "") {
          localStorage.setItem("userEmail", email.value)
        }
      })
    })
  });

  //page-header

  const pageHeader = document.querySelector(".page-header");
  const pageHeaderToggle = document.querySelectorAll(".page-header__burger-button");

  pageHeaderToggle.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (pageHeader.classList.contains("page-header--menu-opened")) {
        pageHeader.classList.remove("page-header--menu-opened");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
      } else {
        pageHeader.classList.add("page-header--menu-opened");
        document.querySelector(".page__body").classList.add("page__body--scroll-disabled");
      }

      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Esc' || evt.key === 'Escape') {
          pageHeader.classList.remove("page-header--menu-opened");
          document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
        }
      })

      document.querySelector(".page__body-overlay").addEventListener("click", function() {
        pageHeader.classList.remove("page-header--menu-opened");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
      })
    })
  })
})
