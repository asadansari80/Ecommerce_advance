import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogout } from "../services/user-service";

const Navbar = () => {
  const navigate = useNavigate();
  const userDetails = localStorage.getItem("user");
  const parseUserDetails = JSON.parse(userDetails || "{}");
  // {role==user?}
  // console.log("111", parseUserDetails.role == "user" ? "abc" : "pqr");
  // console.log(JSON.parse(userDetails).role, "0000");
  // console.log(typeof userDetails);
  const navigateToSignup = () => {
    navigate("/signup");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToCreateProduct = () => {
    navigate("/CreateProduct");
  };
  const handleLogOut = (value) => {
    userLogout(value)
      .then((response) => {
        // console.log(response, "0000");
        localStorage.clear();
        navigate("/login");
        toast.success("successfully Logout");
      })
      .catch((error) => {});
  };

  const token = localStorage.getItem("token");

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              onClick={navigateToHome}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ cursor: "pointer" }}
            >
              Home{" "}
            </Typography>
            {token ? (
              <>
                {parseUserDetails.role === "admin" ? (
                  <Button onClick={navigateToCreateProduct} color="inherit">
                    Create product
                  </Button>
                ) : (
                  ""
                )}
                Hello User{" "}
                <Button onClick={handleLogOut} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={navigateToLogin} color="inherit">
                Login
              </Button>
            )}
            {token ? (
              ""
            ) : (
              <Button onClick={navigateToSignup} color="inherit">
                Signup
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Navbar;
