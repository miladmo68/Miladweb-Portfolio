// api/contact.js  (CommonJS – مناسب وقتی package.json فاقد "type":"module" است)
const nodemailer = require("nodemailer");

// خواندن JSON در سرورلس
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
    res.status(500).json({
      error: "Server not configured",
      hint: "Check env vars: SMTP_HOST/PORT/USER/PASS and TO_EMAIL (Targets: Production/Preview).",
    });
    return;
  }

  const port = Number(SMTP_PORT);
  const secure = port === 465;

  try {
    // پیکربندی ساده‌تر: gmail
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, // smtp.gmail.com
      port,
      secure, // 465 → true
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.verify(); // اگر مشکلی در لاگین/اتصال باشد همین‌جا می‌افتد

    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`, // Gmail می‌خواهد فرستنده همون کاربر احراز شده باشد
      to: TO_EMAIL,
      subject: `New message — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
             <p><strong>Message:</strong></p>
             <p>${String(message).replace(/\n/g, "<br/>")}</p>`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    let hint = "Open Vercel → Functions → Logs for full error.";
    if (err?.message?.includes("Invalid login") || err?.code === "EAUTH") {
      hint =
        "EAUTH: Check SMTP_USER & SMTP_PASS (App Password for the SAME account, 16 chars, NO SPACES).";
    } else if (err?.code === "ESOCKET" || err?.code === "ETIMEDOUT") {
      hint =
        "Network/port: Use SMTP_HOST=smtp.gmail.com and SMTP_PORT=465 (or try 587 with secure:false).";
    } else if (/nodemailer/.test(String(err))) {
      hint = "Make sure 'nodemailer' is installed and in package.json.";
    }
    res
      .status(500)
      .json({ error: "Send failed", code: err.code || null, hint });
  }
};
