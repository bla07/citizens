import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// import Logo3 from '../assets/img/Logo3.png'

import '../../assets/scss/HeaderS.scss'
class HeaderS extends Component {

  render() {

    return (
     <div className="bg-color-hot ">
       <div className="w-full nav-forjumbo text-white font-semibold uppercase">
       <nav className="bg-transparent">
        <div className="flex flex-wrap overflow-hidden p-3">
         <div className="w-full">
            <ul className="flex justify-around mt-6 text-setting">
              <Link to={`/category/News`}>
              <li className="hvr-underline-from-center">
                News
              </li>
              </Link>
              <Link to={`/category/Lifestyle`}>
              <li className="hvr-underline-from-center">
                Lifestyle
              </li>
              </Link>
              <Link to={`/category/Food`}>
              <li className="hvr-underline-from-center">
                Food
              </li>
              </Link>
              <Link to={`/category/Tech`}>
              <li className="hvr-underline-from-center">
                Tech
              </li>
              </Link>
              <Link to={`/category/Education`}>
              <li className="hvr-underline-from-center">
                Education
              </li>
              </Link>
              <Link to={`/category/Entertainment`}>
              <li className="hvr-underline-from-center">
                Entertainment
              </li>
              </Link>
              <Link to={`/category/Video`}>
              <li className="hvr-underline-from-center">
                Video
              </li>
              </Link>
            </ul>
          </div>
        
        </div>
       </nav>
       </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.login1.isAuthenticated,
  }
}

export default connect(
  mapStateToProps,
)  (withRouter(HeaderS))