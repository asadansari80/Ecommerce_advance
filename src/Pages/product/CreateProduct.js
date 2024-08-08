import React from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Select } from "formik-mui";
import { createproduct } from "../../services/product-service";
import Navbar from "../../Component/Navbar";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  //to navigate from one page to another we use "navigate" with small n.....  i.e  navigate=useNavigate();.and we have to import useNavigate from react-router-dom.
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    productName: Yup.string()
      .min(3)
      .max(120)
      .required("This field is required"),
    discription: Yup.string()
      .min(3)
      .max(120)
      .required("This field is required"),
    price: Yup.number().min(1).max(9999).required("This field is required"),
    category: Yup.string().required("This field is required"),
    stock: Yup.number()
      .min(1)
      .max(9999, "Stock cannot exceed 4 characters")
      .required("Stock is required"),
  });

  const handleSubmit = (value) => {
    createproduct(value)
      .then((response) => {
        toast.success("New Product has been Added Successfully");
        navigate("/");
      })
      .catch((error) => {});
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
          <Typography variant="h4" color="blue">
            Add Product
          </Typography>
          <Formik
            initialValues={{
              productName: "",
              discription: "",
              price: "",
              category: "",
              stock: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(value) => {
              //   console.log(value, "cccc");
              handleSubmit(value);
            }}
          >
            <Form>
              <Box padding={1}>
                <Field
                  type="string"
                  required
                  id="filled-basic"
                  variant="outlined"
                  label="Product Name"
                  name="productName"
                  placeholder="Please Enter product Name"
                  as={TextField}
                ></Field>
                <ErrorMessage name="productName" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="string"
                  required
                  id="filled-basic"
                  variant="outlined"
                  label="Discription"
                  name="discription"
                  placeholder="Please Enter product Description"
                  as={TextField}
                ></Field>
                <ErrorMessage name="discription" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="number"
                  required
                  id="filled-basic"
                  variant="outlined"
                  label="Price"
                  name="price"
                  placeholder="Please Enter product Price"
                  as={TextField}
                ></Field>
                <ErrorMessage name="price" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="string"
                  name="category"
                  id="filled-basic"
                  component={Select}
                  lable="select category"
                  variant="outlined"
                  placeholder="Select Category"
                  fullWidth
                >
                  <MenuItem value="Shirt">Shirt</MenuItem>
                  <MenuItem value="T-Shirt">T-Shirt</MenuItem>
                  <MenuItem value="Jeans">Jeans</MenuItem>
                  <MenuItem value="Trousers">Trousers</MenuItem>
                  <MenuItem value="Jakets">Jackets</MenuItem>
                </Field>
                <ErrorMessage name="category" component="div" />
              </Box>
              <Box padding={1}>
                <Field
                  type="number"
                  required
                  id="filled-basic"
                  variant="outlined"
                  label="Stock"
                  name="stock"
                  placeholder="Please Enter product Stock"
                  as={TextField}
                ></Field>
                <ErrorMessage name="stock" component="div" />
              </Box>
              <Button type="submit" variant="contained" as={Button}>
                Add Product
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
