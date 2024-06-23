import React, { useState } from 'react'
import './ProductRow.css'
import { MdDragIndicator } from "react-icons/md";
import { Button, FormControl,  InputAdornment,  MenuItem, Select, TextField } from '@mui/material';
import { MdEdit } from "react-icons/md";
import ProductDialog from './ProductDialog';
import { AiOutlineClose } from "react-icons/ai";
import ProductRowContainer from './ProductRowContainer';

const ProductRow = ({dragHandleProps, index, content, id, addData, variants}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [showDiscountFields, setShowDiscountFields] = useState(false)
    const [discountType, setDiscountType] = useState('% off')
    const [showVariant, setShowVariants] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const closeDialog = (dataToAdd) => {
        if(dataToAdd) addData(dataToAdd, id)
        setOpenDialog(false)
    }

    const setShowDiscount = () => {
        setShowDiscountFields(!showDiscountFields)
    }

    const handleDiscountType = (event) => {
        setDiscountType(event.target.value)
    }

    const handleShowVariants = () => {
        setShowVariants(!showVariant)
    }


  return (
    <div>
        <div className='product-row'>
            <div className='drag-icon'  {...dragHandleProps}>
                <MdDragIndicator />
            </div>
            <div className='serial-number'>
                {index+1}
            </div>
            <div className='product-textarea'>
            <TextField
                    className='text-area'
                    placeholder='Select Product'
                    value = {content}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <MdEdit className='edit-icon' onClick={handleOpenDialog} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div>
                {!showDiscountFields ? <Button variant='contained' color='success' onClick={setShowDiscount}>Add Discount</Button>
                : <div className='discount-fields'>
                    <TextField className='discount-input' />
                    <FormControl className='discount-select'>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountType}
                            label="Age"
                            onChange={handleDiscountType}
                        >
                            <MenuItem value={'% off'}>% off</MenuItem>
                            <MenuItem value={'flat off'}>flat off</MenuItem>
                        </Select>
                    </FormControl>
                    <AiOutlineClose onClick={setShowDiscount}/>
                </div>}
            </div>
            {<ProductDialog openDialog={openDialog} setCloseDialog={closeDialog}/>}
        </div>
        <div>
            {variants?.length > 0 
                && <span className='show-variant-button' onClick={handleShowVariants}>Show Variants</span> 
            }
           {showVariant && <ProductRowContainer rows={variants}/>}
        </div>
    </div>
  )
}

export default ProductRow