import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Logo3 from '../../assets/img/Logo3.png'

class PassSucces extends Component {
  render() {
    return (
      <div className="bcg-color">
        <div className="w-1/4 mx-auto">
          <img src={Logo3} alt="logo" className="w-4/5 py-8 ml-8"/>
          <h1 className="text-white py-8 ml-6 font-semibold font-serif">Reset Password Success</h1>
          <div className="ml-12 py-4">
          <Link to="/" className="bg-transparent text-white font-semibold  py-6 px-12 text-2xl border border-white rounded">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default PassSucces
