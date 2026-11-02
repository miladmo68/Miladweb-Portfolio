/* Screenshots: originals live in src/assets/img, light JPEG copies in
   src/assets/img/optimized/{card,full} (run `npm run optimize-images`).
   Falls back to the original when an optimized copy doesn't exist yet. */
const byName = (files) =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [
      path.split("/").pop().replace(/\.[^.]+$/, ""),
      url,
    ]),
  );

const originals = import.meta.glob("../assets/img/*.{png,jpg,jpeg,gif}", {
  eager: true,
  import: "default",
});
const cardImgs = byName(
  import.meta.glob("../assets/img/optimized/card/*.jpg", {
    eager: true,
    import: "default",
  }),
);
const fullImgs = byName(
  import.meta.glob("../assets/img/optimized/full/*.jpg", {
    eager: true,
    import: "default",
  }),
);

export const getImg = (file, size = "card") => {
  const name = file.replace(/\.([^.]+)$/, (_, ext) => `-${ext.toLowerCase()}`);
  const set = size === "full" ? fullImgs : cardImgs;
  return set[name] || originals[`../assets/img/${file}`];
};
