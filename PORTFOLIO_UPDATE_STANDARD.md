# Portfolio publishing standard

Every production-ready portfolio project must also be added to this website.

## Featured projects

- The 4–6 strongest projects live in `FEATURED` in `src/data/site.js`, shown as
  large case studies (summary, three highlights, tech, Live and Source).
- A featured project must not also appear in the `PROJECTS` grid.
- Each featured project has full-page captures in `src/assets/img/featured/`
  (`<slug>-desktop.jpg` 1100px wide, `<slug>-mobile.jpg` 360px wide). They
  auto-scroll inside the browser and phone frames.

## Other site content

- Contact details, client names, stats, stack, services and testimonials are
  all in `src/data/site.js`. Testimonials are quoted verbatim from
  milink.ca/testimonials — never write or edit a quote.

## Project entries

- Add the project to the `PROJECTS` array in `src/components/Project.jsx`.
- Use the real project screenshot and production name.
- Set `cat: "app"` for **Web App** or `cat: "web"` for **Web Design**.
- `live` — the verified live URL. Leave it out if there is no working live site.
- `github` — the repository URL. Leave it out if the code is private.
- `tech` — up to four tags, taken from the repo's real stack (package.json).
- The **Live** and **Code** buttons only render when `live` / `github` exist,
  on the card and in the preview dialog. **Preview** always shows.
- Order matters: place the project by quality inside its category, strongest
  first. The **All** view alternates one Web App, one Web Design
  automatically (`interleave`), so only the per-category order needs care.
- Verify the production build and the All, Web App and Web Design views.

## Asset rules

- Store the original screenshot in `src/assets/img/` with a descriptive filename.
- Run `npm run optimize-images` (macOS) to create the light JPEG copies in
  `src/assets/img/optimized/`, and commit them. Cards and the dialog use
  those copies and fall back to the original if a copy is missing.
- Confirm the image stays readable in the 16:9 card crop (it is anchored to the top).

## Skills

- Keep `STACK` in `src/data/site.js` in sync with the current resume and
  focused on the current stack (no Java, PHP or legacy tools).
