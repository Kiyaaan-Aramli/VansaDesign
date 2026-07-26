const slides = document.querySelectorAll(".slides img");

let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");

    current++;

    if (current >= slides.length) {
        current = 0;
    }

    slides[current].classList.add("active");
}, 4000);


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0
});

document.querySelectorAll(
    ".card, .title-one, .p-one p, .p-one img, .hero2-text, .hero2-image img"
).forEach(el => observer.observe(el));



const sections = [
    document.querySelector(".carousel"),
    document.querySelector(".hero1"),
    document.querySelector(".hero2"),
    document.querySelector(".features"),
    document.querySelector("footer")
];

let isScrolling = false;

window.addEventListener("wheel", (e) => {
    if (isScrolling) {
        e.preventDefault();
        return;
    }

    let currentSection = 0;

    const scrollY = window.scrollY + window.innerHeight / 2;

    for (let i = 0; i < sections.length; i++) {
        if (scrollY >= sections[i].offsetTop) {
            currentSection = i;
        }
    }

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
    } else {
        return;
    }

    isScrolling = true;

    sections[currentSection].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);

    e.preventDefault();

}, { passive: false });
