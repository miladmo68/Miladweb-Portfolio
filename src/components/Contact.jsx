import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { FiMail, FiPhone, FiMapPin, FiCopy, FiCheck, FiArrowUpRight, FiSend } from "react-icons/fi";
import { FaWhatsapp, FaGithub, FaLinkedinIn } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import SectionHead from "./sections/SectionHead";
import { CONTACT } from "../data/site";

const channels = [
  { icon: <FiPhone />, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phoneTel}` },
  { icon: <FaWhatsapp />, label: "WhatsApp", value: "Chat on WhatsApp", href: CONTACT.whatsapp },
  { icon: <FaLinkedinIn />, label: "LinkedIn", value: "in/miladmo68", href: CONTACT.linkedin },
  { icon: <FaGithub />, label: "GitHub", value: "github.com/miladmo68", href: CONTACT.github },
  { icon: <FiMapPin />, label: "Based in", value: CONTACT.location },
];

const EMPTY = { name: "", email: "", message: "", website: "" };

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending
  const [snack, setSnack] = useState({ open: false, ok: true });
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const bad = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      message: !form.message.trim(),
    };
    setErrors(bad);
    if (bad.name || bad.email || bad.message) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Send failed");
      setForm(EMPTY);
      setSnack({ open: true, ok: true });
    } catch (err) {
      console.error("Send error →", err);
      setSnack({ open: true, ok: false });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section id="connect" className="s-section" ref={ref} aria-labelledby="connect-title">
      <div className="s-container">
        <SectionHead
          id="connect-title"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something <em>great</em> together.
            </>
          }
          lead="Have a project, a role or an idea? Send a message — I usually reply within a day."
        />

        <div className="s-contact">
          <div className="s-contact-card" data-reveal style={{ "--d": "120ms" }}>
            <p className="s-contact-label">Email me directly</p>
            <div className="s-email">
              <a className="s-email-link" href={`mailto:${CONTACT.email}`}>
                <FiMail aria-hidden="true" />
                {CONTACT.email}
                <FiArrowUpRight className="s-email-arrow" aria-hidden="true" />
              </a>
              <button type="button" className="s-copy" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <FiCheck /> : <FiCopy />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <p className="s-contact-label">Or find me on</p>
            <ul className="s-channels">
              {channels.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      <span className="s-channel-icon">{c.icon}</span>
                      <span>
                        <small>{c.label}</small>
                        {c.value}
                      </span>
                    </a>
                  ) : (
                    <div>
                      <span className="s-channel-icon">{c.icon}</span>
                      <span>
                        <small>{c.label}</small>
                        {c.value}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form className="s-form" onSubmit={submit} noValidate data-reveal style={{ "--d": "200ms" }}>
            <div className="s-form-head">
              <h3>Send a message</h3>
              <p>
                <span className="s-live-dot" aria-hidden="true" /> Usually replies within 24 hours
              </p>
            </div>
            <div className="s-form-row">
              <label className={`s-field ${errors.name ? "has-error" : ""}`}>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" value={form.name} onChange={set("name")} placeholder="Jane Doe" />
                {errors.name && <em>Please enter your name</em>}
              </label>
              <label className={`s-field ${errors.email ? "has-error" : ""}`}>
                <span>Email or phone</span>
                <input type="text" name="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" />
                {errors.email && <em>Please add a way to reach you</em>}
              </label>
            </div>
            <label className={`s-field s-field--grow ${errors.message ? "has-error" : ""}`}>
              <span>Message</span>
              <textarea name="message" rows={6} value={form.message} onChange={set("message")} placeholder="Tell me about your project or role…" />
              {errors.message && <em>Please write a short message</em>}
            </label>
            {/* honeypot — hidden from people, filled by bots */}
            <label className="s-hp" aria-hidden="true">
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
            </label>
            <div className="s-form-foot">
              <p>Your details are only used to reply to you.</p>
              <button type="submit" className="s-btn s-btn--primary s-btn--lg" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : (<>Send message <FiSend aria-hidden="true" /></>)}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={4500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.ok ? "success" : "error"} onClose={() => setSnack((s) => ({ ...s, open: false }))} sx={{ borderRadius: "12px" }}>
          {snack.ok ? "Thanks! Your message is on its way." : `Something went wrong. Please email ${CONTACT.email}.`}
        </Alert>
      </Snackbar>
    </section>
  );
}
