import React, { useEffect, useState } from "react";
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
import Navbar from "../../Component/Navbar";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getProductDetails,
  updateProduct,
} from "../../services/product-service";

const EditProduct = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [initialEditState, setinitialEditState] = useState(null);
  // console.log(initialEditState,"333");
  useEffect(() => {
    // console.log(params.productId,"aa");
    getProductDetails(params.productId)
      .then((response) => {
        setinitialEditState(response.data.product);
        // console.log(response.data.product, "77");
      })
      .catch((error) => {});
  }, []);

  const handleSubmit = (value) => {
    // console.log(value,"qq");
    updateProduct(value, params.productId)
      .then((response) => {
        toast.success("Product has been updated Successfully");
        navigate("/");
      })
      .catch((error) => {});
  };

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
            Edit Product
          </Typography>
          {initialEditState ? (
            <Formik
              initialValues={{
                productName: initialEditState.name,
                discription: initialEditState.description,
                price: initialEditState.price,
                category: initialEditState.category,
                stock: initialEditState.Stock,
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
                  Save
                </Button>
              </Form>
            </Formik>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default EditProduct;
