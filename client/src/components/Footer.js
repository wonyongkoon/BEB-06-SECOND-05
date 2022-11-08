import React from 'react'
import '../utils/footer.css'

import {Instagram, Facebook, Twitter, YouTube, GitHub} from '@material-ui/icons'
const Footer = () => {

  return (
    <div className='footer'>
    <h5>2022@codeStates BEB-06-E2I2</h5>
    <h2>Join the community</h2> 
    <div className='footer-icon-container'>
        <a className='footer-icon' href='https://www.instagram.com/dlwlrma/' target='_blank' rel="noreferrer">
            <Instagram fontSize='large'></Instagram>
        </a>
        <a className='footer-icon' href='https://www.facebook.com/iu.loen/' target='_blank' rel="noreferrer">
            <Facebook fontSize='large'></Facebook>
        </a>
        <a className='footer-icon' href='https://twitter.com/_iuofficial' target='_blank' rel="noreferrer">
            <Twitter fontSize='large'></Twitter>
        </a>
        <a className='footer-icon' href='https://www.youtube.com/c/dlwlrma/about' target='_blank' rel="noreferrer">
            <YouTube fontSize='large'></YouTube>
        </a>
        <a className='footer-icon' href='https://github.com/codestates-beb/BEB-06-SECOND-05' target='_blank' rel="noreferrer">
            <GitHub fontSize='large'></GitHub>
        </a>
    </div>
</div>

  )
}

export default Footer

