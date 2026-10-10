<p align="center">
  <img src="assets/banner.svg" alt="Dias Stas — contact site. A simple site for links" width="100%">
</p>

My personal link-in-bio page, live at [contact.errornoslash.be](https://contact.errornoslash.be). One place with all the ways to reach me. Vanilla HTML, CSS and JavaScript — no frameworks, no build step.

## Features

- 🔗 Link-in-bio layout — a full-page brutalist grid with the profile picture, name and numbered link rows
- 🔠 Huge title with sliced echoes, letters spread across the row
- 🎨 Link rows with a circular clip-path fill on hover
- 🪟 `who?` and `links?` blur the page and open a panel (close with the button, `Esc`, or a click outside)
- 💻 Terminal on its own page — `help`, `ls`, `open`, `whoami`, `home`, `clear`
- 🎞️ Clean page transition — a curtain wipes up between the contact page and the shell
- ⏳ Quick terminal-style preloader with a progress bar, skipped for reduced motion
- ⌨️ Browser tab title types and deletes terminal commands, like a shell prompt
- 🌗 Light and dark theme that follows the system
- 🖱️ Custom cursor (dot + trailing outline), disabled on touch devices
- 🔗 Link preview — Open Graph and Twitter tags with a 1200×630 image, so shared links show a card
- 📅 Footer year updates automatically via JavaScript
- 📱 Fully responsive

## Links

| row      | goes to |
| -------- | ------- |
| website  | [hello.errornoslash.be](https://hello.errornoslash.be/) |
| github   | [@ErrorNoSlash](https://github.com/ErrorNoSlash) |
| gitlab   | [@ErrorN0Slash](https://gitlab.com/ErrorN0Slash/) |
| mastodon | [@slashy@mastodon.social](https://mastodon.social/@slashy) |
| mail     | [dias.stas@pm.me](mailto:dias.stas@pm.me) |

## Structure

```
.
├── index.html          # the link page
├── shell.html          # the terminal, on its own page
├── CNAME               # custom domain for GitHub Pages
├── favicon.ico         # tab icon (16, 32, 48)
├── assets/
│   ├── banner.svg      # banner at the top of this README
│   └── og-image.svg    # source of the link preview image
├── images/
│   ├── pfp.jpg         # profile picture
│   ├── favicon.svg     # tab icon (dot-matrix DS)
│   ├── apple-touch-icon.png
│   └── og-image.png    # link preview image (1200×630)
├── styles/
│   ├── normalize.css
│   └── style.css       # colors, layout, transitions
└── scripts/
    ├── preloader.js    # preloader with progress bar
    ├── pageTransition.js # curtain wipe between index.html and shell.html
    ├── cursor.js       # custom cursor
    ├── getYear.js      # dynamic footer year
    ├── tabTitle.js     # typing and deleting text in the browser tab
    ├── title.js        # spreads the big title letters
    ├── marquee.js      # endless scrolling text
    ├── overlay.js      # who? / links? panels
    ├── links.js        # every link, for the shell and the links panel
    └── terminal.js     # the terminal on shell.html
```

## Run locally

No build step — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

Served with GitHub Pages on a subdomain:

1. Push to the published branch
2. `CNAME` record at the DNS provider: `contact` → `errornoslash.github.io`
3. The `CNAME` file in this repo keeps the custom domain set — don't delete it

## Customize

- **Links** — the `<a class="link-row">` blocks in `index.html` and the list in `scripts/links.js` (used by the shell and the links panel)
- **Link preview** — edit the Open Graph tags in the `<head>` of both pages; to change the image, edit `assets/og-image.svg` and export it as `images/og-image.png` (1200×630, PNG)
- **Tab title** — the `tabCommands` list at the top of `scripts/tabTitle.js`
- **Profile picture** — replace `images/pfp.jpg`
- **Colors** — the CSS variables at the top of `styles/style.css`:
  ```css
  :root {
      --black: #040507;
      --grey: #AEB5B8;
      --border: #525252;
  }
  ```

## License

MIT

---

`©Dias Stas` · [GitHub](https://github.com/ErrorNoSlash) · [GitLab](https://gitlab.com/ErrorN0Slash/) · [Mastodon](https://mastodon.social/@slashy)
