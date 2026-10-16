<p align="center">
  <img src="assets/banner.svg" alt="Dias Stas — contact site. Website, blog, git, fedi and mail in one place" width="100%">
</p>

<p align="center">
  <b>My link-in-bio page — every way to reach me, in one place.</b><br>
  Live at <a href="https://contact.errornoslash.be">contact.errornoslash.be</a>
</p>

|            |                                                     |
| ---------- | --------------------------------------------------- |
| **Stack**  | vanilla HTML, CSS and JavaScript                    |
| **Build**  | none — open `index.html` and it runs                |
| **Pages**  | the link page, a terminal, and a no-JavaScript page |
| **Hosted** | GitHub Pages, on a subdomain                        |

---

## Pages

| page            | what it is                                                       |
| --------------- | ---------------------------------------------------------------- |
| `index.html`    | the link page: big title, portrait, name card and six link rows  |
| `shell.html`    | a small terminal to browse the same links by typing             |
| `noscript.html` | shown when JavaScript is off — every link still works           |

## Links

| #  | link     | goes to                                                     |
| -- | -------- | ----------------------------------------------------------- |
| 01 | website  | [hello.errornoslash.be](https://hello.errornoslash.be/)      |
| 02 | blog     | [blog.errornoslash.be](https://blog.errornoslash.be/)        |
| 03 | github   | [@ErrorNoSlash](https://github.com/ErrorNoSlash)             |
| 04 | gitlab   | [@ErrorN0Slash](https://gitlab.com/ErrorN0Slash/)            |
| 05 | mastodon | [@slashy@mastodon.social](https://mastodon.social/@slashy)  |
| 06 | mail     | [dias.stas@pm.me](mailto:dias.stas@pm.me)                   |

## Features

### 🎨 Look

- **Brutalist grid** — the whole page is one sheet of bordered rows
- **Huge title** — letters spread across the row, with two sliced echoes on top
- **Two fonts, two colours** — Outfit and Space Mono, black and white
- **Light and dark** — follows the system theme

### 🖱️ Moving around

- **Link rows** fill with a circle when you point at them
- **Possessed portrait** — moving over the photo turns it into flickering terminal symbols
- **Name card** lifts with a hard shadow, a spotlight follows the pointer and the asterisk spins
- **Custom cursor** — a dot with a gliding ring that inverts on light and dark parts; over a link it becomes a filled disc
- **Panels** — `who?` and `links?` blur the page and open a panel (close with the button, `Esc` or a click outside)
- **Curtain** wipes up between the link page and the shell
- **Preloader** in terminal style, with a progress bar
- **Tab title** types and deletes small commands, like a shell prompt

### 💻 The shell

| command         | does                                         |
| --------------- | -------------------------------------------- |
| `help`          | shows every command                          |
| `ls`            | lists the links (click or tap one to open)   |
| `open <n/name>` | opens a link, e.g. `open 2` or `open github` |
| `whoami`        | who runs this page                           |
| `home`          | back to the link page                        |
| `clear`         | clears the screen                            |

### 📱 Phones

- **Fully responsive** — the layout adapts from small phones to wide screens
- **Menu pill** opens a terminal-style menu with the shell and the links as an icon row
- **Rotate notice** — a phone turned sideways gets a "turn your phone upright" screen (pure CSS)
- **No custom cursor** on touch screens

### 🧩 Extras

- **No JavaScript?** Visitors are sent to `noscript.html`, a single terminal window that keeps every link working
- **Link preview** — Open Graph and Twitter tags with a 1200×630 image, so shared links show a card
- **Footer year** updates itself

## Run locally

No build step. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

Served with GitHub Pages on a subdomain:

1. Push to the published branch
2. Add a `CNAME` record at the DNS provider: `contact` → `errornoslash.github.io`
3. Keep the `CNAME` file in this repo — it holds the custom domain

## Customize

| to change           | edit                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------- |
| the links           | the `<a class="link-row">` blocks in `index.html` **and** the list in `scripts/links.js`   |
| the tab title       | the `tabCommands` list at the top of `scripts/tabTitle.js`                                  |
| the profile picture | replace `images/pfp.jpg`                                                                    |
| the link preview    | the Open Graph tags in the `<head>` of both pages, and `images/og-image.png` (1200×630)    |
| the colours         | the CSS variables at the top of `styles/style.css`                                          |

The main colours:

```css
:root {
    --black: #040507;
    --grey: #AEB5B8;
    --border: #525252;
}
```

## Structure

<details>
<summary>Show the file tree</summary>

```
.
├── index.html          # the link page
├── shell.html          # the terminal, on its own page
├── noscript.html       # shown when JavaScript is turned off
├── CNAME               # custom domain for GitHub Pages
├── favicon.ico         # tab icon (16, 32, 48)
├── assets/
│   └── banner.svg      # banner at the top of this README
├── images/
│   ├── pfp.jpg         # profile picture
│   ├── favicon.svg     # tab icon (dot-matrix DS)
│   ├── apple-touch-icon.png
│   └── og-image.png    # link preview image (1200×630)
├── styles/
│   ├── normalize.css
│   ├── noscript.css    # the JavaScript-off page
│   └── style.css       # colours, layout, transitions
└── scripts/
    ├── preloader.js      # preloader with progress bar
    ├── pageTransition.js # curtain wipe between index.html and shell.html
    ├── cursor.js         # custom cursor
    ├── getYear.js        # dynamic footer year
    ├── tabTitle.js       # typing and deleting text in the browser tab
    ├── title.js          # spreads the big title letters
    ├── marquee.js        # endless scrolling text
    ├── overlay.js        # who? / links? panels
    ├── cardSpotlight.js  # spotlight on the profile card
    ├── pictureSymbols.js # the possessed portrait
    ├── links.js          # every link, for the shell and the links panel
    └── terminal.js       # the terminal on shell.html
```

</details>

## License

MIT. Icons are from [Phosphor Icons](https://phosphoricons.com) (MIT).

---

<p align="center">
  <code>©Dias Stas</code> · <a href="https://hello.errornoslash.be">Website</a> · <a href="https://blog.errornoslash.be">Blog</a> · <a href="https://github.com/ErrorNoSlash">GitHub</a> · <a href="https://gitlab.com/ErrorN0Slash/">GitLab</a> · <a href="https://mastodon.social/@slashy">Mastodon</a>
</p>
