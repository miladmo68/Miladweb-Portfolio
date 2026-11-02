// api/contact.js  (ESM چون package.json → "type":"module")
import nodemailer from "nodemailer";

// escape user input before putting it into the email HTML
const esc = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// read JSON (Vercel + Vite)
async function readJsonBody(req) {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let payload = {};
  try {
    payload = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: "Invalid JSON" });
    return;
  }

  const { name, email, message, website } = payload || {};

  // honeypot: real visitors never see or fill the "website" field
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }
  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  if (String(name).length > 120 || String(email).length > 200 || String(message).length > 5000) {
    res.status(400).json({ error: "Message too long" });
    return;
  }

  const {
    SMTP_HOST,
    SMTP_PORT = "465",
    SMTP_USER,
    SMTP_PASS,
    TO_EMAIL,
  } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
    res.status(500).json({
      error: "Server not configured",
      hint: "Check env: SMTP_HOST/PORT/USER/PASS, TO_EMAIL (All Environments).",
    });
    return;
  }

  const port = Number(SMTP_PORT);
  const secure = port === 465; // SSL on 465

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // clearer errors if auth/network wrong
    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`, // Gmail wants the authenticated user here
      to: TO_EMAIL,
      subject: `New message — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: /@/.test(email) ? String(email) : undefined,
      html: `<p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p>
             <p><strong>Message:</strong></p>
             <p>${esc(message).replace(/\n/g, "<br/>")}</p>`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    let hint = "Open Vercel → Functions → Logs.";
    if (err?.message?.includes("Invalid login") || err?.code === "EAUTH") {
      hint =
        "EAUTH: Check SMTP_USER & SMTP_PASS (App Password 16 chars, NO SPACES).";
    } else if (err?.code === "ESOCKET" || err?.code === "ETIMEDOUT") {
      hint =
        "Connection: Use SMTP_HOST=smtp.gmail.com, SMTP_PORT=465 (or try 587).";
    }
    res
      .status(500)
      .json({ error: "Send failed", code: err.code || null, hint });
  }
}
