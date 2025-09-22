// // api/contact.js  ← دقیقا همین مسیر
// const nodemailer = require("nodemailer");

// // چون پروژه‌ات Next نیست، بدنه‌ی JSON را خودمان می‌خوانیم
// async function readJsonBody(req) {
//   return await new Promise((resolve, reject) => {
//     let data = "";
//     req.on("data", (c) => (data += c));
//     req.on("end", () => {
//       try {
//         resolve(data ? JSON.parse(data) : {});
//       } catch (e) {
//         reject(e);
//       }
//     });
//     req.on("error", reject);
//   });
// }

// module.exports = async (req, res) => {
//   if (req.method !== "POST") {
//     res.status(405).json({ error: "Method not allowed" });
//     return;
//   }

//   let payload = {};
//   try {
//     payload = await readJsonBody(req);
//   } catch {
//     res.status(400).json({ error: "Invalid JSON" });
//     return;
//   }

//   const { name, email, message } = payload || {};
//   if (!name || !email || !message) {
//     res.status(400).json({ error: "Missing fields" });
//     return;
//   }

//   const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;
//   if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
//     res.status(500).json({ error: "Server not configured" });
//     return;
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: Number(SMTP_PORT || 465),
//       secure: Number(SMTP_PORT || 465) === 465, // SSL on 465
//       auth: { user: SMTP_USER, pass: SMTP_PASS },
//     });

//     await transporter.sendMail({
//       from: `"${name}" <${SMTP_USER}>`,
//       to: TO_EMAIL,
//       subject: `New message from portfolio — ${name}`,
//       text: `From: ${name} <${email}>\n\n${message}`,
//       html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
//              <p><strong>Message:</strong></p>
//              <p>${String(message).replace(/\n/g, "<br/>")}</p>`,
//     });

//     res.status(200).json({ ok: true });
//   } catch (err) {
//     console.error("Email send error:", err);
//     res.status(500).json({ error: "Send failed" });
//   }
// };
// api/contact.js
const nodemailer = require("nodemailer");

// read JSON body (Vercel + Vite)
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
      hint: "Check Environment Variables (SMTP_HOST/PORT/USER/PASS, TO_EMAIL).",
    });
    return;
  }

  const portNum = Number(SMTP_PORT);
  const secure = portNum === 465; // SSL on 465

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: portNum,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // verify SMTP first for clearer errors
    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `New message — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
             <p><strong>Message:</strong></p>
             <p>${String(message).replace(/\n/g, "<br/>")}</p>`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    let hint = "Check logs in Vercel Functions.";
    if (err && typeof err.message === "string") {
      if (err.message.includes("Invalid login") || err.code === "EAUTH") {
        hint = "EAUTH: Check SMTP_USER & SMTP_PASS (App Password, no spaces).";
      } else if (err.code === "ESOCKET" || err.code === "ETIMEDOUT") {
        hint =
          "Connection issue: Check SMTP_HOST=smtp.gmail.com and SMTP_PORT=465.";
      }
    }
    res
      .status(500)
      .json({ error: "Send failed", code: err.code || null, hint });
  }
};
