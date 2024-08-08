import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import { Password } from "@mui/icons-material";
import { updatePassword } from "../services/user-service";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const validationSchema = Yup.object({
    oldpassword: Yup.string().min(2).max(50).required("This field is required"),
    newpassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password can't be longer than 50 characters")
      .notOneOf(
        [Yup.ref("oldpassword")],
        "New password must be different from old password"
      )
      .required("This field is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("newpassword")], "Passwords must match")
      .required("This field is required"),
  });
  console.log(UpdatePassword)

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (value) => {
    // console.log(value, "wdsqwdq");
    updatePassword(value)
      .then((response) => {
        navigate("/login");
        toast.success("Password updated Succesfully ");
      })
      .catch((error) => {
        // console.log(error.response.data.message, "0000");
        setError(error.response.data.message);
      });
  };
  

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Update Password
        </Typography>
        <Typography>{error}</Typography>
        <Formik
          initialValues={{
            oldpassword: "",
            newpassword: "",
            confirmpassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            // console.log(value, "40100");
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
                id="old Password"
                label="Old Password"
                name="oldpassword"
                as={TextField}
                autoFocus
                
              />
            </Box>
            <Box mb={2}>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newpassword"
                label="New Password"
                type="password"
                as={TextField}
                id="password"
              />
              <ErrorMessage name="newpassword" component="div" />
            </Box>
            <Box mb={2}>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                as={TextField}
                id="password"
              />
              <ErrorMessage name="confirmpassword" component="div" />
            </Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
