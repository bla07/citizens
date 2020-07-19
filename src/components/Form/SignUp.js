import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/registerAction";

import Logo3 from "../../assets/img/Logo3.png";

import "../../assets/scss/SignUp.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fullname: "",
      email: "",
      birthday: "",
      gender: "",
      address: "",
      isNotFill : false,
      passValidate : false,
      passUnique : false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log ("oke")

    const {username, password, fullname, email, birthday, gender, address} = this.state

    const regisInput = {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
      birthday: birthday,
      gender: gender,
      address: address
    };
    
    let passValid = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+=;"',.<>])(?=.*[\d]).*$/
    
    console.log(regisInput.username)
    if (regisInput.username === "") {
      this.setState({
        isNotFill : true
      })
    } else if (regisInput.fullname === "" ) {
      this.setState({
        isNotFill : true
      })
    } else if (regisInput.password.length <= 8) {
      this.setState({
        passValidate : true
      })
    } else if (passValid.test(regisInput.password) === false) {
      this.setState({
        passUnique : true
      })
    }  
    else {
    console.log(regisInput)
    this.props.register(regisInput);
    this.props.history.push("/verify")
    }

    setTimeout(() => {
      this.setState({
        isNotFill : false,
        passValidate : false,
        passUnique : false
      })
    }, 2500)


  };

  render() {
    const {
      username,
      email,
      password,
      fullname,
      address,
      birthday
    } = this.state;

    return (
      <div>
        <div className='flex flex-wrap overflow-hidden'>
          <div className='w-full overflow-hidden  lg:w-2/5 xl:w-2/5 bg-blue-300 style-up'>
            <div className='bg-gray-800 mt-24 p-10 text-gray-200'>
              <h3 className='ml-8 text-2xl font-semibold'>
                Welcome to Citizen News
              </h3>
              <div>
                <h1 className='font-serif text-4xl'>
                  Complete Your Personal Information
                </h1>
                <p>
                  Create a Citizens News account to unlock all the benefit :
                </p>
                <ul className='-ml-4'>
                  <li>
                    <p>
                      <span>
                        <i className='fas fa-check-circle'></i>
                      </span>
                      Upload your own news
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>
                        <i className='fas fa-check-circle'></i>
                      </span>
                      Subscribe to other contributor
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='w-full overflow-hidden lg:w-3/5 xl:w-3/5 up-style h-screen pt-8 img-big-size'>
            <Link to='/'>
              <img src={Logo3} alt='Citizens-Logo' className='w-40 mx-auto' />
            </Link>
            <div className='mx-auto pt-4'>
              <form onSubmit={this.handleSubmit}>
              {this.state.isNotFill ? 
                (
                  <div class="flex items-center bg-red-500 text-white text-xs w-2/3 mx-auto font-bold px-2 py-2 my-2 rounded" role="alert">
                  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p>Something went wrong!</p>
                </div>
                ) : 
                (
                  null
                )}

                <div className='mb-4 w-2/3 mx-auto big-size'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='username'
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    autoComplete="off"
                    placeholder="username"
                  />
                </div>

                <div className='mb-4 w-2/3 mx-auto big-size'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='email'
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="email"
                  />
                </div>

                <div className='mb-4 w-2/3 mx-auto big-size'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='fullname'
                    autoComplete="off"
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={this.handleChange}
                    placeholder="Full Name"
                  />
                </div>

                <div className='mb-4 w-2/3 mx-auto big-size'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='password'
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                  {this.state.passValidate ? 
                  (
                    <div>
                    <p className="text-red-500 text-xs italic">Password should be more 8 characters</p> 
                    </div>
                  ) :
                  (
                    null
                  )}
                  {this.state.passUnique ? 
                  (
                    <div>
                    <p className="text-red-500 text-xs italic">Password should using unique characters</p>
                    </div>
                  ) 
                  : 
                  (
                    null
                  )}
                     
                </div>

                <div className='mb-2 w-2/3 mx-auto big-size'>
                  <label
                    className='block text-gray-200 text-sm font-bold mb-2'
                    htmlFor='birthday'>
                      Birthday
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='birthday'
                    type="date"
                    min="1945-01-01" 
                    max="2020-01-01" 
                    name="birthday"
                    value={birthday}
                    onChange={this.handleChange}
                  />
                </div>

                <div className='mb-4 w-2/3 mx-auto big-size'>
                  <label
                    className='block text-gray-200 text-sm font-bold mb-2'
                    htmlFor='address'>
                      Address
                  </label>
                  <textarea
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id="address"
                    type ="text"
                    name="address"
                    value={address}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="cntr s-gender flex justify-center big-size">
              <label htmlFor="opt1" className="radio px-4">
                <input 
                type="radio" 
                name="gender"
                value= "M"
                onChange={this.handleChange}
                className="hidden"
                id="opt1" 
                />
                <span className="label"></span>Male
              </label>
              <label htmlFor="opt2" className="radio px-4">
                <input 
                type="radio" 
                name="gender"
                value="F"
                onChange={this.handleChange}
                className="hidden" 
                id="opt2" 
                />
                <span className="label"></span>Female
              </label>
              </div>
                <div className='flex items-center justify-center'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 text-xs rounded focus:outline-none focus:shadow-outline'
                    type='submit'>
                    Sign Up
                  </button>
                </div>
              </form>
              <div className='text-center text-xs mt-4'>
                <p>
                  <Link to='/signin'>already member sign in here...</Link>
                </p>
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
    isAuthenticated: state.register1.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { register }
)(withRouter(SignUp));
