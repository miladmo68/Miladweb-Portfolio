// import React, { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import List from "@mui/material/List";
// import ListIcon from "@mui/icons-material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";

// const drawerWidth = 240;
// const navItems = [
//   ["Home", "home"],
//   ["About", "about"],
//   // ["Skills", "skills"],
//   ["Projects", "projects"],
//   ["Services", "services"],
//   ["Contact", "contact"],
// ];

// function Navigation({ parentToChild, modeChange }) {
//   const { mode } = parentToChild;

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const navbar = document.getElementById("navigation");
//       if (navbar) {
//         const isScrolled = window.scrollY > navbar.clientHeight;
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     } else {
//       console.error(`Element with id "${sectionId}" not found`);
//     }
//   };

//   const drawer = (
//     <Box
//       className="navigation-bar-responsive"
//       onClick={handleDrawerToggle}
//       sx={{ textAlign: "center" }}
//     >
//       <p className="mobile-menu-top">
//         <ListIcon />
//         Menu
//       </p>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item[0]} disablePadding>
//             <ListItemButton
//               sx={{ textAlign: "center" }}
//               onClick={() => scrollToSection(item[1])}
//             >
//               <ListItemText primary={item[0]} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         component="nav"
//         id="navigation"
//         className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`}
//       >
//         <Toolbar className="navigation-bar">
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {mode === "dark" ? (
//             <LightModeIcon onClick={modeChange} />
//           ) : (
//             <DarkModeIcon onClick={modeChange} />
//           )}

//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             {navItems.map((item) => (
//               <Button
//                 key={item[0]}
//                 onClick={() => scrollToSection(item[1])}
//                 sx={{ color: "#fff" }}
//               >
//                 {item[0]}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <nav>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </Box>
//   );
// }

// export default Navigation;
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
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (!navbar) return;
      setScrolled(window.scrollY > navbar.clientHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = mode !== "dark";

  const styles = useMemo(() => {
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
      ? "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,255,0.94))"
      : "linear-gradient(180deg, rgba(10,14,23,0.94), rgba(10,14,23,0.92))";

    const CARD_BG = isLight
      ? "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))"
      : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))";

    const CARD_BORDER = isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.12)";

    const TEXT = isLight ? "#0B1220" : "#fff";
    const MUTED = isLight ? "rgba(11,18,32,0.62)" : "rgba(255,255,255,0.72)";

    return {
      MOBILE_PILL_BG,
      MOBILE_PILL_BORDER,
      MOBILE_PILL_SHADOW,
      DRAWER_BG,
      CARD_BG,
      CARD_BORDER,
      TEXT,
      MUTED,
    };
  }, [isLight]);

  const drawerWidth = "min(360px, 90vw)";

  const drawer = (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 2,
          p: 1.5,
          borderRadius: 3,
          background: styles.CARD_BG,
          border: `1px solid ${styles.CARD_BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        {/* Logo + Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            component="img"
            src="/favicon.png"
            alt="MiladWeb logo"
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "contain",
              boxShadow: isLight
                ? "0 10px 26px rgba(0,0,0,0.12), 0 0 18px rgba(0,118,255,0.12)"
                : "0 10px 26px rgba(0,0,0,0.45), 0 0 18px rgba(0,118,255,0.18)",
              border: isLight
                ? "1px solid rgba(0,0,0,0.08)"
                : "1px solid rgba(255,255,255,0.12)",
              background: isLight
                ? "rgba(255,255,255,0.6)"
                : "rgba(255,255,255,0.06)",
            }}
          />
          <Box>
            <Box
              sx={{
                fontWeight: 900,
                color: styles.TEXT,
                letterSpacing: ".06em",
              }}
            >
              MiladWeb
            </Box>
            {/* اگر خواستی زیرتیتر بگذاری، اینو باز کن */}
            {/* <Box sx={{ fontSize: 13, color: styles.MUTED }}>Portfolio</Box> */}
          </Box>
        </Box>

        {/* Close */}
        <IconButton onClick={handleDrawerToggle} sx={{ color: styles.TEXT }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Theme Toggle (ONLY inside drawer ✅) */}
      <Box
        sx={{
          mb: 1.5,
          p: 1.2,
          borderRadius: 2.5,
          background: styles.CARD_BG,
          border: `1px solid ${styles.CARD_BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box sx={{ color: styles.MUTED, fontSize: 13, fontWeight: 600 }}>
          Theme
        </Box>

        <IconButton
          onClick={modeChange}
          sx={{
            color: styles.TEXT,
            width: 42,
            height: 42,
            borderRadius: 2,
            border: `1px solid ${styles.CARD_BORDER}`,
            background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)",
            boxShadow: isLight
              ? "0 10px 24px rgba(0,0,0,0.10)"
              : "0 10px 24px rgba(0,0,0,0.35)",
          }}
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
                borderRadius: 2.5,
                background: styles.CARD_BG,
                border: `1px solid ${styles.CARD_BORDER}`,
                boxShadow: isLight
                  ? "0 10px 26px rgba(0,0,0,0.12)"
                  : "0 10px 26px rgba(0,0,0,0.35)",
                px: 2,
                py: 1.6,
                position: "relative",
                overflow: "hidden",
                transition: "transform .15s ease, box-shadow .15s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: isLight
                    ? "0 14px 30px rgba(0,0,0,0.14)"
                    : "0 14px 30px rgba(0,0,0,0.45)",
                },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "3px",
                  opacity: 0.8,
                  background:
                    "linear-gradient(180deg, rgba(0,96,255,0.85), rgba(0,96,255,0.20))",
                }}
              />
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    fontSize: 15,
                    fontWeight: 750,
                    letterSpacing: ".03em",
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
    </Box>
  );

  return (
    <Box sx={{ display: "flex", width: "100%", overflowX: "hidden" }}>
      <CssBaseline />

      {/* Desktop Navbar (your original style) */}
      <AppBar
        component="nav"
        id="navigation"
        className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Toolbar className="navigation-bar">
          {/* ✅ Desktop theme toggle stays as you had it (if you want remove, tell me) */}
          {mode === "dark" ? (
            <LightModeIcon onClick={modeChange} />
          ) : (
            <DarkModeIcon onClick={modeChange} />
          )}

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(([label, id]) => (
              <Button
                key={label}
                onClick={() => scrollToSection(id)}
                sx={{ color: "#fff" }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile pill top bar (ONLY hamburger ✅ no theme button here) */}
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          display: { xs: "block", sm: "none" },
          background: "transparent",
          boxShadow: "none",
          pt: 1.5,

          // ✅ prevents horizontal overflow
          left: 12,
          right: 12,
          width: "auto",
        }}
      >
        <Toolbar
          sx={{
            borderRadius: "28px",
            background: styles.MOBILE_PILL_BG,
            border: styles.MOBILE_PILL_BORDER,
            boxShadow: styles.MOBILE_PILL_SHADOW,
            backdropFilter: "blur(12px)",
            minHeight: "64px !important",
            px: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.2,
          }}
        >
          {/* Logo + Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              component="img"
              src="/favicon.png"
              alt="MiladWeb logo"
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "contain",
                border: isLight
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "1px solid rgba(255,255,255,0.12)",
                background: isLight
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,255,255,0.06)",
              }}
            />
            <Box
              sx={{
                fontWeight: 950,
                letterSpacing: ".10em",
                color: styles.TEXT,
                fontSize: 15,
              }}
            >
              MiladWeb
            </Box>
          </Box>

          {/* ✅ Hamburger only (3 lines) */}
          <IconButton
            onClick={handleDrawerToggle}
            aria-label="open menu"
            sx={{
              color: styles.TEXT,
              width: 46,
              height: 46,
              borderRadius: 2,
              border: isLight
                ? "1px solid rgba(0,0,0,0.10)"
                : "1px solid rgba(255,255,255,0.12)",
              background: isLight
                ? "rgba(0,0,0,0.03)"
                : "rgba(255,255,255,0.06)",
              boxShadow: isLight
                ? "0 10px 24px rgba(0,0,0,0.10)"
                : "0 10px 24px rgba(0,0,0,0.35)",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

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
              backgroundColor: "rgba(0,0,0,0.62)",
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
            borderLeft: `1px solid ${
              isLight ? "rgba(0,96,255,0.18)" : "rgba(0,96,255,0.25)"
            }`,
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(0,96,255,0.10)",
            backdropFilter: "blur(18px)",
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
