(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addTouchClass() {
        if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) ; else document.documentElement.classList.add("no-touch");
    }
    const lazyload = () => {
        window.addEventListener("load", (() => {
            const lazyObjs = document.querySelectorAll("[data-src], [data-srcset], [data-poster]");
            const updateLazyObject = arr => {
                arr.forEach((el => {
                    if (el.dataset.src) el.src = el.dataset.src;
                    if (el.dataset.srcset) el.srcset = el.dataset.srcset;
                    if (el.dataset.poster) el.poster = el.dataset.poster;
                }));
            };
            if (lazyObjs) updateLazyObject(lazyObjs);
        }));
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    const getData = async function(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка по адресу "${url}", статус ошибки ${response.status}!`);
        return await response.json();
    };
    const getColorCategory = category => {
        category = category.toLowerCase();
        switch (category) {
          case "for work":
            return "purple";

          case "for health":
            return "green";

          case "for harmony":
            return "pink";
        }
    };
    const initSlider = () => {
        const slider = document.querySelector(".slider-slider");
        if (!slider) return;
        const sliderWrapper = slider.querySelector(".slider-slider__wrapper");
        const sliderList = sliderWrapper.querySelector(".slider-slider__swiper");
        const btnPrev = slider.querySelector(".slider-slider__nav-button_prev");
        const btnNext = slider.querySelector(".slider-slider__nav-button_next");
        const SLIDER_WIDTH = 1990;
        let currentSlide = 0;
        let countClick = 3;
        let offset = 0;
        const changeSlide = (navButton = "") => {
            switch (navButton) {
              case "prev":
                currentSlide--;
                break;

              case "next":
                currentSlide++;
            }
            btnPrev.disabled = currentSlide === 0;
            btnNext.disabled = currentSlide === countClick;
            sliderList.style.transition = "transform 1s ease";
            sliderList.style.transform = `translateX(${-offset * currentSlide}px)`;
        };
        const reset = () => {
            if (window.innerWidth < 768) countClick = 6; else countClick = 3;
            offset = (SLIDER_WIDTH + parseFloat(getComputedStyle(sliderList).left) * 2 - window.innerWidth) / countClick;
            currentSlide = 0;
            btnPrev.disabled = currentSlide === 0;
            btnNext.disabled = currentSlide === countClick;
            sliderList.style.transition = "transform 0s ease";
            sliderList.style.transform = `translateX(0px)`;
        };
        btnPrev.addEventListener("click", (() => changeSlide("prev")));
        btnNext.addEventListener("click", (() => changeSlide("next")));
        window.addEventListener("resize", reset);
        reset();
    };
    initSlider();
    const initTimer = () => {
        const timer = document.querySelector(".cta__table");
        if (!timer) return;
        const daysCell = timer.querySelector("td#days");
        const hoursCell = timer.querySelector("td#hours");
        const minutesCell = timer.querySelector("td#minutes");
        const secondsCell = timer.querySelector("td#seconds");
        const currentYear = (new Date).getFullYear() + 1;
        document.querySelector(".slider__title span").textContent = currentYear;
        const newYear = new Date(`jan,01,${currentYear},00:00:00`);
        let interval;
        const updateClock = () => {
            const date = (new Date).getTime();
            const timeRemaining = (newYear - date) / 1e3;
            const days = parseInt(timeRemaining / (24 * 60 * 60));
            const restSecondsWithoutDays = timeRemaining - days * 24 * 60 * 60;
            const hours = parseInt(restSecondsWithoutDays / 60 / 60);
            const minutes = parseInt(restSecondsWithoutDays / 60 % 60);
            const seconds = parseInt(restSecondsWithoutDays % 60);
            daysCell.textContent = days;
            hoursCell.textContent = hours;
            minutesCell.textContent = minutes;
            secondsCell.textContent = seconds;
            if (timeRemaining <= 0) {
                clearInterval(interval);
                daysCell.textContent = 0;
                hoursCell.textContent = 0;
                minutesCell.textContent = 0;
                secondsCell.textContent = 0;
            }
        };
        updateClock();
        interval = setInterval(updateClock, 500);
    };
    initTimer();
    const getCard = (element, data) => {
        element.innerHTML = `\n        <article class="card" data-name="${data.name}">\n          <a class="card__link" href="#">\n            <div class="card__image-ibg">\n              <picture>\n                <source srcset="img/${data.category.replaceAll(" ", "-").toLowerCase()}.webp" type="image/webp">\n                <img src="img/${data.category.replaceAll(" ", "-").toLowerCase()}.png" alt="Gift image">\n              </picture>\n            </div>\n            <div class="card__content">\n              <p class="card__category" data-tag-color="${getColorCategory(data.category)}">${data.category}</p>\n              <h3 class="card__title">${data.name}</h3>\n            </div>\n          </a>\n        </article>\n    `;
        return element;
    };
    const initBest = () => {
        const best = document.querySelector(".best__list");
        if (!best) return;
        const getItem = item => {
            const li = document.createElement("li");
            li.classList.add("best__item");
            return getCard(li, item);
        };
        const render = () => {
            getData(`./files/gifts.json`).then((gifts => {
                const list = [];
                const arr = gifts.sort((() => Math.random() - .5)).slice(-4);
                for (const index in arr) list.push(getItem(arr[index]));
                best.innerHTML = "";
                best.append(...list);
            }));
        };
        render();
    };
    initBest();
    const initGifts = () => {
        const giftsTabs = document.querySelector(".gifts-tabs");
        if (!giftsTabs) return;
        const content = giftsTabs.querySelector(".gifts-tabs__content");
        const radios = giftsTabs.querySelectorAll('.gifts-tabs__header input[type="radio"]');
        let gifts = [];
        const getItem = item => {
            const li = document.createElement("li");
            li.classList.add("gifts-tabs__content-item");
            return getCard(li, item);
        };
        const render = (filter = "all") => {
            let filtered = [];
            const list = [];
            filter = filter.toLowerCase();
            filtered = filter == "all" ? gifts : gifts.filter((item => item.category.toLowerCase() == filter));
            for (const index in filtered) list.push(getItem(filtered[index]));
            content.innerHTML = "";
            content.append(...list);
        };
        const load = () => {
            getData(`./files/gifts.json`).then((data => {
                gifts = data.sort((() => Math.random() - .5));
                render();
                for (let radio of radios) radio.addEventListener("change", (e => {
                    render(e.target.value);
                }));
            }));
        };
        load();
    };
    initGifts();
    const modal = document.querySelector(".modal");
    const renderModal = (name, imageUrls) => {
        getData(`./files/gifts.json`).then((gifts => {
            const gift = gifts.filter((item => item.name === name))[0];
            if (gift) {
                modal.querySelector(".modal__title").textContent = gift.name;
                modal.querySelector(".modal__description").textContent = gift.description;
                modal.querySelector(".modal__category").textContent = gift.category;
                modal.querySelector(".modal__category").dataset.tagColor = getColorCategory(gift.category);
                for (const [name, value] of Object.entries(gift.superpowers)) {
                    modal.querySelector(`.superpower_${name} span`).textContent = parseInt(value);
                    modal.querySelector(`.superpower_${name} span`).dataset.superpowerValue = parseInt(value);
                }
                modal.querySelector(".modal__image-ibg img").src = imageUrls.src;
                modal.querySelector(".modal__image-ibg img").alt = gifts.name;
                modal.querySelectorAll(".modal__image-ibg source").forEach((source => {
                    source.srcset = imageUrls.srcset;
                }));
                modal.classList.remove("hidden");
            }
        }));
    };
    const closeModal = e => {
        if (modal.classList.contains("hidden")) return;
        if (!e.target.closest(".modal__wrapper") || e.target.closest(".modal__btn")) {
            modal.classList.add("hidden");
            bodyUnlock();
        }
    };
    const openModal = e => {
        const card = e.target.closest(".card");
        if (!card || !modal) return;
        e.preventDefault();
        const name = card.closest("article[data-name]").dataset.name;
        const imageUrls = {
            srcset: card.querySelector(".card__image-ibg source") ? card.querySelector(".card__image-ibg source").srcset : "",
            src: card.querySelector(".card__image-ibg img").src
        };
        renderModal(name, imageUrls);
        bodyLock();
    };
    document.addEventListener("click", closeModal);
    document.addEventListener("click", openModal);
    const initScroll = () => {
        const button = document.querySelector(".button-to-top");
        if (!button) return;
        const render = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 300 && window.innerWidth <= 768 ? button.classList.remove("hidden") : button.classList.add("hidden");
        };
        const scrollTo = e => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
        button.addEventListener("click", scrollTo);
        window.addEventListener("scroll", render);
        window.addEventListener("resize", render);
        render();
    };
    initScroll();
    const links = document.querySelectorAll(".menu__link");
    links.forEach((link => link.addEventListener("click", (e => {
        console.log(e.target);
        if (e.target.closest(".html-gifts") && e.target.closest(".menu__link_gifts")) e.preventDefault();
        menuClose();
    }))));
    const closeMenuOverlay = ({target = e.target}) => {
        if (document.documentElement.classList.contains("menu-open") && !target.closest(".menu__list")) menuClose();
    };
    document.addEventListener("click", closeMenuOverlay);
    isWebp();
    addTouchClass();
    lazyload();
    menuInit();
})();