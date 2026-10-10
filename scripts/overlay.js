/*who? / links? blur the page and open a panel*/
const veil = document.querySelector("#veil");
const sheet = document.querySelector(".sheet");
const navTabs = [...document.querySelectorAll(".nav-tabs a[href='#who'], .nav-tabs a[href='#links']")];
const panels = [...veil.querySelectorAll(".panel")];
let lastClickedTab = null;

function cloneElements(selector) {
    return [...document.querySelectorAll(selector)].map(function (element) {
        return element.cloneNode(true);
    });
}

function createLinkRow(link, index) {
    const row = document.createElement("a");
    row.className = "link-row";
    row.href = link.url;
    if (!link.url.startsWith("mailto:")) {
        row.target = "_blank";
        row.rel = "noopener";
    }

    row.innerHTML = `<span class="link-number">${String(index + 1).padStart(2, "0")}</span>`
        + `<span><b class="link-name">${link.label}</b><small class="link-url">${link.display}</small></span>`
        + `<span class="link-go">GO &nearr;</span>`;
    return row;
}

const whoPanelBody = veil.querySelector("#panel-who .panel-body");
if (whoPanelBody) whoPanelBody.append(...cloneElements(".profile img, .profile .profile-info"));

veil.querySelector("#panel-links .panel-body").append(...links.map(createLinkRow));

function showPanel(panelName) {
    const isPanelName = panelName === "who" || panelName === "links";

    if (isPanelName) {
        panels.forEach(function (panel) {
            panel.hidden = panel.id !== `panel-${panelName}`;
        });
    }

    veil.classList.toggle("is-open", isPanelName);
    veil.setAttribute("aria-hidden", String(!isPanelName));
    sheet.toggleAttribute("inert", isPanelName);
    navTabs.forEach(function (tab) {
        tab.classList.toggle("is-active", tab.hash === `#${panelName}`);
    });

    if (isPanelName) {
        veil.querySelector(`#panel-${panelName} [data-close]`).focus();
    } else if (lastClickedTab) {
        lastClickedTab.focus();
        lastClickedTab = null;
    }
}

function closePanel() {
    showPanel("");
    history.replaceState(null, "", location.pathname + location.search);
}

navTabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
        e.preventDefault();
        lastClickedTab = tab;
        showPanel(tab.hash.slice(1));
        history.replaceState(null, "", tab.hash);
    });
});

veil.addEventListener("click", function (e) {
    if (e.target === veil || e.target.closest("[data-close]")) closePanel();
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && veil.classList.contains("is-open")) closePanel();
});

window.addEventListener("hashchange", function () {
    showPanel(location.hash.slice(1));
});

showPanel(location.hash.slice(1));
