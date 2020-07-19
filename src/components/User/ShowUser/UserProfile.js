import React, { Component } from "react";
import axios from "axios";
import ScrollUpButton from "react-scroll-up-button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDetailUser } from "../../../store/actions/getdetailuserAction";
import setToken from "../../../helpers/setToken";
import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../../assets/loading/201-simple-loader.json";

import "../../../assets/scss/UserProfile.scss";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      subs: false,
      scanSubs: [],
      loading : false,
      validateSubs : false,
      succesSubs : false,
      deleteSubs : false
    };
  }

  handleCheckSub = async id => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    let tokenCheck = localStorage.token;

    await axios
      .get(`https://citizensapp.herokuapp.com/api/v1/subs/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenCheck}`
        }
      })
      .then(response => {
        // console.log(response.data);
        this.setState({ subs: response.data.result });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const id = this.props.match.params.id;
    await this.props.getDetailUser(id);
    await this.handleCheckSub(id);
    this.setState({
      loading : true
    })
  };

  handleSubs = async id => {
    const { token } = this.state;

    let checkTokenFirst = localStorage.token
    // console.log(localStorage.token)

    if (checkTokenFirst === null ) {
      this.setState ({
        validateSubs : true
      })
    } else {
      try {
        const response = await axios.post(
          `https://citizensapp.herokuapp.com/api/v1/subs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response.data);
          this.setState({
            succesSubs : true
          })
        this.handleCheckSub(id);
      } catch (error) {}
    }
    setTimeout(() => {
      this.setState({
        validateSubs : false,
        succesSubs : false,
      })
    }, 1000)
    window.location.reload(true);
  };

  handleDeletSubs = async id => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    let tokenCheck = localStorage.token;

    try {
      const response = await axios.delete(
        `https://citizensapp.herokuapp.com/api/v1/subs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenCheck}`
          }
        }
      );
      console.log(response.data);
      this.setState({
        deleteSubs : true
      })
      this.handleCheckSub(id);
      window.location.reload(true);
    } catch (error) { }
    setTimeout(() => {
      this.setState({
        deleteSubs : false
      })
    }, 1000)
  };

  render() {
    const userData = this.props.details.user;

    const setLoattie = {
      loop: true,
      autoplay: true,
      animationData: Myloading,
      renderSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    console.log(this.props.details && this.props.details.user && this.props.details.user.subscribers.length)

    return (
      <div className='bg-color-hot limit-navbar'>
      <ScrollUpButton 
        StopPosition={0}
        ShowAtPosition={150}
        EasingType='easeOutCubic'
        AnimationDuration={500}
        ContainerClassName='ScrollUpButton__Container'
        TransitionClassName='ScrollUpButton__Toggled'
        />
        <div className='user-width mx-auto bg-white'>
          <div className='flex flex-col px-4 bg-color-hot'>
            <div className='bg-user'>
              <div className='container mx-auto'>
               

                  {this.state.loading ? 
                  (
                    <div className='flex flex-wrap py-8 flex-col sm:flex-row'>
                      <div className='w-32 h-32 rounded-full flex-shrink-0 m-auto sm:m-0'>
                    <img
                      src={userData && userData.image.secure_url}
                      alt={userData && userData.username}
                      className='object-cover object-center self-center rounded-full shadow-lg mb-6 h-32 w-32 md:h-32 md:w-32'
                    />
                  </div>

                  <div className='sm:pl-10 sm:pt-1 flex-1'>
                    <div className='flex sm:justify-between sm:flex-row sm:flex-no-wrap justify-center flex-wrap mb-6'>
                      <div className='flex flex-wrap md:w-auto w-full md:mb-0 mb-4'>
                        <h2 className='text-gray-800 text-3xl w-full mb-3 text-center sm:text-left font-bold font-serif mt-4 sm:mt-0'>
                          {userData && userData.fullname}
                        </h2>
                        <div className='flex sm:w-auto w-full sm:justify-start justify-center mt-4'>
                          <span className='text-gray-800 mr-4 tracking-wider text-sm'>
                            <h4 className="bg-transparent text-light-coral font-semibold py-1 px-2 border border-blue-500 rounded text-sm text-center">
                              Published {userData && userData.news.length}
                            </h4>
                          </span>

                          <span className='text-gray-800 mr-4 tracking-wider text-sm'>
                            <h4 className="bg-transparent text-light-coral font-semibold py-1 px-2 border border-blue-500 rounded text-sm text-center">
                              Subscribers {userData && userData.subscribers.length}
                            </h4>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subscribe */}
                    {/* <div className='btn-center'>
                      {this.state.subs === true ? (
                        <button
                          className='bg-gray-800 text-white font-semibold rounded btn-subs text-xs'
                          onClick={() =>
                            this.handleDeletSubs(userData && userData._id)
                          }>
                          Unsubscribe
                        </button>
                      ) : (
                        <button
                          className='bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded btn-subs text-xs'
                          onClick={() =>
                            this.handleSubs(userData && userData._id)
                          }>
                          Subscribe
                        </button>
                      )}
                    </div>
                    
                    {this.state.validateSubs ? 
                    (
                      <div className="flex items-center bg-red-500 text-white text-xs font-bold px-4 py-1 w-1/4 my-2" role="alert">
                      <p>You need to login!</p>
                    </div>
                    ) : 
                    (
                      null
                    )}

                    {this.state.succesSubs ? 
                    (
                      <div className="flex items-center bg-blue-500 text-white text-xs font-bold px-4 py-1 w-1/2 my-2" role="alert">
                      <p>Success Subscribe :D</p>
                    </div>
                    ) : 
                    (
                      null
                    )}

                    {this.state.deleteSubs ? 
                    (
                      <div className="flex items-center bg-gray-500 text-white text-xs font-bold px-4 py-1 w-1/2 my-2" role="alert">
                      <p>Success Unsubscribe</p>
                    </div>
                    ) : 
                    (
                      null
                    )} */}

                  </div>
                </div>
                  ) : 
                  (
                    <Lottie options={setLoattie} width={150} />
                  )}

        
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
    details: state.user1.detailUser
  };
};

export default connect(
  mapStateToProps,
  { getDetailUser }
)(withRouter(UserProfile));
