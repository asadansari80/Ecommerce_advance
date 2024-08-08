import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/product-service";
import "./Style.css";
import SearchIcon from "@mui/icons-material/Search";
import Product from "../../Component/Product";

const filterList = ["", "Shirt", "T-Shirt", "Trousers", "Jeans", "Jakets"];
const ProductWrapper = () => {
  const [productData, setProductData] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [value, setValue] = useState(filterList[0]);
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState({ minPrice: "", maxPrice: "" });
  // console.log(productData.products);

  const getProductsFromApi = () => {
    getProducts(pageNo, value, keyword, price)
      .then((response) => {
        // console.log(response, "111");
        setProductData(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getProductsFromApi();
  }, [pageNo, value, keyword]);
  const handleChange = (event, value) => {
    setPageNo(value);
  };
  const resetFilterState = () => {
    setPrice({ minPrice: "", maxPrice: "" });
    setKeyword("");
    setPageNo(1);
    // console.log(price, "bb");
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex">
        <Box padding="20px">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setKeyword(event.target.value);
                // console.log(event.target.value, "sasca");
              }}
              value={keyword}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box padding="20px">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={filterList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
            onChange={(event, newValue) => {
              // console.log(newValue,"dd");
              setValue(newValue);
              getProducts(1, value, keyword, price)
                .then((response) => {
                  // console.log(response, "111");
                  setProductData(response.data);
                })
                .catch((error) => {});
            }}
            value={value}
          />
        </Box>
        <Box display="flex" padding="20px" alignItems="center">
          <Typography fontSize="14px" fontWeight="bold">
            {" "}
            Price
          </Typography>
          <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-amount">MIN</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              onChange={(event, minPrice) => {
                // console.log(event.target.value);
                setPrice({
                  //for maxPrice to b included in with the minPrice we use ...Price i.e spread Operator//
                  ...price,
                  minPrice: event.target.value,
                });
              }}
              value={price.minPrice}
              label="Amount"
            />
            
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-amount">MAX</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              onChange={(event, maxPrice) => {
                setPrice({
                  maxPrice: event.target.value,
                  minPrice: price.minPrice,
                  //OR//
                  //   ...price  //  using spread operator
                });
              }}
              value={price.maxPrice}
              label="Amount"
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setPageNo(1);
              getProducts(1, value, keyword, price)
                .then((response) => {
                  // console.log(response, "111");
                  setProductData(response.data);
                })
                .catch((error) => {});
            }}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            onClick={(event) => {
              // console.log("in here");
              setPageNo(1);
              setPrice({ minPrice: "", maxPrice: "" });
              setValue("");
              getProducts(1, "", "", {})
                .then((response) => {
                  setProductData(response.data);
                })
                .catch((error) => {});
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap={"wrap"}>
        {productData.products?.map((data) => {
          // console.log(data, "333");
          return (
            <Product
              name={data.name}
              description={data.description}
              category={data.category}
              price={data.price}
              id={data._id}
              getProductsFromApi={getProductsFromApi}
              resetFilterState={resetFilterState}
            />
          );
        })}
      </Box>
      <Box>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(
              productData.filteredProductsCount / productData.resultPerPage
            )}
            color="primary"
            page={pageNo}
            onChange={(event, value) => {
              handleChange(event, value);
            }}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default ProductWrapper;
