import React from 'react'
import './Header.css'
import { LOGO_IMAGE } from '../utils/constants'

const Header = () => {
  return (
    <div className='header'>
        <img alt='logo' className='header-img' src={LOGO_IMAGE}></img>
        <div>Monk Upsell & Cross - sell</div>
    </div>
  )
}

export default Header