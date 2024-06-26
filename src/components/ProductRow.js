import React, { useState } from 'react'
import './ProductRow.css'
import { MdDragIndicator } from "react-icons/md";
import { Button, FormControl,  InputAdornment,  MenuItem, Select, TextField } from '@mui/material';
import { MdEdit } from "react-icons/md";
import ProductDialog from './ProductDialog';
import { AiOutlineClose } from "react-icons/ai";
import ProductRowContainer from './ProductRowContainer';
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";

const ProductRow = ({dragHandleProps, index, content, id, addData, variants, removeRow, isVariant, handleOnDragEnd, rows}) => {
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

    const handleRemoveRow = () => {
        removeRow(index, isVariant, id)
    }

  return (
    <div>
        <div className='product-row'>
            <div className='drag-icon'  {...dragHandleProps}>
                <MdDragIndicator />
            </div>
            {!isVariant && <div className='serial-number'>
                {index+1}
            </div>}
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
                </div>}
            </div>
            <div className='remove-product-icon'>
                {(rows.length > 1 || isVariant) && <AiOutlineClose onClick={handleRemoveRow} />}
            </div>
            {openDialog && <ProductDialog openDialog={openDialog} setCloseDialog={closeDialog}/>}
        </div>
        {variants?.length > 1 && <div>
            
            <span className='show-variant-button' onClick={handleShowVariants}>Show Variants
             {showVariant ? <AiOutlineUp/> :<AiOutlineDown/>}</span> 
           {showVariant && <div className='variants'> <ProductRowContainer className='variants' rows={variants} 
           isVariant = {true} handleOnDragEnd = {handleOnDragEnd} removeRow={removeRow} /></div>}
        </div>}
    </div>
  )
}

export default ProductRow