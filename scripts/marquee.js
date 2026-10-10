/*marquee: repeat the phrase until it is twice as wide as the row, so the loop never shows a gap*/
const marqueeRow = document.querySelector(".marquee");
const marqueeTrack = marqueeRow.querySelector("span");
const marqueePhrase = marqueeTrack.textContent;

function fillMarquee() {
    marqueeTrack.textContent = marqueePhrase;

    const phraseWidth = marqueeTrack.getBoundingClientRect().width;
    const copies = Math.max(2, Math.ceil((marqueeRow.clientWidth * 2) / phraseWidth));

    // an even number of copies keeps the -50% loop seamless
    marqueeTrack.textContent = marqueePhrase.repeat(copies + (copies % 2));
}

fillMarquee();
document.fonts.ready.then(fillMarquee);
window.addEventListener("resize", fillMarquee);
