import React, { Component } from "react";
import ScrollUpButton from "react-scroll-up-button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getDetailUser,
  getUserNews
} from "../../../store/actions/getdetailuserAction";
import setToken from "../../../helpers/setToken";
import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../../assets/loading/201-simple-loader.json";
import User1 from"../../../assets/img/user1.png"

import "../../../assets/scss/UserProfile.scss";

class ProfileDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      loading: false
    };
  }

  componentDidMount = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const id = this.props.match.params.id;
    await this.props.getDetailUser(id);
    await this.props.getUserNews();
    this.setState({
      loading: true
    });
  };

  render() {
    const userData = this.props.userNews;
    // console.log("ini stateus",status)

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
              <ScrollUpButton 
        StopPosition={0}
        ShowAtPosition={150}
        EasingType='easeOutCubic'
        AnimationDuration={500}
        ContainerClassName='ScrollUpButton__Container'
        TransitionClassName='ScrollUpButton__Toggled'
        />
        <div>
          <div className='bg-color-hot limit-navbar'>
            <div className='user-width mx-auto bg-white'>
              <div className='flex flex-col px-4 bg-color-hot'>
                <div className='bg-user'>
                  <div className='container mx-auto'>
                    {this.state.loading ? (
                      <div className='flex flex-wrap py-8 flex-col sm:flex-row'>
                        <div className='w-32 h-32 rounded-full flex-shrink-0 m-auto sm:m-0'>
                          <img
                            src={userData && userData.image.secure_url === undefined ? User1 : userData && userData.image.secure_url}
                            alt={userData && userData.username}
                            className='object-cover self-center rounded-full shadow-lg mb-6 h-32 w-32 md:h-32 md:w-32'
                          />
                        </div>

                        <div className='sm:pl-10 sm:pt-1 flex-1'>
                          <div className='flex sm:justify-between sm:flex-row sm:flex-no-wrap justify-center flex-wrap mb-6'>
                            <div className='flex flex-wrap md:w-auto w-full md:mb-0 mb-4'>
                              <h2 className='text-gray-800 text-3xl w-full mb-3 text-center sm:text-left font-bold font-serif mt-4 sm:mt-0'>
                                {userData && userData.fullname}
                                <span className='ml-6 text-xs font-sans font-normal text-green-500 py-1 px-2 border border-green-500 rounded'>
                                  <Link
                                    to={`/editprofile/${userData &&
                                      userData._id}`}>
                                    Edit Profile
                                  </Link>
                                </span>
                              </h2>
                              <div className='flex sm:w-auto w-full sm:justify-start justify-center'>
                                <span className='text-gray-800 mr-4 tracking-wider text-sm'>
                                  <span className='text-gray-800 mx-1'>
                                    Contribution
                                  </span>
                                  {userData && userData.news.length}
                                </span>

                                <span className='text-gray-800 mr-4 tracking-wider text-sm'>
                                  <span className='text-gray-800'>
                                    Subcribers
                                  </span>
                                  {userData && userData.subscribers.length}
                                </span>

                                <span className='text-gray-800 mr-4 tracking-wider text-sm'>
                                  <span className='text-gray-800'></span>
                                  {userData && userData.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Lottie options={setLoattie} width={150} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mx-auto user-width py-2 bg-color-hot">
            <div className="flex border-b border-gray-500 py-3">
              <Link to={`/profile/${userData && userData._id}`} className="font-semibold mx-4 text-sm hover:text-gray-600">News</Link>
              <Link to={`/profile/${userData && userData._id}/status`} className="font-semibold mx-4 text-sm hover:text-gray-600">Status</Link>
            <div className="flex justify-end">
              <Link to={`/profile/${userData && userData._id}/upload`} className="font-semibold mx-4 bg-transparent py-1 px-3 text-xs border border-blue-500 rounded text-blue-600 hover:text-blue-400 "> Upload a News</Link>
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
    details: state.user1.detailUser,
    userNews: state.user1.userNews
  };
};

export default connect(
  mapStateToProps,
  { getUserNews, getDetailUser }
)(withRouter(ProfileDashboard));
