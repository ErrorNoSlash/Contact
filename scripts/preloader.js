/*controls the preloader*/
const preloader = document.querySelector("#preloader");
const preloaderFill = document.querySelector("#preloader-fill");
const preloaderCount = document.querySelector("#preloader-count");
const htmlClasses = document.documentElement.classList;
const preloaderSeenKey = "preloaderSeen";

const minimumTime = 900;
const maximumTime = 3000;
const fadeTime = 450;
const startTime = performance.now();

let isPageLoaded = document.readyState === "complete";

window.addEventListener("load", function () {
    isPageLoaded = true;
})

function hidePreloader() {
    // remember that this browser has seen it, so the next visit skips straight to the page
    try {
        localStorage.setItem(preloaderSeenKey, "true");
    } catch (error) { }

    preloader.classList.add("is-done");
    setTimeout(function () {
        preloader.remove();
    }, fadeTime);
}

function updateProgress() {
    const elapsed = performance.now() - startTime;
    const timeProgress = Math.min(elapsed / minimumTime, 1);

    // wait at 90% until the page is loaded, but never longer than maximumTime
    const canFinish = isPageLoaded || elapsed >= maximumTime;
    const progress = canFinish ? timeProgress : Math.min(timeProgress, 0.9);
    const percent = Math.round(progress * 100);

    preloaderFill.style.width = `${percent}%`;
    preloaderCount.textContent = percent;

    if (percent < 100) requestAnimationFrame(updateProgress);
    else hidePreloader();
}

/* skip the preloader when arriving from the other page or on a return visit, otherwise start counting */
if (htmlClasses.contains("is-arriving") || htmlClasses.contains("is-returning")) {
    preloader.remove();
} else {
    requestAnimationFrame(updateProgress);
}
