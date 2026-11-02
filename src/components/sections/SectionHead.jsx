/* Shared section heading: eyebrow, title and optional lead */
export default function SectionHead({ eyebrow, title, lead, align = "left", id }) {
  return (
    <header className={`s-head s-head--${align}`}>
      <p className="s-eyebrow" data-reveal>
        <span className="s-eyebrow-dot" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="s-title" id={id} data-reveal style={{ "--d": "80ms" }}>
        {title}
      </h2>
      {lead && (
        <p className="s-lead" data-reveal style={{ "--d": "160ms" }}>
          {lead}
        </p>
      )}
    </header>
  );
}
