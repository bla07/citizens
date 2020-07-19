import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import {
  getUserNews
} from "../../store/actions/getdetailuserAction";
import ReactPlayer from "react-player";
import setToken from "../../helpers/setToken";
import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../assets/loading/291-searchask-loop.json";

import Logo2 from "../../assets/img/Logo2.png";
import User1 from"../../assets/img/user1.png"

import { connect } from "react-redux";

import "../../assets/scss/HeadCategory.scss";


class HeadCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      tokenCheck :"", 
      status: "Approved",
      newsSearch: [],
      openModal : false
    };
  }


  componentDidMount = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    await this.props.getUserNews();
    this.setState({
      loading : true
    })
  }

  removeToken = async () => {
    await localStorage.clear();
    window.location.reload(true);
    this.props.history.push("/");
  };


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = async e => {
    e.preventDefault();
    const { query, status } = this.state;
    try {
      await axios
        .get(
          `https://citizensapp.herokuapp.com/api/v1/news/find-news?status=${status}&title=${query}`
        )
        .then(response => {
          this.setState({
            newsSearch : response.data.result
          });
        });
        this.setState({
          query : "",
          openModal : true,
        })
    } catch (error) {}  
  };

  handleCloseModal = (e) => {
    e.preventDefault();
    this.setState({
      openModal : false,
    })
  }


  render() {

    const setLoattie = {
      loop: true,
      autoplay: true,
      animationData: Myloading,
      renderSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    const mySearch = this.state.newsSearch.map(findNews => {

      if (findNews.category[0] === "Video") {
        return (
          <div
          className='flex flex-wrap overflow-hidden p-2 my-4 rounded'
          key={findNews._id}>
          <div className='w-full overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 p-3'>
            <ReactPlayer
              url={findNews.media.secure_url}
              width='100%'
              height='115px'
            />
          </div>
          <div className='w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-3'>
            <Link to={`/videoDetail/${findNews._id}`}>
              <h3 className='font-semibold'>{findNews.title}</h3>
            </Link>
            <p className='text-xs'>
              published on<span>{findNews.date.substring(0, 10)}</span>
            </p>
            <p className='text-sm py-4 text-justify'>
              {findNews.description.substring(0, 110)}...
              <span className='font-semibold text-blue-800'> <Link to={`/videoDetail/${findNews._id}`}> Read More </Link>
              </span>
            </p>
          </div>
        </div>
        )
      } else {
        return (
          <div
          className='flex flex-wrap overflow-hidden p-2 my-4 rounded'
          key={findNews._id}>
          <div className='w-full flex justify-center overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 p-3'>
          <img
              src={findNews.media.secure_url}
              alt='name'
              className='h-32 w-48 object-cover object-center'
            />
          </div>
          <div className='w-full overflow-hidden md:w-2/3 lg:w-2/3 xl:w-2/3 p-3'>
             <Link to={`/detail/${findNews._id}`}>
              <h3 className='font-semibold'>{findNews.title}</h3>
              </Link>
            <p className='text-xs'>
              published on<span> {findNews.date.substring(0, 10)}</span>
            </p>
            <p className='text-sm py-4 text-justify'>
              {findNews.description.substring(0, 110)}...
              <span className='font-semibold text-blue-800'> <Link to={`/detail/${findNews._id}`}> Read More </Link>
              </span>
            </p>
          </div>
        </div>
        );
      }
    }
    )

    const profileNews = this.props.userNews
    const userPict = this.props.userNews.image && this.props.userNews.image.secure_url

    return (
      <div>
        <header className='lg:px-16 px-8 py-4 md:py-0 top-0 nav-color shadow'>
          <div className='container mx-auto flex flex-wrap items-center'>
            <div className='flex-1 flex items-center'>
              <ul className='flex mr-8'>
                {localStorage.getItem("token") !== null ? (
                  <>
                    <li className='mx-2 text-xs'>
                      <div className='flex flex-col'>
                        <div>
                          <div className='flex justify-center'>
                          <Link to={`/profile/${profileNews && profileNews._id}`}>
                            <img
                              src={this.props.userPict === null ? User1 : userPict}
                              alt='Some'
                              className='w-10 h-10 flex self-center rounded-full shadow-lg object-cover'
                            />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className='mx-2 text-xs menu-down'>
                      <div className='dropdown'>
                        <div className='projects'>
                          <button>
                            <i className='fas fa-sort-down'></i>
                          </button>
                          <ul className='shadow'>
                            <li className='border-b py-3 font-bold'>
                              <Link to='/dashboard'>
                                <h1 className='text-center'>Administrator Dashboard</h1>
                              </Link>
                            </li>
                            <li>
                              <button
                                className='bg-blue-500 text-blue-500 font-bold'
                                onClick={this.removeToken}>
                                Log Out
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='mx-2 text-xs'>
                      <div>
                        <Link to='/login'>
                          <button className='bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>
                            Login
                          </button>
                        </Link>
                      </div>
                    </li>
                  </>
                )}
              </ul>
              <Link to='/'>
                <img
                  src={Logo2}
                  alt='Logo-Citizens'
                  className='w-24 py-4 block'
                />
              </Link>
            </div>

            <label
              htmlFor='menu-toggle'
              className='pointer-cursor md:hidden block'>
              <svg
                className='fill-current text-gray-800 hover:text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'>
                <title>menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
              </svg>
            </label>
            <input className='hidden' type='checkbox' id='menu-toggle' />

            <div
              className='hidden md:flex md:items-center md:w-auto w-full text-black'
              id='menu'>
              <nav>
                <ul className='md:flex items-center justify-between text-base pt-4 md:pt-0'>
                  <div className='for-response font-medium'>
                    <li className='action'>
                      <Link
                        to={`/category/News`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-base get-login'>
                        News
                      </Link>
                    </li>

                    <li className='action'>
                      <Link
                        to={`/category/Education`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-sm text-base get-login'>
                        Education
                      </Link>
                    </li>

                    <li className='action'>
                      <Link
                        to={`/category/Tech`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-sm text-base get-login'>
                        Tech
                      </Link>
                    </li>

                    <li className='action'>
                      <Link
                        to={`/category/Food`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-sm text-base get-login'>
                        Food
                      </Link>
                    </li>

                    <li className='action'>
                      <Link
                        to={`/category/Lifestyle`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-sm text-base get-login'>
                        Lifestyle
                      </Link>
                    </li>

                    <li className='action'>
                      <Link
                        to={`/category/Entertainment`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-sm text-base get-login'>
                        Entertainment
                      </Link>
                    </li>

                    <li className='action'>
                      <Link
                        to={`/category/Video`}
                        target='_blank'
                        className='md:px-4 md:py-4 px-0 block text-sm text-base get-login'>
                        Video
                      </Link>
                    </li>
                  </div>
                  
                  <li className='md:px-2 py-4 px-0 block search-bar-style'>
                    <form id='demo-2' onSubmit={this.handleSearch}>
                      <input
                        type='search'
                        placeholder='Search'
                        name='query'
                        value={this.state.query}
                        onChange={this.handleChange}
                        autoComplete='off'
                        className='mx-4'
                      />
                    </form>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {this.state.openModal ? ( 
          <div className="for-Searchnews">
          <div className="back-modal1">
          <div className="width-modal-head rounded">
            <button onClick={this.handleCloseModal} className="fixed" ><i className="fas fa-times-circle"></i></button>
              {this.state.newsSearch !== undefined ? (
                <div className="pop-up">
                  {mySearch}
                </div>
              ) : ( <Lottie options={setLoattie} width={50} /> )}
            </div>
          </div>
          </div>
        ) : ( null )}
      </div>
    );
  }
}

const mapSTateToProps = state => {
  return {
    token: state.login1.token,
    isAuthenticated: state.login1.isAuthenticated,
    userNews: state.user1.userNews
  };
};

export default connect(
  mapSTateToProps, 
  { getUserNews }
  )(withRouter(HeadCategory));

