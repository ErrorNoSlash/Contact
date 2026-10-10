/*big title: every letter gets its own <span> so the CSS can spread them across the row*/
document.querySelectorAll(".title .echo, .title h1").forEach(function (element) {
    const text = element.textContent.trim();

    if (element.matches("h1")) element.setAttribute("aria-label", text);

    element.replaceChildren(...[...text].map(function (letter) {
        const span = document.createElement("span");
        span.textContent = letter;
        return span;
    }));
})
