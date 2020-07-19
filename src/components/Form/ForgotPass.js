import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import Pict3 from "../../assets/img/59981.png";
import Logo2 from "../../assets/img/Logo2.png";

import "../../assets/scss/ForgotPass.scss";

class ForogotPass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { email } = this.state;

    try {
      const response = await axios.post(
        `https://app-citizenjournalism.herokuapp.com/api/v1/user/reset-password`,
        {
          email: email
        }
      );
      console.log(response);
      this.props.history.push("/verifyforgot");
    } catch (error) { }
  };

  render() {
    return (
      <div>
        <div id="app" className="flex bcg-pass">
          <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
            <div className="xl:max-w-lg xl:ml-auto text-center">
              <div className="flex justify-center content-forgot">
                <Link to="/">
                  <img src={Logo2} alt="image1Alt" width="200px" />
                </Link>
              </div>
              <img
                className="sm:mt-8 sm:h-auto sm:w-full sm:object-center lg:hidden"
                src={Pict3}
                alt="image2Alt"
              />
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-lg">
                Yo, forgot your password? dont't worry
                <br />
                you can reset your password here
              </p>
              
              <div className="mt-4 sm:mt-6 form-forgot">
                <form onSubmit={this.handleSubmit}>
                  <div className="col-3 flex justify-center">
                <input 
                  className="effect-1" 
                  type="email" 
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  />
                <span className="focus-border"></span>
               </div>
               <div className="flex justify-center">
                <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                type="submit"
                >
                  Reset Password
                </button>
                </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2 lg:relative">
            <img
              className="absolute inset-0 h-screen w-full object-cover object-center"
              src={Pict3}
              alt="image2Alt"
            />
          </div>
        </div>
        <div className="bcg-pass"></div>
      </div>
    );
  }
}

export default withRouter(ForogotPass);
