import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Logo3 from "../../assets/img/Logo3.png";

import "../../assets/scss/VerifyForgot.scss";

class VerifyForgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      newPass: "",
      confirmPass: ""
    };
  }

  handleChange = async e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // console.log ("oke");
    const { token, newPass, confirmPass } = this.state;
    if (newPass === confirmPass) {
      alert("Congratulations!, has been success to change");
    } else alert("oops, something went wrong please check your password");

    try {
      const response = await axios.put(
        `https://app-citizenjournalism.herokuapp.com/api/v1/user/reset-password`,
        {
          token: token,
          password: newPass
        },
        console.log(token, newPass)
      );
      console.log(response.data);
      console.log("berhasil");
      this.props.history.push("/");
    } catch (error) {}
  };

  render() {
    const { token, newPass, confirmPass } = this.state;

    return (
      <div className="bcg-color">
        <div className="flex flex-wrap overflow-hidden">
          <div className="w-full overflow-hidden">
            <div className="flex justify-center img-style">
              <img src={Logo3} alt="mailbox"/>
            </div>
            <div className="text-center">
              <h1 className="text-white text-3xl font-serif font-semibold">
                Reset Your Password
              </h1>
            </div>
          </div>

          <div className="w-full overflow-hidden input-forgot">
            <div className="mx-auto flex justify-center">
              <form onSubmit={this.handleSubmit}>
                <div className="col-3">
                  <input
                    className="effect-1"
                    type="text"
                    placeholder="Your Token"
                    name="token"
                    value={token}
                    onChange={this.handleChange}
                  />
                  <span className="focus-border"></span>
                </div>

                <div className="col-3">
                  <input
                    className="effect-1"
                    type="password"
                    placeholder="New Password"
                    name="newPass"
                    value={newPass}
                    onChange={this.handleChange}
                  />
                  <span className="focus-border"></span>
                </div>

                <div className="col-3">
                  <input
                    className="effect-1"
                    type="password"
                    placeholder="Confirm Your Password"
                    name="confirmPass"
                    value={confirmPass}
                    onChange={this.handleChange}
                  />
                  <span className="focus-border"></span>
                </div>

                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-xs btn-response"
                    type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VerifyForgot);
