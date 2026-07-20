<p align="center">
  <img src="banner.svg" alt="Dias Stas — Studying & writing code" width="100%">
</p>

My personal link-in-bio page, live at [contact.errornoslash.be](https://contact.errornoslash.be). One place with all the ways to reach me. Vanilla HTML, CSS and JavaScript — no frameworks, no build step.

## Features

- 🔗 Link-in-bio layout — profile picture, name, and stacked pill buttons
- 🎨 Buttons with a circular clip-path fill on hover
- 🖱️ Custom cursor (dot + trailing outline), disabled on touch devices
- 📅 Footer year updates automatically via JavaScript
- 📱 Fully responsive

## Links

| button   | goes to |
| -------- | ------- |
| website  | placeholder alert (portfolio coming soon) |
| github   | [@ErrorNoSlash](https://github.com/ErrorNoSlash) |
| gitlab   | [@ErrorN0Slash](https://gitlab.com/ErrorN0Slash/) |
| mastodon | [@slashy@mastodon.social](https://mastodon.social/@slashy) |
| mail     | [dias.stas@pm.me](mailto:dias.stas@pm.me) |

## Structure

```
.
├── index.html          # all content lives here
├── CNAME               # custom domain for GitHub Pages
├── images/
│   └── pfp.jpg         # profile picture
├── styles/
│   ├── normalize.css
│   └── style.css       # colors, layout, button transitions
└── scripts/
    ├── cursor.js       # custom cursor
    ├── alert.js        # placeholder alert on the website button
    └── getYear.js      # dynamic footer year
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

- **Links** — the `<a>` tags inside `#btn-div` in `index.html` (icons come from [Boxicons](https://boxicons.com))
- **Website button** — once the portfolio is live, remove `scripts/alert.js` and give the button a real `href`
- **Profile picture** — replace `images/pfp.jpg`
- **Colors** — the CSS variables at the top of `styles/style.css`:
  ```css
  :root {
      --grey: #AEB5B8;
      --black: #040507;
      --border: #525252;
  }
  ```

## License

MIT

---

`©Dias Stas` · [GitHub](https://github.com/ErrorNoSlash) · [GitLab](https://gitlab.com/ErrorN0Slash/) · [Mastodon](https://mastodon.social/@slashy)
