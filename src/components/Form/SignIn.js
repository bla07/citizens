import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/loginAction";
import Lottie from "react-lottie";

import Logo3 from "../../assets/img/Logo3.png";

// Loading stuff
import Myloading from "../../assets/loading/2053-loading.json";

import "../../assets/scss/SignIn.scss";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      alerError : false,
      alertSuccess : false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true
    });
  
      const dataLogin = {
        username: this.state.username,
        password: this.state.password
      };
      // console.log(dataLogin);
      this.props.loginUser(dataLogin);
      await this.props.loginUser(dataLogin);
      const token = await localStorage.getItem("token");
      if (token) {
        this.setState({
          alertSuccess : true
        })
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000)
      } else {
        this.setState({
          alerError : true
        })
      }  
    
      setTimeout(() => {
        this.setState({
          alerError : false,
          alertSuccess : false
        })
      }, 2500)

    this.setState({
      loading: false,
    });
  };

  render() {
    const { username, password } = this.state;

    // console.log(this.props)

    const setLoattie = {
      loop: true,
      autoplay: true,
      animationData: Myloading,
      renderSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div>
        <div className='flex flex-wrap overflow-hidden'>
          <div className='w-full overflow-hidden lg:w-3/5 xl:w-3/5 sign-style h-screen pt-24 in-width'>
            <Link to='/'>
              <img src={Logo3} alt='Logo-Citizens' className='w-40 mx-auto' />
            </Link>
            <div>
              <form className="py-6" onSubmit={this.handleSubmit}>

               <div className='mb-6 w-2/3 mx-auto for-form'>
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
                <div className='mb-6 w-2/3 mx-auto for-form'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='password'
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
                {this.state.alerError ? 
                (
                  <div className="flex items-center bg-red-500 text-white text-xs w-1/2 mx-auto font-bold px-2 py-2 my-2 rounded" role="alert">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p>Something went wrong!</p>
                </div>
                ) : 
                (
                  null
                )}
                {this.state.alertSuccess ? 
                (
                  <div className="flex items-center bg-blue-500 text-white text-xs w-1/2 mx-auto font-bold px-2 py-2 my-2 rounded text-center" role="alert">
                  <p>Login Succes :D</p>
                </div>
                ) : 
                (
                  null
                )}
                <div className='flex justify-center'>
                  {this.state.loading ? (
                    <Lottie options={setLoattie} width={50} />
                  ) : (
                    <button
                      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded text-xs'
                      type='submit'>
                      Sign In
                    </button>
                  )}
                </div>
              </form>
              <div className='text-center text-xs mt-4'>
                <p>
                  <Link to='/forgot'> Forgot password ? </Link>
                </p>
                <p className='mt-1'>
                  Don 't have any account yet?
                  <Link to='/signup' className='ml-1'>
                    register here...
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className='w-full overflow-hidden lg:w-2/5 xl:w-2/5 bg-blue-300 style-in'>
            <div className='bg-gray-800 text-gray-200 mt-24 p-10 font-serif'>
              <h1 className='font-serif text-4xl'>
                Sign In with Citizens Account
              </h1>
              <p>
                Now you can login with your Citizens Account with these step :
              </p>
              <ul className='-ml-4'>
                <li>
                  <p>
                    <span>
                      <i className='fas fa-check-circle'></i>
                    </span>
                    Upload more news and become our Top Contributor.
                  </p>
                </li>
                <li>
                  <p>
                    <span>
                      <i className='fas fa-check-circle'></i>
                    </span>
                    Subscribe your favorite contributor, and give them
                    appreciation by leaving comment.
                  </p>
                </li>
              </ul>
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
  {
    loginUser
  }
)(withRouter(SignIn));
