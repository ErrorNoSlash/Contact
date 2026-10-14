/*controles custom cursor*/
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    document.body.classList.add("cursor-visible");

    cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

    cursorOutline.animate({
        transform: `translate(${posX}px, ${posY}px)`
    }, { duration: 500, fill: "forwards" })
})
