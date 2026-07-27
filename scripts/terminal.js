/* errornoslashOS · interactive terminal */

const BANNER = [
  "    ____  _               _____ __            ",
  "   / __ \\(_)___ ______   / ___// /_____ ______",
  "  / / / / / __ `/ ___/   \\__ \\/ __/ __ `/ ___/",
  " / /_/ / / /_/ (__  )   ___/ / /_/ /_/ (__  ) ",
  "/_____/_/\\__,_/____/   /____/\\__/\\__,_/____/  ",
  "                                              "
].join('\n');

const DS = [
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d",
  "\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u2588\u2588\u2551  \u2588\u2588\u2551\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
  "\u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d",
  "                "
].join('\n');

const LINKS = {
    website:  ["https://hello.errornoslash.be/", "hello.errornoslash.be"],
    github:   ["https://github.com/ErrorNoSlash", "github.com/ErrorNoSlash"],
    gitlab:   ["https://gitlab.com/ErrorN0Slash/", "gitlab.com/ErrorN0Slash"],
    mastodon: ["https://mastodon.social/@slashy", "@slashy@mastodon.social"],
    mail:     ["mailto:dias.stas@pm.me", "dias.stas@pm.me"],
    blog:     ["https://blog.errornoslash.be/", "blog.errornoslash.be"],
    docs:     ["https://docs.errornoslash.be/", "docs.errornoslash.be"],
};

const screen = document.getElementById("screen");
const output = document.getElementById("output");
const input = document.getElementById("cmdline");
const inputLine = document.getElementById("input-line");

const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

/* helpers */
function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function scrollDown() {
    screen.scrollTop = screen.scrollHeight;
}

function print(html, cls) {
    const row = document.createElement("div");
    row.className = "row" + (cls ? " " + cls : "");
    row.innerHTML = html;
    output.appendChild(row);
    scrollDown();
    return row;
}

const PROMPT = '<span class="p-user">visitor@errornoslash</span><span class="p-path">:~$</span>';

/* commands */
const commands = {
    help() {
        const list = [
            ["help", "show this list"],
            ["about", "who is Dias Stas"],
            ["whoami", "quick answer"],
            ["contact", "all the ways to reach me"],
            ["neofetch", "system + profile card"],
            ["banner", "big ol' name"],
            ["website / github / gitlab", "open a link"],
            ["mastodon / mail / blog / docs", "open a link"],
            ["date", "current date/time"],
            ["clear", "wipe the screen"],
        ];
        print("Available commands — click a chip below, or type:", "muted");
        print('<pre class="tbl">' + list.map(function (row) {
            return '  <span class="k">' + row[0].padEnd(30) + "</span>" + row[1];
        }).join("\n") + "</pre>");
    },

    about() {
        print('<pre class="tbl">' +
            '  <span class="k">name  </span> Dias Stas\n' +
            '  <span class="k">role  </span> studying &amp; writing code\n' +
            '  <span class="k">stack </span> front-end · websites · mobile · software\n' +
            '  <span class="k">into  </span> NixOS, homelab, terminals that look like this\n' +
            "</pre>");
        print('Type <span class="cmd" data-cmd="contact">contact</span> to reach me, ' +
            'or <span class="cmd" data-cmd="neofetch">neofetch</span> for the full card.', "muted");
    },

    whoami() {
        print("dias — just a guy who likes clean configs and blinking cursors.");
    },

    contact() {
        const rows = Object.keys(LINKS).map(function (k) {
            const url = LINKS[k][0];
            const label = LINKS[k][1];
            return '<a href="' + url + '" target="_blank" rel="noopener">' +
                '<span class="k">' + k + '</span>' +
                '<span class="arrow">-&gt;</span>' +
                '<span class="v">' + label + '</span></a>';
        }).join("");
        print('<div class="links">' + rows + "</div>");
    },

    neofetch() {
        const info = [
            ["user", "Dias Stas"],
            ["host", "contact.errornoslash.be"],
            ["role", "studying & writing code"],
            ["shell", "errornoslashOS 1.0.0"],
            ["web", "hello.errornoslash.be"],
            ["git", "github.com/ErrorNoSlash"],
            ["mail", "dias.stas@pm.me"],
            ["uptime", "always shipping"],
        ];
        const infoRows = info.map(function (r) {
            return '<span class="k">' + r[0].padEnd(7) + "</span> " + esc(r[1]);
        });

        /* On narrow screens stack the logo above the info so nothing overflows */
        if (window.innerWidth < 560) {
            print('<pre class="neofetch"><span class="ds">' + esc(DS) + "</span></pre>");
            print('<pre class="tbl">' + infoRows.map(function (r) { return "  " + r; }).join("\n") + "</pre>");
            return;
        }

        const art = DS.split("\n");
        const height = Math.max(art.length, infoRows.length);
        let out = "";
        for (let i = 0; i < height; i++) {
            const artLine = (art[i] || "").padEnd(18);
            out += '<span class="ds">' + esc(artLine) + "</span>   " + (infoRows[i] || "") + "\n";
        }
        print('<pre class="neofetch">' + out + "</pre>");
    },

    banner() {
        print('<pre class="ascii">' + esc(BANNER) + "</pre>");
    },

    date() {
        print(new Date().toString());
    },

    echo(args) {
        print(esc(args.join(" ")));
    },

    clear() {
        output.innerHTML = "";
    },

    sudo() {
        print("visitor is not in the sudoers file.  This incident has been reported. 🫡", "err");
    },

    exit() {
        print("There is no escape. (it's a website)", "muted");
    },
};

