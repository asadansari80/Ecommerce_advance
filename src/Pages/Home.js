import React from "react";
import { Box, Container } from "@mui/material";
import ProductWrapper from "./product/ProductWrapper";
import Navbar from "../Component/Navbar";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <ProductWrapper />
    </Container>
  );
};

export default Home;
