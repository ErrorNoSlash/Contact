/*controles the spotlight and tilt on the profile card*/
const tiltAmount = 8;

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;

        const card = e.target.closest(".profile-card");
        if (!card) return;

        const cardBox = card.getBoundingClientRect();
        const x = (e.clientX - cardBox.left) / cardBox.width;
        const y = (e.clientY - cardBox.top) / cardBox.height;

        card.style.setProperty("--x", `${x * 100}%`);
        card.style.setProperty("--y", `${y * 100}%`);
        card.style.setProperty("--tilt-x", `${(0.5 - y) * tiltAmount}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * tiltAmount}deg`);
    })
}
