import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { forgot, forgotPassword } from "../services/user-service";

const ForgotPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string().min(2).max(50).required("This field is required"),
  });

  const handleSubmit = (value) => {
    //.then is for success scenerio
    // console.log(value,"555");                                 //.catch is for error scenerio
    forgotPassword(value).then((response) => {
      // console.log(response,"0300");
    });
  };
  return (
    <Container>
      <Formik
        initialValues={{
          //initialValues is must without it error will apper//
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(value) => {
          // console.log("333");
          handleSubmit(value);
        }}
      >
        <Form>
          Enter Your Email
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
          <Box>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export default ForgotPassword;
