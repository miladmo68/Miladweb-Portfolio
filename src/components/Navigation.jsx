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
      setScrolled(window.scrollY > 10);
    };
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

    const DRAWER_BG = isLight
      ? "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,255,0.96))"
      : "linear-gradient(180deg, rgba(10,14,23,0.96), rgba(10,14,23,0.94))";

    const CARD_BG = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)";
    const MOBILE_BAR_BG = isLight
      ? "rgba(255,255,255,0.92)"
      : "rgba(10,14,23,0.90)";

    return {
      TEXT,
      MUTED,
      BORDER,
      BG_TOP,
      BG_SCROLL,
      SHADOW,
      DRAWER_BG,
      CARD_BG,
      MOBILE_BAR_BG,
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
          borderRadius: 2.5,
          background: styles.CARD_BG,
          border: `1px solid ${styles.BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
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
              border: `1px solid ${styles.BORDER}`,
              background: isLight
                ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.06)",
            }}
          />
          <Box
            sx={{ fontWeight: 900, letterSpacing: ".06em", color: styles.TEXT }}
          >
            MiladWeb
          </Box>
        </Box>

        <IconButton onClick={handleDrawerToggle} sx={{ color: styles.TEXT }}>
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
        <Box sx={{ color: styles.MUTED, fontSize: 13, fontWeight: 700 }}>
          Theme
        </Box>
        <IconButton
          onClick={modeChange}
          sx={{
            color: styles.TEXT,
            width: 42,
            height: 42,
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
      <List sx={{ display: "grid", gap: 1 }}>
        {navItems.map(([label, id]) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                scrollToSection(id);
              }}
              sx={{
                borderRadius: 2,
                background: styles.CARD_BG,
                border: `1px solid ${styles.BORDER}`,
                px: 2,
                py: 1.5,
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    fontSize: 15,
                    fontWeight: 750,
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
    </Box>
  );

  // Desktop button: clean underline hover (professional)
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

      {/* ✅ Mobile top bar: only hamburger */}
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
            background: styles.MOBILE_BAR_BG,
            backdropFilter: "blur(12px)",
            border: `1px solid ${styles.BORDER}`,
            borderRadius: "18px",
            minHeight: "62px !important",
            px: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
            <Box
              component="img"
              src="/favicon.png"
              alt="MiladWeb logo"
              sx={{
                width: 36,
                height: 36,
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
                fontWeight: 900,
                letterSpacing: ".08em",
                color: styles.TEXT,
              }}
            >
              MiladWeb
            </Box>
          </Box>

          <IconButton
            onClick={handleDrawerToggle}
            aria-label="open menu"
            sx={{
              color: styles.TEXT,
              width: 46,
              height: 46,
              borderRadius: 2,
              border: `1px solid ${styles.BORDER}`,
              background: isLight
                ? "rgba(0,0,0,0.03)"
                : "rgba(255,255,255,0.06)",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile spacer: pushes content a bit down */}
      <Box sx={{ display: { xs: "block", sm: "none" }, height: 45 }} />

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
