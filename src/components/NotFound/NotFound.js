import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Lottie from "react-lottie";

import NotFound1 from '../../assets/loading/7655-rocket.json';

class NotFound extends Component {
  render() {

    const setLoattie = {
      loop: true,
      autoplay: true,
      animationData: NotFound1,
      renderSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div className="text-center bg-gray-200 h-screen py-6">
        <div className="flex justify-center">
          <Lottie options={setLoattie} width={250} />
        </div>

        <div>
        <h1 className="font-bold text-gray-700">404</h1>
        <h1 className="font-bold text-gray-700">Oops... Your page is not found</h1>
        <Link to="/">
        <button className="my-4 text-xs bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">Go Home</button>
        </Link>
        </div>
      </div>
    )
  }
}

export default NotFound
