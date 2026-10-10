/*marquee: repeat the phrase until it is twice as wide as the row, so the loop never shows a gap*/
const marqueeRow = document.querySelector(".marquee");
const marqueeTrack = marqueeRow.querySelector("span");
const marqueePhrase = marqueeTrack.textContent;
const marqueeSpeed = 60;

let lastRowWidth = 0;

function fillMarquee() {
    marqueeTrack.textContent = marqueePhrase;

    const phraseWidth = marqueeTrack.getBoundingClientRect().width;
    const copies = Math.max(2, Math.ceil((marqueeRow.clientWidth * 2) / phraseWidth));

    // an even number of copies keeps the -50% loop seamless
    marqueeTrack.textContent = marqueePhrase.repeat(copies + (copies % 2));

    // same speed in pixels per second on every screen
    const trackWidth = marqueeTrack.getBoundingClientRect().width;
    marqueeTrack.style.animationDuration = `${trackWidth / 2 / marqueeSpeed}s`;
    lastRowWidth = marqueeRow.clientWidth;
}

fillMarquee();
document.fonts.ready.then(fillMarquee);

// phones fire resize while scrolling (the address bar), so only rebuild when the width really changed
window.addEventListener("resize", function () {
    if (marqueeRow.clientWidth !== lastRowWidth) fillMarquee();
})
