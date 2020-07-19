import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/loginAction";

import Logo2 from "../../assets/img/Logo2.png";

import "../../assets/scss/AdminLogin.scss";

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      alerError : false,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // console.log ("oke")

    const dataAdmin = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(dataAdmin);
    await this.props.loginUser(dataAdmin);
    const token = await localStorage.getItem("token");
    if (token) {
      this.props.history.push("/dashboard");
    } else {
      this.setState({
        alerError : true
      })
    }

    setTimeout(() => {
      this.setState({
        alerError : false,
      })
    }, 1500)

  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <div className="hero-admin">
          <div className="color-1">
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-32"
                  onSubmit={this.handleSubmit}>
                  <div className="flex justify-center pb-8">
                    <Link to="/">
                      <img src={Logo2} alt="Logo" width="150px" />
                    </Link>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="username">
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2">
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                    {this.state.alerError ?  
                    (
                    <p className="text-red-500 text-xs italic">
                      Please choose a correct password.
                    </p>
                    ) 
                    : 
                    (
                      null
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.login1.isAuthenticated,
    login1: state.login1.token
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(AdminLogin));
