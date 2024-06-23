import React from 'react'
import ProductList from './ProductList'
import Header from './Header'
import './Body.css'

const Body = () => {
  return (
    <div>
        <Header/>
        <div className='content'> 
            <div className='add-product-heading'>Add Products</div>
            <div className='product-list-section'>
                <ProductList/>
            </div>
        </div>
    </div>
  )
}

export default Body