/* aliases */
commands.ls = commands.contact;
commands.social = commands.contact;
commands.links = commands.contact;
commands.clr = commands.clear;

/* each link name becomes a command that opens it */
Object.keys(LINKS).forEach(function (k) {
    commands[k] = function () {
        const url = LINKS[k][0];
        const label = LINKS[k][1];
        print('opening <a href="' + url + '" target="_blank" rel="noopener">' + label + "</a> …");
        window.open(url, "_blank", "noopener");
    };
});

/* run / submit */
const history = [];
let histIdx = 0;

function submit(line) {
    print(PROMPT + " " + esc(line));
    const parts = line.trim().split(/\s+/);
    const cmd = (parts[0] || "").toLowerCase();
    const args = parts.slice(1);
    if (!cmd) {
        return;
    }
    history.push(line);
    histIdx = history.length;
    if (commands[cmd]) {
        commands[cmd](args);
    } else {
        print('command not found: ' + esc(cmd) + ' — type <span class="cmd" data-cmd="help">help</span>', "err");
    }
}

/* boot sequence (typewriter, skippable) */
const BOOT = [
    "errornoslashOS 1.0.0 (tty1)",
    "[  <span class='ok'>ok</span>  ] mounting /home/dias",
    "[  <span class='ok'>ok</span>  ] starting network :: contact.errornoslash.be",
    "[  <span class='ok'>ok</span>  ] loading profile :: Dias Stas",
    "[  <span class='ok'>ok</span>  ] reached target Welcome",
];

let booting = true;

function finishBoot() {
    if (!booting) {
        return;
    }
    booting = false;
    output.innerHTML = "";
    BOOT.forEach(function (line) {
        print(line, "boot");
    });
    print('<pre class="ascii">' + esc(BANNER) + "</pre>");
    print('Welcome — here are my links. Type ' +
        '<span class="cmd" data-cmd="help">help</span> for more, ' +
        'or just click one below.', "muted");
    print("");
    inputLine.style.display = "flex";
    submit("contact");        // load the link list at start (it's a linktree)
    if (!isTouch) {
        input.focus();
    }
}

function boot() {
    const type = function (line) {
        return new Promise(function (resolve) {
            const row = print("", "boot");
            const plain = line.replace(/<[^>]+>/g, "");
            let i = 0;
            const tick = function () {
                if (!booting) {
                    return;
                }
                row.textContent = plain.slice(0, ++i);
                scrollDown();
                if (i < plain.length) {
                    setTimeout(tick, 9);
                } else {
                    row.innerHTML = line;
                    resolve();
                }
            };
            tick();
        });
    };

    (async function () {
        for (const line of BOOT) {
            if (!booting) {
                break;
            }
            await type(line);
            await new Promise(function (r) { setTimeout(r, 120); });
        }
        if (booting) {
            await new Promise(function (r) { setTimeout(r, 250); });
            finishBoot();
        }
    })();
}

/* input events */
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = input.value;
        input.value = "";
        submit(value);
    } else if (e.key === "ArrowUp") {
        if (histIdx > 0) {
            histIdx--;
            input.value = history[histIdx] || "";
        }
        e.preventDefault();
    } else if (e.key === "ArrowDown") {
        if (histIdx < history.length) {
            histIdx++;
            input.value = history[histIdx] || "";
        }
        e.preventDefault();
    } else if (e.key === "Tab") {
        e.preventDefault();
        const cur = input.value.toLowerCase();
        if (!cur) {
            return;
        }
        const matches = Object.keys(commands).filter(function (c) {
            return c.startsWith(cur);
        });
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            submit(input.value);
            print(matches.join("   "), "muted");
        }
    }
});

input.addEventListener("focus", scrollDown);

/* hamburger menu (mobile) */
const menuToggle = document.getElementById("menu-toggle");
const chips = document.querySelector(".chips");

function closeMenu() {
    chips.classList.remove("open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const open = chips.classList.toggle("open");
    menuToggle.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

/* click anywhere focuses the input; chips run commands */
document.addEventListener("click", function (e) {
    const chip = e.target.closest("[data-cmd]");
    if (chip) {
        if (booting) {
            finishBoot();
        }
        submit(chip.getAttribute("data-cmd"));
        closeMenu();
        if (!isTouch) {
            input.focus();
        }
        return;
    }
    if (e.target.closest("a")) {
        return;
    }
    /* tapping the open overlay's backdrop closes the menu */
    if (chips.classList.contains("open")) {
        closeMenu();
        return;
    }
    /* desktop: any click focuses input. touch: only when tapping the input line
       directly, so tapping chips/links never forces the keyboard open. */
    if (!isTouch || e.target.closest("#input-line")) {
        input.focus();
    }
});

/* any key during boot skips it */
document.addEventListener("keydown", function () {
    if (booting) {
        finishBoot();
    }
}, true);

/* respect reduced-motion: no typewriter */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishBoot();
} else {
    boot();
}
