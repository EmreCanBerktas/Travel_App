import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { signInWithGoogle, useAuth } from "../firebase/auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#5194FB",
    },
    background: {
      color: "",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function Navbar() {
  const { user, logout } = useAuth();
  const handleLogin = () => {
    signInWithGoogle();
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = React.useRef(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(ref.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar
          sx={{
            border: "none",
            outline: "none",
            background: "#fff",
            padding: "",
            boxShadow: "none",
            position: "fixed",
            borderBottom: "1px solid #e6e6e6",
            textDecoration: "none",
          }}
        >
          <Toolbar>
            <Typography sx={{ color: "#63C7FF" }}>
              <Button component={Link} to="/">
                <h1>Geziyoruz</h1>
              </Button>
            </Typography>
            <Button
              color="secondary"
              sx={{ marginLeft: "auto" }}
              component={Link}
              to="/createadvert"
            >
              İlan Oluştur
              <AddIcon />
            </Button>
            <Button color="secondary" component={Link} to="/Posts">
              İlanlar
            </Button>
            <div ref={ref}>
              {user ? (
                <div>
                  <Button
                    onClick={handleClick}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar src={user?.photoURL} />
                    <Typography sx={{ marginLeft: 1, color: "#63A0FF" }}>
                      {user?.displayName}
                    </Typography>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  m="2"
                  color="secondary"
                  variant="outlined"
                  onClick={handleLogin}
                >
                  Giriş Yap
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;
