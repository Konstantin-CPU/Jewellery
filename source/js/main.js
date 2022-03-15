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
  const loginHeaderToggle = document.querySelectorAll(".page-header__login-link");
  const loginToggle = document.querySelector(".login__toggle--popup");

  loginHeaderToggle.forEach((toggle) => {
    toggle.removeAttribute("href");
  })

  if (popupLogin) {
    loginHeaderToggle.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        popupLogin.classList.remove("visually-hidden");
        bodyOverlay.classList.remove("visually-hidden");
        document.querySelector(".page__body").classList.add("page__body--scroll-disabled");
        document.querySelector(".login__email").focus();
        pageHeader.classList.remove("page-header--menu-opened")
      })
    })

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        popupLogin.classList.add("visually-hidden");
        bodyOverlay.classList.add("visually-hidden");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
      }
    })

    document.querySelector(".page__body-overlay").addEventListener("click", function() {
        popupLogin.classList.add("visually-hidden");
        bodyOverlay.classList.add("visually-hidden");
        document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
    })

    loginToggle.addEventListener("click", () =>{
      popupLogin.classList.add("visually-hidden");
      bodyOverlay.classList.add("visually-hidden");
      document.querySelector(".page__body").classList.remove("page__body--scroll-disabled");
    })
  }


  document.querySelectorAll(".login__form").forEach((form) => {
    form.addEventListener("submit", () => {
      document.querySelectorAll(".login__email").forEach((email) => {
        if (email.value != "") {
          console.log(1);
          console.log(email.value);
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
