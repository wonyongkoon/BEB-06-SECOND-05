import React from 'react'
import '../utils/footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {

function github() {
    window.open('https://github.com/codestates-beb/BEB-06-SECOND-05');
}
function notion() {
    window.open('https://curly-albacore-ff3.notion.site/2-135c3f4da1cc4ac19556a58fb7d43d39');
}
function insta() {
    window.open('https://www.instagram.com/codestates/');
}
function youtube() {
    window.open('https://www.youtube.com/codestates');
}
  return (
    <div className='footer'>
         <section className="footer-subscription">
                <div class='footer-links'>
                    <div className='footer-link-wrapper'>
                    <h2 className="snstext">Join the community</h2>
                    <div className='snslogo'>
                        <div className='git_icon'>
                            <Link onClick={github}>
                                <img alt="githubicon" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567128822/noticon/osiivsvhnu4nt8doquo0.png"/>
                            </Link>
                        </div>
                        <div className='notion_icon'>
                            <Link onClick={notion}>
                                <img alt= "notionicon" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1570106347/noticon/hx52ypkqqdzjdvd8iaid.svg"/>
                            </Link>
                        </div>
                        <div className='insta_icon'>
                            <Link onClick={insta}>
                                <img alt= "instaicon" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008788/noticon/bqjhb6xvljt9viccy6lh.png"/>
                            </Link>
                        </div>
                        <div className='youtube_icon'>
                            <Link onClick={youtube}>
                                <img alt= "youtubeicon" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567002882/noticon/ctn6kpoyyaawcggjqmfj.png"/>
                            </Link>
                        </div>
                    </div>
                    </div>
                    </div>
                    </section>
        <a>2022@codeStates BEB-06-E2I2</a>
    </div>
  )
}

export default Footer