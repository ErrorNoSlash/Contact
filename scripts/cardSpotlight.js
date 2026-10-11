/*controles the spotlight on the profile card*/
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
    })
}
