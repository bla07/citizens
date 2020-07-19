import React, { Component } from "react";
import ReactPlayer from  "react-player";
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

import "../../../assets/scss/UserProfile.scss";

class ProfileNews extends Component {
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

    const userNews =  this.props.userNews;

    const filterNews =
      userNews &&
      userNews.news.filter(checkNews => checkNews.status === "Approved");

      const getNewsUser =
      filterNews &&
      filterNews.map(showNews => {
        const dataNewsVideo = showNews.media.secure_url.split(".");
        if (dataNewsVideo[3] === "mp4") {
          return (
            <div
              className='flex flex-wrap overflow-hidden p-2 shadow my-4 rounded'
              key={showNews._id}>
              <div className='w-full overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 p-3'>
                <ReactPlayer
                  url={showNews.media.secure_url}
                  width='100%'
                  height='130px'
                />
              </div>
              <div className='w-full overflow-hidden md:w-2/3 lg:w-2/3 xl:w-2/3 p-3'>
                <Link to={`/videoDetail/${showNews._id}`}>
                  <h2 className='font-semibold'>{showNews.title}</h2>
                </Link>
                <p className='text-xs'>
                  published on<span> {showNews.date.substring(0, 10)}</span>
                </p>
                <p className='text-sm py-4 text-justify'>
                  {showNews.description.substring(0, 150)}...{" "}
                  <span className='font-semibold text-blue-800'>
                    <Link to={`/detail/${showNews._id}`}> Read More </Link>
                  </span>
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className='flex flex-wrap overflow-hidden p-2 shadow my-4 rounded'
              key={showNews._id}>
              <div className='w-full overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 p-3'>
                <img
                  src={showNews.media.secure_url}
                  alt='name'
                  className='h-40 w-full object-cover object-center'
                />
              </div>

              <div className='w-full overflow-hidden md:w-2/3 lg:w-2/3 xl:w-2/3 p-3'>
                <Link to={`/detail/${showNews._id}`}>
                  <h2 className='font-semibold'>{showNews.title}</h2>
                </Link>
                <p className='text-xs'>
                  published on {showNews.date.substring(0, 10)}
                </p>
                <p className='text-sm py-4 text-justify'>
                  {showNews.description.substring(0, 150)}...
                  <span className='font-semibold text-blue-800'>
                    <Link to={`/detail/${showNews._id}`}> Read More </Link>
                  </span>
                </p>
              </div>
            </div>
          );
        }
      });

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
        <div>
        <div className='mx-auto user-width '>
          {this.state.loading ? 
          (
          <div className='p-3 min-h-screen pb-5 flex-1 bg-color-hot'>
          {getNewsUser}
          </div>
          ) : 
          (
            <Lottie options={setLoattie} width={150} />
          )}
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
)(withRouter(ProfileNews));
