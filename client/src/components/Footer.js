import React from 'react'
import '../utils/footer.css'
import { Link } from 'react-router-dom';
import {Instagram, Facebook, Twitter, YouTube, GitHub} from '@material-ui/icons'
const Footer = () => {

// function github() {
//     window.open('https://github.com/codestates-beb/BEB-06-SECOND-05');
// }
// function notion() {
//     window.open('https://curly-albacore-ff3.notion.site/2-135c3f4da1cc4ac19556a58fb7d43d39');
// }
// function insta() {
//     window.open('https://www.instagram.com/codestates/');
// }
// function youtube() {
//     window.open('https://www.youtube.com/codestates');
// }
  return (
    <div className='footer'>
    <h5>2022@codeStates BEB-06-E2I2</h5>
    <h2>Join the community</h2> 
    <div className='footer-icon-container'>
        <a className='footer-icon' href='https://www.instagram.com/dlwlrma/' target='_blank'>
            <Instagram fontSize='large'></Instagram>
        </a>
        <a className='footer-icon' href='https://www.facebook.com/iu.loen/' target='_blank'>
            <Facebook fontSize='large'></Facebook>
        </a>
        <a className='footer-icon' href='https://twitter.com/_iuofficial' target='_blank'>
            <Twitter fontSize='large'></Twitter>
        </a>
        <a className='footer-icon' href='https://www.youtube.com/c/dlwlrma/about' target='_blank'>
            <YouTube fontSize='large'></YouTube>
        </a>
        <a className='footer-icon' href='https://github.com/codestates-beb/BEB-06-SECOND-05' target='_blank'>
            <GitHub fontSize='large'></GitHub>
        </a>
    </div>
</div>

  )
}

export default Footer

