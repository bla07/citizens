import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo3 from "../../assets/img/Logo3.png";

import "../../assets/scss/Footer.scss";

class Footer extends Component {

  onLinkClick = () => {
      window.open(`https://play.google.com/store/apps/details?id=com.glints.citizens`, "_blank");
  }

  render() {
    return (
      <div>
        <footer className="fo-color ">
          <div className="container mx-auto  px-1">
            <div className="w-full flex flex-col md:flex-row py-6">
              <div className="flex-1 mb-6">
                <Link to="/">
                  <img
                    src={Logo3}
                    alt="Logo"
                    className="fill-current inline w-48"
                  />
                </Link>
              </div>
              <div className="flex-1 fo-list">

                <h4 className="uppercase md:mb-3 text-sm font-bold">About C-News</h4>
                <ul className="list-reset mb-4">
                  <li className="mr-2 md:block md:mr-0">
                    <Link to="/about" className="no-underline font-normal text-sm">
                      About
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to="#" className="no-underline font-normal text-sm">
                      Contact
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to="#" className="no-underline font-normal text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to="#" className="no-underline font-normal text-sm">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-1 fo-list">
                <h4 className="uppercase md:mb-3 text-sm font-bold">Categories</h4>
                <ul className="list-reset mb-4 ">
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/News`} className="no-underline font-normal text-sm">
                      News
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/Education`} className="no-underline font-normal text-sm">
                      Education
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/Tech`} className="no-underline font-normal text-sm">
                      Tech
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/Food`} className="no-underline font-normal text-sm">
                      Food
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/Lifestyle`} className="no-underline font-normal text-sm">
                      Lifestyle
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/Entertainment`} className="no-underline font-normal text-sm">
                      Entertainment
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 md:block md:mr-0">
                    <Link to={`/category/Video`} className="no-underline font-normal text-sm">
                      Video
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-1 fo-social">
                <h4 className="uppercase md:mb-3 font-medium text-sm font-bold">Social</h4>
         
                  <Link to="#">
                 <div> <i className="fab fa-facebook-square fa-1x"/>Facebook</div>
                  </Link>
                  <Link to="#">
                  <div><i className="fab fa-twitter fa-1x"/>Twitter</div>
                  </Link>
                  <Link to="#">
                  <div><i className="fab fa-instagram fa-1x"/>Instagram</div>
                  </Link>
                  <Link to="#">
                  <div><i className="fab fa-youtube fa-1x"/>Youtube</div>
                  </Link>
  
            
              </div>

              <div className="flex-1 fo-list">
                <h4 className="uppercase md:mb-3 text-sm font-bold">Download</h4>
                <ul className="list-reset mb-4 fo-link">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <button  onClick={this.onLinkClick} >
                      <img 
                      src='https://lelogama.go-jek.com/component/nav/picture/google-play-badge3x-p.png'
                      alt='play-store'
                      className='w-1/2 lg:w-2/3'/>
                      </button>
                  </li>
                </ul>
              </div>

              
            </div>
            <hr className="border-b m-0" />
            <p className="text-center text-xs py-4">
              Citizens News &copy; 2020
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
