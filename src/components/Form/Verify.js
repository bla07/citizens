import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Email from '../../assets/img/388516-PCBN6A-438.png';
import Logo2 from '../../assets/img/Logo3.png';

import '../../assets/scss/Verify.scss'

class Verify extends Component {
  render() {
    return (
      <div className="h-screen" style={{background : "linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)",
      backgroundBlendMode : "multiply"
      }}>
        <div className="flex flex-wrap overflow-hidden justify-center h-screen">
          <div className="w-full overflow-hidden p-8">
            <div className="flex justify-center container">
            <img src={Logo2} alt="Logo" width="200px"/>
            </div>
            <div className="flex justify-center container mt-8">
            <img src={Email} alt="email-verify" width="300px" className="h-full"/>
            </div>
          </div>
          <div className="w-full overflow-hidden v-text">
            <div>
              <h1>Verify your email address</h1>
              <p>Thank you, to start become a Citizens, we need to verify your email address.<br/> Please check your email.</p>
              <div className="v-link">
              <Link to="/">
                <button>Go home</button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Verify
