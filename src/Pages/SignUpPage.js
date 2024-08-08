import React, { useCallback, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { RootRef } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { creatUser, createUser } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";

const SignUpPage = () => {
  const [upload, setUpload] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("This field is required"),
    email: Yup.string().min(2).max(50).required("This field is required"),
    password: Yup.string().min(2).max(50).required("This field is required"),
    confirm_password: Yup.string()
      .min(2)
      .max(50)
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles,"3333");
    setUpload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();

  const handleSubmit = (value) => {
    createUser(value)
      .then((response) => {
        // console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Typography variant="h4">Sign Up</Typography>
          <Typography color={"red"} variant="div">
            {error}
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
          >
            <Form>
              <Box padding={1}>
                <Field
                  type="text"
                  id="filled-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  placeholder="name"
                  as={TextField}
                />
                <ErrorMessage name="Name" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="email"
                  id="filled-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  placeholder="email"
                  as={TextField}
                />
                <ErrorMessage name="Email" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="password"
                  name="password"
                  id="filled-basic"
                  label="Password"
                  variant="outlined"
                  placeholder="password"
                  as={TextField}
                />
                <ErrorMessage name="Password" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="password"
                  name="confirm_password"
                  id="filled-basic"
                  label="Confirm Password"
                  variant="outlined"
                  placeholder="confirm password"
                  as={TextField}
                />
                <ErrorMessage name="Confirm-Password" component="div" />
              </Box>

              <Box padding={1} width={218}>
                <RootRef rootRef={ref}>
                  <Paper {...rootProps}>
                    <input {...getInputProps()} />
                    <Button type="button" variant="outline">
                      {upload.length ? "File Uploaded" : "Upload File"}
                    </Button>
                  </Paper>
                </RootRef>
              </Box>
              <Box>
                <Box>
                  {upload.map((value) => {
                    // console.log(value ,"1010");
                    return value.name;
                  })}
                </Box>
              </Box>
              <Button type="submit" variant="contained" as={Button}>
                Submit
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
