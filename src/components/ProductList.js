import React, { useState } from 'react'
import './ProductList.css'
import ProductRowContainer from './ProductRowContainer'
import { Button, Input } from '@mui/material'

const ProductList = () => {
  const [rows, setRows] = useState([
    { id: '1', productId : '', content: '', variants: [] },
  ]);
  const [showDiscountFields, setShowDiscountFields] = useState(false)
  


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if(result.draggableId.includes('_')) {
      let productId = result.draggableId.split('_')[0]
      let row = rows.findIndex((element) => element.productId == productId)
      const newVariants = Array.from(rows[row].variants)
      const [reorderedVariants] = newVariants.splice(result.source.index, 1)
      newVariants.splice(result.destination.index, 0, reorderedVariants)
      rows[row].variants = newVariants
      setRows(Array.from(rows))
    }
    else{
    const newRows = Array.from(rows);
    const [reorderedItem] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, reorderedItem);

    setRows(newRows);
    }
  };

  const removeRow = (index, isVariant, id) => {
    if(isVariant) {
      let productId = id.split('_')[0]
      let indexRow = rows.findIndex((element) => element.productId == productId)
      rows[indexRow].variants.splice(index, 1)
      updateIndex(rows, isVariant, id)
      setRows(Array.from(rows))
    }
    else{
      const newRows = Array.from(rows)
      newRows.splice(index, 1)
      updateIndex(newRows)
      setRows(newRows)
    }
  }

  const updateIndex = (rows, isVariant = false, id = '') => {
    console.log(rows)
  }
 
  const addRow = () => {
    const newRows = Array.from(rows)
    const length = newRows.length
    newRows.push({
      id: String(length + 1),
      productId: '',
      content: '',
      variants: []
    })
    setRows(newRows)
  }

  const addData = (dataToAdd, index) => {
    let newRows = Array.from(rows)

    let rowToReplace = newRows.findIndex((row) => row.id == index)
    dataToAdd[0].id = String(index)
    newRows[rowToReplace] = dataToAdd[0]
    dataToAdd.splice(0, 1)

    let lastIndex = +index + 1
    for(let item of dataToAdd) {
      item.id = String(lastIndex)
      newRows.splice(index, 0, item)
      index = +index + 1
      lastIndex = +lastIndex + 1
    }
    for(let i = 0; i<newRows.length; i++) {
      newRows[i].id = String(i + 1)
    }

    setRows(newRows)

    

  }


  return (
    <div className='product-list-component'>
        <div className='product-list-header'>
            <div className='product-column'>Product</div>
            <div>Discount</div>
        </div>
        <div>
            <ProductRowContainer rows = {rows} handleOnDragEnd={handleOnDragEnd} addData = {addData} removeRow = {removeRow}/>
        </div>
        <div className='add-product-btn'>
          {!showDiscountFields ? <Button variant='outlined' onClick={addRow}  >Add Product</Button>
          : <Input></Input>}
        </div>
    </div>
  )
}

export default ProductList