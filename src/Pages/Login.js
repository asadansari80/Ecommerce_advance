import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../services/user-service";
import { Navigate, useNavigate } from "react-router-dom";
// import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import Navbar from "../Component/Navbar";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().min(2).max(50).required("This field is required"),
    password: Yup.string().min(2).max(50).required("This field is required"),
  });

  const navigateToForgotPassword = () => {
    // console.log(1010);
    navigate("/forgotPassword");
  };

  const handleSubmit = (value) => {
    // console.log(value, "3333");
    login(value)
      .then((response) => {
        // console.log(response, "10100");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        toast.success("You are now login");
      })
      .catch((error) => {
        // console.log(error, "error");
        setError(error.response.data.message);
      });
  };
  return (
    <Container maxWidth="xl">
      <Navbar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography color={"red"} variant="div">
          {error}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            // console.log(value, "4444");
            handleSubmit(value);
          }}
        >
          <Form>
            <Box mb={2}>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                as={TextField}
                autoComplete="email"
                autoFocus
              />
            </Box>
            <Box mb={2}>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                as={TextField}
                id="password"
                autoComplete="current-password"
              />
            </Box>
            <Box>
              {/* <Box onClick={navigateToForgotEmail}>
                <Typography
                  variant="subtitle2"
                  style={{ cursor: "pointer" }}
                  color={"red"}
                >
                  {" "}
                  Forget Email
                </Typography>
              </Box> */}
              <Box onClick={navigateToForgotPassword}>
                <Typography
                  variant="subtitle2"
                  style={{ cursor: "pointer" }}
                  color={"red"}
                >
                  Forget Password
                </Typography>
              </Box>
            </Box>
            <Box mt={3} mb={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
