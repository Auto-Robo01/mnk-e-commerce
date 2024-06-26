import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import DialogProducts from "./DialogProducts";
import useProductsData from "../customHooks/useProductsData";
import CircularProgress from "@mui/material/CircularProgress";
import { API_RESPONSE } from "../utils/APIResponse";

export default function ProductDialog({ openDialog, setCloseDialog }) {
  let [products, setProducts] = React.useState(API_RESPONSE);
  const [filteredProducts, setFilteredProducts] = React.useState(API_RESPONSE);
  let [loader, setLoader] = React.useState(true);
  let [searchText, setSearchText] = React.useState("");
  let [page, setPage] = React.useState(1);
  let data = useProductsData(page);
  const [selectedProducts, setSelectedProducts] = React.useState([]);

  React.useEffect(() => {
    if (data.productsData) {
      setProducts((prevProducts) => [...prevProducts, ...data.productsData]);
      setFilteredProducts((prevProducts) => [
        ...prevProducts,
        ...data.productsData,
      ]);
      setLoader(false);
    }
  }, [data.productsData]);

  React.useEffect(() => {
    if (searchText === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  const handleSelectionChange = (selectedVariants) => {
    const selectedProductVariantPairs = Object.entries(selectedVariants)
      .filter(([variantId, isSelected]) => isSelected)
      .map(([variantId, isSelected]) => {
        const variant = products
          .flatMap((product) => product.variants)
          .find((v) => v.id === parseInt(variantId));
        return {
          productId: variant.product_id,
          variantId: parseInt(variantId),
        };
      });
    setSelectedProducts(selectedProductVariantPairs);
  };

  const addProducts = () => {
    let response = [];
    let groupedSelection = selectedProducts.reduce((product, element) => {
      if (!product[element.productId]) {
        product[element.productId] = [];
      }
      product[element.productId].push(element.variantId);
      return product;
    }, {});
    for (let product in groupedSelection) {
      let objectToPush = {};
      let productSelected = products.findIndex(
        (element) => element.id == product
      );
      let productName = products[productSelected].title;
      objectToPush.productId = product;
      objectToPush.content = productName;
      groupedSelection[product].forEach((variant) => {
        let variantSelected = products[productSelected].variants.findIndex(
          (element) => element.id == variant
        );
        let variantName =
          products[productSelected].variants[variantSelected].title;
        if (!objectToPush.variants) objectToPush.variants = [];
        objectToPush.variants.push({
          id: String(product) + "_" + String(variant),
          content: variantName,
        });
      });
      response.push(objectToPush);
    }
    setCloseDialog(response);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    setCloseDialog();
  };

  return (
    <div>
      <React.Fragment>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleClose();
            },
          }}
        >
          <DialogTitle>Select Products</DialogTitle>
          <hr style={{ border: "1px solid lightgrey", margin: "10px 0" }} />
          <TextField
            value={searchText}
            onChange={handleSearchChange}
            style={{ marginLeft: "10px", marginRight: "10px" }}
            placeholder="Searc product"
          />
          <hr style={{ border: "1px solid lightgrey", margin: "10px 0" }} />
          <DialogContent
            onScroll={handleScroll}
            style={{ maxHeight: "400px", overflow: "auto" }}
          >
            <Box>
              <div style={{ minWidth: "550px", minHeight: "400px" }}>
                {loader ? (
                  <Box
                    sx={{
                      display: "flex",
                      marginLeft: "230px",
                      marginTop: "185px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <DialogProducts
                    products={filteredProducts}
                    onSelectionChange={handleSelectionChange}
                    addProducts={addProducts}
                    searchText={searchText}
                  />
                )}
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addProducts}>Add Products</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
