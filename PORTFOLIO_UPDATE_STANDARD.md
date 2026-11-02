# Portfolio publishing standard

Every production-ready portfolio project must also be added to this website.

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

## Experience and skills

- Keep `src/components/Experience.jsx` and `src/components/Skills.jsx` in sync
  with the current resume.
