import { FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import StarRatings from "react-star-ratings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  deleteProductReview,
  getProductDetails,
} from "../services/product-service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductReviews = (props) => {
  const params = useParams();
  const handleDelete = () => {
    // console.log("handleDelete", "qq");
    deleteProductReview(params.productId, props.id).then(() => {
      getProductDetails(params.productId).then((response) => {
        // console.log(response.data.product.reviews,"pp");
        props.setProductDetails(response.data);
      });
      toast.success("review deleted succefully");
    });
  };
  // console.log(params, props);
  const userDetails = localStorage.getItem("user");
  const parseUserDetails = JSON.parse(userDetails || "{}");
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        // to make the card resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>
      <CardContent>
        <Box position="relative" display="flex">
          <Box>
            <Typography color="blue" level="title-lg">
              {props.name}
            </Typography>
          </Box>
          <Box>
            {parseUserDetails.role === "admin" ? (
              <>
                <IconButton
                  aria-label="Delete"
                  variant="plain"
                  color="primary"
                  size="small"
                  sx={{ position: "absolute", top: "0.0001rem", right: "0rem" }}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  variant="plain"
                  color="primary"
                  size="small"
                  sx={{ position: "absolute", top: "0.0001rem", right: "2rem" }}
                >
                  <EditNoteIcon />
                </IconButton>
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <StarRatings
          rating={props.rating}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="16px"
          starSpacing="2px"
          name="rating"
        />
        <Typography color="lightslategrey" level="body-sm">
          {props.comment}
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px"></CardActions>
    </Card>
  );
};

export default ProductReviews;
