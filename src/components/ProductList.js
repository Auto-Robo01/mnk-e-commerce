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

    const newRows = Array.from(rows);
    const [reorderedItem] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, reorderedItem);

    setRows(newRows);
  };

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
    dataToAdd = dataToAdd.shift()

    let lastIndex = newRows.length
    if(dataToAdd.length) {
      for(let item of dataToAdd) {
        item.id = String(lastIndex)
        newRows.push(item)
        lastIndex++
      }
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
            <ProductRowContainer rows = {rows} handleOnDragEnd={handleOnDragEnd} addData = {addData}/>
        </div>
        <div className='add-product-btn'>
          {!showDiscountFields ? <Button variant='outlined' onClick={addRow}  >Add Product</Button>
          : <Input></Input>}
        </div>
    </div>
  )
}

export default ProductList