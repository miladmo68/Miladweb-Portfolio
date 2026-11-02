import { useEffect, useRef } from "react";

/* Scroll reveal for a whole section: every descendant with `data-reveal`
   gets the `is-in` class once it scrolls into view. Stagger with the
   `--d` CSS variable (e.g. style={{ "--d": "120ms" }}). Elements stay
   visible when JS is off or the user prefers reduced motion (see CSS). */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
