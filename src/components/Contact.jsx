import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/Contact.scss";

import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Contact() {
  const sectionRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState({ name: false, email: false, message: false });
  const [snack, setSnack] = useState({ open: false, ok: true });

  // CAPTCHA
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    generateCaptcha();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptcha({ question: `${a} + ${b}`, answer: a + b });
    setUserCaptcha("");
    setCaptchaError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bad = {
      name: name.trim() === "",
      email: email.trim() === "",
      message: message.trim() === "",
    };
    setErr(bad);
    if (bad.name || bad.email || bad.message) return;

    if (parseInt(userCaptcha, 10) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Send failed");

      setName("");
      setEmail("");
      setMessage("");
      generateCaptcha();
      setSnack({ open: true, ok: true });
    } catch (error) {
      console.error("Send error →", error);
      setSnack({ open: true, ok: false });
    }
  };

  const commonInputProps = {
    variant: "outlined",
    fullWidth: true,
  };

  return (
    <div ref={sectionRef} id="contact" className="fade-in-section">
      <div className="items-container">
        <div className="contact_wrapper">
          {/* Header Section */}
          <div className="contact-header">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">
              Have a digital vision? Let's make it a reality! Feel free to reach
              out and I'll reply promptly.
            </p>
          </div>

          {/* Contact Form Card */}
          <Box className="contact-form-card">
            <Box
              component="form"
              noValidate
              autoComplete="off"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              {/* Name and Email Row */}
              <div className="form-flex">
                <TextField
                  {...commonInputProps}
                  required
                  label="Your Name"
                  placeholder="John Doe"
                  value={name}
                  error={err.name}
                  helperText={err.name && "Please enter your name"}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  {...commonInputProps}
                  required
                  label="Email / Phone"
                  placeholder="john@example.com"
                  value={email}
                  error={err.email}
                  helperText={err.email && "Please enter contact info"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Message Field */}
              <TextField
                {...commonInputProps}
                required
                multiline
                rows={6}
                label="Message"
                placeholder="Tell me about your project..."
                value={message}
                error={err.message}
                helperText={err.message && "Please enter your message"}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mt: 2 }}
              />

              {/* CAPTCHA and Submit Row */}
              <Box className="form-footer">
                <TextField
                  {...commonInputProps}
                  size="small"
                  required
                  label={`What is ${captcha.question}?`}
                  placeholder="Answer"
                  value={userCaptcha}
                  error={captchaError}
                  helperText={captchaError && "Incorrect answer"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setUserCaptcha(val);
                      setCaptchaError(false);
                    }
                  }}
                  className="captcha-input"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  className="submit-button"
                >
                  Send Message
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      </div>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.ok ? "success" : "error"}
          sx={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          {snack.ok
            ? "Message sent successfully! 🎉"
            : "Oops, something went wrong. Please try again."}
        </Alert>
      </Snackbar>
    </div>
  );
}
