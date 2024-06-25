import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Box, Avatar } from '@mui/material';



const DialogProducts = ({ products, onSelectionChange, searchText }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleProductChange = (productId) => {
    const allVariantsSelected = products.find(product => product.id === productId).options.every(variant => selectedVariants[variant.id]);
    const newSelectedVariants = { ...selectedVariants };

    products.find(product => product.id === productId).options.forEach(variant => {
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
        console.log('yoyo', product)
        const allVariantsSelected = product.options.every(variant => selectedVariants[variant.id]);
        const someVariantsSelected = product.options.some(variant => selectedVariants[variant.id]);

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
                {product.options.map(variant => (
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
                        {variant.name} {
                          variant.values.map((variant) => variant)
                        }
                      </Typography>
                      
                      
                    }
                    style={{margin: '10px'}}
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
