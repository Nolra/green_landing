// BURGER TOGGLE
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// FAQ-BOX ACCORDION
const faqHeads = document.querySelectorAll(".faq-head");
const faqBoxHeight = document.querySelector(".faq-box").offsetHeight;
faqHeads.forEach(head => {
    head.addEventListener("click", () => {
        const faqBox = head.closest(".faq-box");
        faqBox.classList.toggle("active")
        if (faqBox.classList.contains("active")) {
            const bodyHeight = faqBox.querySelector(".faq-body").offsetHeight;
            faqBox.style.height = faqBoxHeight + bodyHeight + "px";
        } else {
            faqBox.style.height = faqBoxHeight + "px";
        }
    })
});

// SLIDER
let activeSlide = 0;
// slider elements
const wrapper = document.querySelector(".wrapper");
const arrowPrev = document.querySelector(".arrow-prev");
const arrowNext = document.querySelector(".arrow-next");
const radioBtns = document.querySelectorAll(".pagination input");
const slides = document.querySelector(".slides");
// slider init
let stepWidth;
function init() {
    const slideWidth = document.querySelector(".slide").offsetWidth;
    const slidesNumber = radioBtns.length;
    const slidesGap = Number(getComputedStyle(slides).columnGap.replace('px', ''));
    wrapper.style.width = slideWidth * slidesNumber + slidesGap * (slidesNumber - 1) + 'px';
    stepWidth = slides.offsetWidth / slidesNumber;
    activeSlide = 0;
    moveSlider();
    radioSync();
}
init();
window.addEventListener('resize', () => init());
// slider actions
arrowNext.addEventListener("click", () => {
    if (activeSlide < 2) {
        activeSlide++;
        radioSync()
        moveSlider()
    } 
})
arrowPrev.addEventListener("click", () => {
    if (activeSlide > 0) {
        activeSlide--;
        radioSync()
        moveSlider()
    } 
})
radioBtns.forEach((btn) => {
    btn.addEventListener("change", (e) => {
        activeSlide = e.target.dataset.slide
        moveSlider()
    })
})         
function radioSync() {
    for (let i = 0; i < radioBtns.length; i++) {
        if (i === activeSlide) {
            radioBtns[activeSlide].checked = true;
        } else {
            radioBtns[activeSlide].removeAttribute("checked");
        }
    }
}
function moveSlider() {
    wrapper.style.left = "-" + activeSlide * stepWidth + "px";
}
