// api/contact.js
const nodemailer = require("nodemailer");

// read JSON (Vercel + Vite)
async function readJsonBody(req) {
  return await new Promise((ok, err) => {
    let d = "";
    req.on("data", (c) => (d += c));
    req.on("end", () => {
      try {
        ok(d ? JSON.parse(d) : {});
      } catch (e) {
        err(e);
      }
    });
    req.on("error", err);
  });
}

module.exports = async (req, res) => {
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
  const { name, email, message } = payload || {};
  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing fields" });
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
    res
      .status(500)
      .json({
        error: "Server not configured",
        hint: "Check env: SMTP_HOST/PORT/USER/PASS, TO_EMAIL",
      });
    return;
  }

  const port = Number(SMTP_PORT);
  const secure = port === 465;
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.verify(); // clearer errors
    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `New message — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${String(
        message
      ).replace(/\n/g, "<br/>")}</p>`,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    let hint = "Check Vercel → Functions → Logs.";
    if (err?.message?.includes("Invalid login") || err?.code === "EAUTH")
      hint = "EAUTH: Check SMTP_USER & SMTP_PASS (App Password, no spaces).";
    else if (err?.code === "ESOCKET" || err?.code === "ETIMEDOUT")
      hint =
        "Connection: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465 (or try 587).";
    res
      .status(500)
      .json({ error: "Send failed", code: err.code || null, hint });
  }
};
