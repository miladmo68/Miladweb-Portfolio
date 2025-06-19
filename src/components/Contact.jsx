import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../assets/styles/Contact.scss";

import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Contact() {
  /* theme for dark / light colour choice  ------------------- */
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const inputTextColor = isDark ? "#fff" : "#000";
  const inputBgColor = isDark ? "#1e1e1e" : "#fff";

  /* form state ---------------------------------------------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [err, setErr] = useState({ name: false, email: false, message: false });

  /* toast feedback ------------------------------------------ */
  const [snack, setSnack] = useState({ open: false, ok: true });

  /* EmailJS env vars ---------------------------------------- */
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* required-field validation */
    const bad = {
      name: name.trim() === "",
      email: email.trim() === "",
      message: message.trim() === "",
    };
    setErr(bad);
    if (bad.name || bad.email || bad.message) return;

    /* try to send ------------------------------------------------ */
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name, email, message },
        PUBLIC_KEY
      );

      /* success */
      setName("");
      setEmail("");
      setMessage("");
      setSnack({ open: true, ok: true });
    } catch (error) {
      console.error("EmailJS error →", error); // <-- look here if it fails
      setSnack({ open: true, ok: false });
    }
  };

  /* reusable props for all TextFields (visible text!) -------- */
  const commonInputProps = {
    variant: "outlined",
    fullWidth: true,
    InputProps: {
      style: { color: inputTextColor, background: inputBgColor },
    },
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper space-y-8">
          <h1 className="flex items-center justify-center font-extrabold text-3xl">
            Contact
          </h1>

          <p className=" flex items-center justify-center">
            Have a digital vision? Let’s make it a reality! Feel free to reach
            out and I’ll reply promptly.
          </p>

          {/* contact form -------------------------------------- */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-flex">
              <TextField
                {...commonInputProps}
                required
                label="Your Name"
                value={name}
                error={err.name}
                helperText={err.name && "Please enter your name"}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                {...commonInputProps}
                required
                label="Email / Phone"
                value={email}
                error={err.email}
                helperText={err.email && "Please enter contact info"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <TextField
              {...commonInputProps}
              required
              multiline
              rows={8}
              label="Message"
              value={message}
              error={err.message}
              helperText={err.message && "Please enter your message"}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </div>
      </div>

      {/* toast ------------------------------------------------ */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.ok ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snack.ok ? "Message sent! 🎉" : "Oops, something went wrong."}
        </Alert>
      </Snackbar>
    </div>
  );
}
