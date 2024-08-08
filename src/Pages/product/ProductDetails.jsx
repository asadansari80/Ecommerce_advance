import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  createProductReview,
  getProductDetails,
} from "../../services/product-service";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import ProductReviews from "../../Component/ProductReviews";
import Navbar from "../../Component/Navbar";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  // console.log(productDetails.product,"mnmn");
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  // console.log(productDetails.product?.Stock, "121");
  // console.log(productDetails.product?.reviews, "ccc");
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    createProductReview(star, review, params.productId)
      .then(() => {
        toast.success("review added succefully");
        setReview("");
        setStar(0);
        getProductDetails(params.productId) //this API will run only if createProductReview  API is success tk k purani API purana data na laye//
          .then((response) => {
            // console.log(response, "mmm");
            setProductDetails(response.data);
          })
          .catch((error) => {
            console.error("Error fetching product details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error("Network Error");
      });
  };
  const userDetails = localStorage.getItem("user");
  const parseUserDetails = JSON.parse(userDetails || "{}");

  const stockDetails = productDetails.product?.Stock;
  useEffect(() => {
    getProductDetails(params.productId)
      .then((response) => {
        // console.log(response, "mmm");
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Navbar />

      <Box display="flex">
        <Box paddingTop="20px">
          <img
            src="https://images.meesho.com/images/products/375220996/h1dwu_512.webp"
            alt="shirt"
            height="350"
            width="260"
          />
        </Box>
        <Box padding="20px">
          <Typography variant="h3" color="blue">
            {productDetails.product?.name}
          </Typography>
          <Box>
            {" "}
            <Typography variant="body1" color="gray">
              {productDetails.product?.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" fontSize="22px" color="orangered">
              RS:{productDetails.product?.price}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="orange">
              {productDetails.product?.ratings > 0 ? (
                <StarRatings //for real star we are using StarRatings component//
                  rating={productDetails.product?.ratings}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="16px"
                  starSpacing="2px"
                  name="rating"
                />
              ) : (
                ""
              )}
            </Typography>
          </Box>
          <Box>
            <Box>
              {" "}
              {parseUserDetails.role === "admin"
                ? `${stockDetails} pcs available `
                : ""}
              <Typography variant="body2" color="blue">
                {productDetails.product?.Stock >= 1
                  ? ` In Stock`
                  : "Out Of Stock"}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography variant="body2" color="blue">
                {productDetails.product?.Stock <= 5
                  ? `Only ${productDetails.product?.Stock} left `
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box paddingTop="20px">
        <Box>
          <StarRatings
            rating={star}
            starRatedColor="gold"
            changeRating={(rating) => {
              // console.log(rating,"mmm");
              setStar(rating);
            }}
            numberOfStars={5}
            starDimension="24px"
            starSpacing="8px"
            name="rating"
          />
        </Box>
        <Box display="flex" alignItems="center" padding="8px">
          <Box>
            <TextField
              id="outlined-multiline-static"
              label="Review"
              multiline
              rows={2}
              review={review}
              value={review}
              placeholder="write review here"
              onChange={(event) => {
                // console.log(event,"mmmm");
                setReview(event.target.value);
              }}
            />
          </Box>
          <Box padding="12px">
            <Button
              type="submit"
              variant="contained"
              onClick={(value) => {
                handleSubmit();
                // navigate("/")
              }}
            >
              submit
            </Button>
          </Box>
        </Box>
        <Box>
          {productDetails.product?.reviews.map((data) => {
            // console.log(data, "nmnm");
            return (
              <ProductReviews
                name={data.name}
                rating={data.rating}
                comment={data.comment}
                id={data._id}
                setProductDetails={setProductDetails}
              />
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;
