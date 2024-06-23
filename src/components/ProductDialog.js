import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tester from './DialogProducts';
import { Box } from '@mui/material';
import DialogProducts from './DialogProducts';
import { API_RESPONSE } from '../utils/APIResponse';

export default function ProductDialog( { openDialog, setCloseDialog }) {

    const [selectedProducts, setSelectedProducts] = React.useState([])



    const handleSelectionChange = (selectedVariants) => {
    console.log('Selected Variants:', selectedVariants);
    const selectedProductVariantPairs = Object.entries(selectedVariants)
      .filter(([variantId, isSelected]) => isSelected)
      .map(([variantId, isSelected]) => {
        const variant = API_RESPONSE.flatMap(product => product.variants).find(v => v.id === parseInt(variantId));
        return { productId: variant.product_id, variantId: parseInt(variantId) };
      });
    console.log('Selected Product-Variant Pairs:', selectedProductVariantPairs);
    setSelectedProducts(selectedProductVariantPairs)
  };

  const addProducts = () => {
    let response = []
    let groupedSelection = selectedProducts.reduce((product, element) => {
        if(!product[element.productId]){
            product[element.productId] = []
        }
        product[element.productId].push(element.variantId)
        return product
    }, {} )
    for(let product in groupedSelection) {
        let objectToPush = {}
        let productSelected = API_RESPONSE.findIndex((element) => element.id == product)
        let productName = API_RESPONSE[productSelected].title
        objectToPush.productId = product
        objectToPush.content = productName
        groupedSelection[product].forEach((variant) => {
            let variantSelected = API_RESPONSE[productSelected].variants.findIndex((element) => element.id == variant)
            let variantName = API_RESPONSE[productSelected].variants[variantSelected].title
            if(!objectToPush.variants) objectToPush.variants = []
            objectToPush.variants.push({
                id: String(product) + '_' + String(variant) ,
                content: variantName
            })
        })
        response.push(objectToPush)
    }
    setCloseDialog(response)
  }


  const handleClose = () => {
    setCloseDialog()
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Select Products</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <Box>
      {/* <Typography variant="h4" gutterBottom>Product List</Typography> */}
      <DialogProducts products={API_RESPONSE} onSelectionChange={handleSelectionChange} addProducts = {addProducts}/>
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addProducts}>Add Products</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
