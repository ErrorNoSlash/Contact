/*runs in <head> before the page is drawn, so it is a plain script and not deferred: a visit over plain
  http is sent to https, and the page learns whether it came through the curtain or has seen the
  preloader before, so the preloader never flashes*/

// the site only works over https; github pages does this too, this catches it if that is ever off
if (location.protocol === "http:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    location.replace("https://" + location.host + location.pathname + location.search + location.hash);
}

try {
    if (sessionStorage.getItem("pageTransition")) document.documentElement.classList.add("is-arriving");
} catch (error) { }
try {
    if (localStorage.getItem("preloaderSeen")) document.documentElement.classList.add("is-returning");
} catch (error) { }
