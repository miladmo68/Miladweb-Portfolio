import React, { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Services", "services"],
  ["Contact", "contact"],
];

function Navigation({ parentToChild, modeChange }) {
  const { mode } = parentToChild;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((p) => !p);

  // ✅ prevent horizontal scroll
  useEffect(() => {
    const prev = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = prev;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = mode !== "dark";

  const styles = useMemo(() => {
    const TEXT = isLight ? "#0B1220" : "#fff";
    const MUTED = isLight ? "rgba(11,18,32,0.62)" : "rgba(255,255,255,0.72)";
    const BORDER = isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.12)";
    const BG_TOP = isLight ? "rgba(255,255,255,0.85)" : "rgba(12,16,26,0.70)";
    const BG_SCROLL = isLight
      ? "rgba(255,255,255,0.96)"
      : "rgba(10,14,23,0.92)";
    const SHADOW = isLight
      ? "0 10px 26px rgba(0,0,0,0.10)"
      : "0 14px 34px rgba(0,0,0,0.45)";

    // Milink-ish vibe (pill + glow) :contentReference[oaicite:1]{index=1}
    const MOBILE_PILL_BG = isLight
      ? "radial-gradient(160% 140% at 85% 20%, rgba(0,118,255,0.10) 0%, rgba(0,118,255,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(245,247,255,0.86))"
      : "radial-gradient(160% 140% at 85% 20%, rgba(0,118,255,0.10) 0%, rgba(0,118,255,0) 60%), linear-gradient(180deg, rgba(26,30,40,0.92), rgba(14,18,28,0.88))";

    const MOBILE_PILL_BORDER = isLight
      ? "1px solid rgba(0,0,0,0.08)"
      : "1px solid rgba(255,255,255,0.10)";

    const MOBILE_PILL_SHADOW = isLight
      ? "0 8px 24px rgba(0,0,0,0.12), 0 0 28px rgba(0,118,255,0.14), inset 0 1px 2px rgba(255,255,255,0.22)"
      : "0 8px 24px rgba(0,0,0,0.45), 0 0 28px rgba(0,118,255,0.20), inset 0 1px 2px rgba(255,255,255,0.06)";

    const DRAWER_BG = isLight
      ? "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,255,0.96))"
      : "linear-gradient(180deg, rgba(10,14,23,0.96), rgba(10,14,23,0.94))";

    const CARD_BG = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)";

    return {
      TEXT,
      MUTED,
      BORDER,
      BG_TOP,
      BG_SCROLL,
      SHADOW,
      DRAWER_BG,
      CARD_BG,
      MOBILE_PILL_BG,
      MOBILE_PILL_BORDER,
      MOBILE_PILL_SHADOW,
    };
  }, [isLight]);

  const drawerWidth = "min(380px, 90vw)";

  const drawer = (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 2,
          p: 1.5,
          borderRadius: 2.5,
          background: styles.CARD_BG,
          border: `1px solid ${styles.BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          boxShadow: isLight
            ? "0 10px 22px rgba(0,0,0,0.10)"
            : "0 10px 22px rgba(0,0,0,0.35)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            component="img"
            src="/favicon.png"
            alt="MiladWeb logo"
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              objectFit: "contain",
              border: `1px solid ${styles.BORDER}`,
              background: isLight
                ? "linear-gradient(180deg, #FFFFFF, #F3F6FF)"
                : "linear-gradient(180deg, #0E1524, #0B111C)",
              boxShadow: isLight
                ? "inset 0 1px 2px rgba(255,255,255,0.5), 0 10px 22px rgba(0,0,0,0.12)"
                : "inset 0 1px 2px rgba(255,255,255,0.06), 0 10px 22px rgba(0,0,0,0.35)",
            }}
          />
          <Box sx={{ lineHeight: 1.05 }}>
            <Box
              sx={{
                fontWeight: 950,
                letterSpacing: ".08em",
                color: styles.TEXT,
              }}
            >
              MiladWeb
            </Box>
            <Box sx={{ fontSize: 12, color: styles.MUTED, fontWeight: 700 }}>
              Portfolio / Agency
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: styles.TEXT,
            width: 44,
            height: 44,
            borderRadius: 2,
            border: `1px solid ${styles.BORDER}`,
            background: isLight
              ? "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.06), rgba(0,0,0,0.02))"
              : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
            boxShadow: "0 0 18px rgba(0,96,255,0.22)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Theme Toggle (ONLY inside drawer ✅) */}
      <Box
        sx={{
          mb: 1.5,
          p: 1.2,
          borderRadius: 2,
          background: styles.CARD_BG,
          border: `1px solid ${styles.BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ color: styles.MUTED, fontSize: 13, fontWeight: 800 }}>
          Theme
        </Box>
        <IconButton
          onClick={modeChange}
          sx={{
            color: styles.TEXT,
            width: 44,
            height: 44,
            borderRadius: 2,
            border: `1px solid ${styles.BORDER}`,
            background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)",
          }}
          aria-label="toggle theme"
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ my: 1.2, opacity: 0.25 }} />

      {/* Nav items */}
      <List sx={{ display: "grid", gap: 1.2 }}>
        {navItems.map(([label, id]) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                scrollToSection(id);
              }}
              sx={{
                borderRadius: 2.2,
                background: styles.CARD_BG,
                border: `1px solid ${styles.BORDER}`,
                px: 2,
                py: 1.6,
                position: "relative",
                overflow: "hidden",
                boxShadow: isLight
                  ? "0 10px 22px rgba(0,0,0,0.10)"
                  : "0 10px 22px rgba(0,0,0,0.32)",
                transition: "transform .15s ease, box-shadow .2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: isLight
                    ? "0 14px 26px rgba(0,0,0,0.12)"
                    : "0 14px 26px rgba(0,0,0,0.38)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  opacity: 0.7,
                  background:
                    "linear-gradient(180deg, rgba(0,96,255,0.85), rgba(0,96,255,0.20))",
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  inset: -40,
                  opacity: 0,
                  filter: "blur(18px)",
                  transition: "opacity .25s ease",
                  background:
                    "radial-gradient(140px 60px at 50% 30%, rgba(0,96,255,0.16), transparent 70%)",
                },
                "&:hover:after": { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  mr: 1.4,
                  background:
                    "radial-gradient(circle at 40% 40%, #73A6FF, #0060FF 80%)",
                  boxShadow: "0 0 10px rgba(0,96,255,0.45)",
                }}
              />
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    fontSize: 15,
                    fontWeight: 800,
                    letterSpacing: ".02em",
                    color: styles.TEXT,
                  },
                }}
              />
              <ChevronRightIcon sx={{ opacity: 0.85, color: styles.TEXT }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, opacity: 0.25 }} />

      {/* Optional: footer hint */}
      <Box sx={{ color: styles.MUTED, fontSize: 12, textAlign: "center" }}>
        © {new Date().getFullYear()} MiladWeb
      </Box>
    </Box>
  );

  // Desktop button: clean underline hover
  const desktopBtnSx = {
    color: styles.TEXT,
    textTransform: "none",
    fontWeight: 700,
    letterSpacing: ".02em",
    px: 1.25,
    py: 1,
    borderRadius: 1.5,
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      left: 10,
      right: 10,
      bottom: 6,
      height: 2,
      borderRadius: 999,
      transform: "scaleX(0)",
      transformOrigin: "center",
      transition: "transform .18s ease",
      background: "rgba(0,96,255,0.85)",
    },
    "&:hover": {
      background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)",
    },
    "&:hover:after": {
      transform: "scaleX(1)",
    },
  };

  // ✅ Milink-style burger button (MUI)
  const BurgerButton = (
    <IconButton
      onClick={handleDrawerToggle}
      aria-label="open menu"
      sx={{
        width: 52,
        height: 52,
        borderRadius: "999px",
        position: "relative",
        border: isLight
          ? "1px solid rgba(0,0,0,0.10)"
          : "1px solid rgba(255,255,255,0.12)",
        background: isLight
          ? "radial-gradient(120% 120% at 30% 20%, rgba(0,96,255,0.10), rgba(255,255,255,0.92) 55%), linear-gradient(180deg, #FFFFFF, #F2F6FF)"
          : "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 60%), linear-gradient(180deg, #0E1422, #0A101B)",
        boxShadow: isLight
          ? `inset 0 1px 2px rgba(255,255,255,0.70),
             0 0 0 2px rgba(0,0,0,0.06),
             0 0 0 4px rgba(0,96,255,0.18),
             0 14px 34px rgba(0,0,0,0.14)`
          : `inset 0 1px 2px rgba(255,255,255,0.10),
             0 0 0 2px rgba(255,255,255,0.20),
             0 0 0 4px rgba(0,107,206,0.45),
             0 16px 40px rgba(0,0,0,0.35)`,
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          boxShadow: isLight
            ? "0 0 22px rgba(0,96,255,0.18)"
            : "0 0 26px rgba(0,107,206,0.45)",
          pointerEvents: "none",
        },
      }}
    >
      <MenuIcon
        sx={{
          color: isLight ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.90)",
          filter: isLight
            ? "none"
            : "drop-shadow(0 0 10px rgba(0,96,255,0.15))",
        }}
      />
    </IconButton>
  );

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <CssBaseline />

      {/* ✅ Desktop Navbar */}
      <AppBar
        component="nav"
        id="navigation"
        elevation={0}
        sx={{
          display: { xs: "none", sm: "block" },
          background: scrolled ? styles.BG_SCROLL : styles.BG_TOP,
          boxShadow: scrolled ? styles.SHADOW : "none",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${scrolled ? styles.BORDER : "transparent"}`,
        }}
      >
        <Toolbar
          sx={{
            mx: "auto",
            width: "100%",
            maxWidth: 1200,
            minHeight: "72px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Brand */}
          <Box
            onClick={() => scrollToSection("home")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <Box
              component="img"
              src="/favicon.png"
              alt="MiladWeb logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "contain",
                border: `1px solid ${styles.BORDER}`,
                background: isLight
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.06)",
              }}
            />
            <Box
              sx={{
                fontWeight: 950,
                letterSpacing: ".10em",
                color: styles.TEXT,
              }}
            >
              MiladWeb
            </Box>
          </Box>

          {/* Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {navItems.map(([label, id]) => (
              <Button
                key={label}
                disableRipple
                onClick={() => scrollToSection(id)}
                sx={desktopBtnSx}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile pill bar (Milink-ish) */}
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          display: { xs: "block", sm: "none" },
          background: "transparent",
          boxShadow: "none",
          pt: 1.2,
          left: 12,
          right: 12,
          width: "auto",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "66px !important",
            px: 2,
            borderRadius: "28px",
            border: styles.MOBILE_PILL_BORDER,
            background: styles.MOBILE_PILL_BG,
            boxShadow: styles.MOBILE_PILL_SHADOW,
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              component="img"
              src="/favicon.png"
              alt="MiladWeb logo"
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                objectFit: "contain",
                border: `1px solid ${styles.BORDER}`,
                background: isLight
                  ? "linear-gradient(180deg, #FFFFFF, #F3F6FF)"
                  : "linear-gradient(180deg, #0E1524, #0B111C)",
              }}
            />
            <Box sx={{ lineHeight: 1.05 }}>
              <Box
                sx={{
                  fontWeight: 950,
                  letterSpacing: ".08em",
                  color: styles.TEXT,
                  fontSize: 15,
                }}
              >
                MiladWeb
              </Box>
              <Box sx={{ color: styles.MUTED, fontSize: 12, fontWeight: 700 }}>
                Full-Stack / Agency
              </Box>
            </Box>
          </Box>

          {BurgerButton}
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile spacer (content goes پایین‌تر مثل Milink) */}
      <Box sx={{ display: { xs: "block", sm: "none" }, height: 76 }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.60)",
              backdropFilter: "blur(8px)",
            },
          },
        }}
        sx={{ display: { xs: "block", sm: "none" } }}
        PaperProps={{
          sx: {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "100dvh",
            background: styles.DRAWER_BG,
            borderLeft: `1px solid ${styles.BORDER}`,
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            overflowX: "hidden",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navigation;
