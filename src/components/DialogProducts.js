import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Box, Avatar } from '@mui/material';



const DialogProducts = ({ products, onSelectionChange }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleProductChange = (productId) => {
    const allVariantsSelected = products.find(product => product.id === productId).variants.every(variant => selectedVariants[variant.id]);
    const newSelectedVariants = { ...selectedVariants };

    products.find(product => product.id === productId).variants.forEach(variant => {
      newSelectedVariants[variant.id] = !allVariantsSelected;
    });

    setSelectedVariants(newSelectedVariants);
    onSelectionChange(newSelectedVariants);
  };

  const handleVariantChange = (variantId) => {
    const newSelectedVariants = {
      ...selectedVariants,
      [variantId]: !selectedVariants[variantId]
    };
    setSelectedVariants(newSelectedVariants);
    onSelectionChange(newSelectedVariants);
  };

  return (
    <Box>
      {products.map(product => {
        const allVariantsSelected = product.variants.every(variant => selectedVariants[variant.id]);
        const someVariantsSelected = product.variants.some(variant => selectedVariants[variant.id]);

        return (
          <Box key={product.id} mb={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allVariantsSelected}
                    indeterminate={someVariantsSelected && !allVariantsSelected}
                    onChange={() => handleProductChange(product.id)}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <Avatar src={product.image.src} alt={product.title} sx={{ mr: 2 }} />
                    <Typography variant="h6">{product.title}</Typography>
                  </Box>
                }
              />
              <Box ml={3}>
                {product.variants.map(variant => (
                  <FormControlLabel
                    key={variant.id}
                    control={
                      <Checkbox
                        checked={selectedVariants[variant.id] || false}
                        onChange={() => handleVariantChange(variant.id)}
                      />
                    }
                    label={
                      <Typography variant="body1">
                        {variant.title} - ${variant.price} (Product ID: {product.id})
                      </Typography>
                    }
                  />
                ))}
              </Box>
            </FormGroup>
          </Box>
        );
      })}
    </Box>
  );
};

export default DialogProducts
