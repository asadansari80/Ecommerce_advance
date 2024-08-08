import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";
import { deleteProduct, updateProduct } from "../services/product-service";
import { toast } from "react-toastify";

const Product = (props) => {
  const params = useParams();
  // console.log("param");
  const handleDelete = () => {
    deleteProduct(props.id).then((response) => {
      // console.log(response,"fff");
      // console.log(props,"qqq");
      props.getProductsFromApi();
      props.resetFilterState();
    });
    toast.success("product deleted succefully");
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    updateProduct(props.id).then(() => {
      // console.log(props.id, "ee");
    });
  };

  const userDetails = localStorage.getItem("user");
  const parseUserDetails = JSON.parse(userDetails || "{}");

  return (
    <Box>
      <Link to={`/product/${props.id}`} className="productLink">
        <Box sx={{ minWidth: 275, width: 400 }} padding={2}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex">
                <Box>
                  <Typography variant="h5" color="blue" gutterBottom>
                    {props.name}
                  </Typography>
                </Box>
                <Box position="relative" display="flex">
                  <Box>
                    {parseUserDetails.role === "admin" ? (
                      <>
                        <IconButton
                          aria-label="Delete"
                          variant="plain"
                          color="primary"
                          size="small"
                          sx={{
                            top: "0.0001rem",
                            left: "9rem",
                          }}
                        >
                          <EditNoteIcon
                            onClick={(event) => {
                              navigate(`/Product/${props.id}/edit`);
                              event.stopPropagation();
                              event.preventDefault();
                              // handleEdit();
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          variant="plain"
                          color="primary"
                          size="small"
                          sx={{
                            top: "0.0001rem",
                            left: "10rem",
                          }}
                          onClick={(event) => {
                            // console.log("in here"); //yaha event bubbling ho raha tha/// isliye stoppropogation aur preventDefault lagye hai
                            event.stopPropagation();
                            event.preventDefault();
                            handleDelete();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                component="div"
              >
                {props.description}{" "}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.category}{" "}
              </Typography>
              <Typography variant="body2" fontSize="16px" color="blue">
                Rs{props.price} <br />
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Link>
    </Box>
  );
};

export default Product;
