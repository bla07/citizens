import React, { Component } from "react";
import axios from "axios";
import ScrollUpButton from "react-scroll-up-button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDetail } from "../../store/actions/getdetailAction";
import setToken from "../../helpers/setToken";
import Moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../assets/loading/201-simple-loader.json";

import 'react-toastify/dist/ReactToastify.css';
import "../../assets/scss/Detail.scss";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      comment: "",
      loading: false
    };
  }

  componentDidMount = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const id = this.props.match.params.id;
    await this.props.getDetail(id);
    this.setState({ loading: true });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleComment = async e => {
    e.preventDefault();

    const { comment, token } = this.state;

    try {
      const response = await axios.post(
        `https://citizensapp.herokuapp.com/api/v1/comment/add`,
        {
          Authorization: `Bearer ${token}`,
          news_id: this.props.details._id,
          comment: comment
        }
      );

      this.setState({
        comment: ""
      });

      toast('Comment posted successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      this.props.getDetail(this.props.match.params.id);
    } catch (error) {
      console.log(error)

      toast('Failed to Post Comment', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  render() {
    // console.log(this.props.details);
    const {
      title,
      description,
      category,
      user,
      date,
      media,
      listComment
    } = this.props.details;

    // show list comment
    const commentList = listComment.map(comment => {
      return (
        <div className='sm:flex sm:items-top px-6 py-4' key={comment._id}>
          <img
            className='block h-8 w-12 sm:h-12 rounded-full mb-4 sm:mb-0 sm:mr-4 sm:ml-0 mt-2 object-cover object-center'
            src={comment.user_id.image.secure_url}
            alt='profile-pict'
          />
          <div className='sm:text-left sm:flex-grow'>
            <div>
              <p className='text-md font-semibold leading-tight py-2'>
                { comment.user_id.fullname == 'Admin' ? 'System Administrator' : comment.user_id.fullname }{" "}
              </p>
              <div>
                <p className='text-sm leading-tight text-grey-dark text-justify'>
                  {comment.comment}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
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
      <div className='bg-color-hot top-detail'>
      <ToastContainer
        className="text-sm text-bold"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />

      <ScrollUpButton 
        StopPosition={0}
        ShowAtPosition={150}
        EasingType='easeOutCubic'
        AnimationDuration={500}
        ContainerClassName='ScrollUpButton__Container'
        TransitionClassName='ScrollUpButton__Toggled'
        />
        {this.state.loading ? (
          <div className='flex flex-wrap overflow-hidden text-container container mx-auto'>
            <div className='flex flex-wrap overflow-hidden'>
              <div className='w-full overflow-hidden title-style'>
                <h3 className='text-blue-500 font-semibold mb-2 border-b-2 border-gray-400'>
                  {category}
                </h3>
                <h1 className='font-semibold font-serif text-4xl my-6'>
                  {title}
                </h1>
              </div>

              <div className='w-full overflow-hidden'>
                <img
                  src={media.secure_url}
                  alt={title}
                  className='w-full h-full my-4 object-cover object-center media'
                />
              </div>

              <div className='w-full overflow-hidden article-style'>
                <img
                  src={ user.image.secure_url }
                  alt={ user && user.username.charAt(0).toUpperCase() + user.username.slice(1) }
                  className='w-10 h-10 flex self-center rounded-full shadow-lg object-cover'
                />
                <h2 className='font-bold my-1 text-gray-700'>
                  <Link to={`/user/${user._id}`}>
                    { user && user.username.charAt(0).toUpperCase() + user.fullname.slice(1) }
                  </Link>
                </h2>
                <h3 className='text-xs text-gray-600 font-normal mb-6'>
                  { Moment(date).format("dddd, MMMM Do YYYY") }
                </h3>
                <article>{description}</article>
              </div>
            </div>

            {/* comment section */}
            <div className='container mx-auto w-full overflow-hidden d-detail'>
              <hr />
              <h1 className='container mt-4 text-base font-semibold'>
                Comments
              </h1>
              {localStorage.getItem("token") !== null ? (
                <div>
                  <form
                    className='container ml-auto my-2'
                    onSubmit={this.handleComment}>
                    <div className='col-3'>
                      <input
                        className='effect-1'
                        type='text'
                        placeholder='insert your comment here...'
                        autoComplete ="off"
                        name='comment'
                        value={this.state.comment}
                        onChange={this.handleChange}
                      />
                    </div>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-xs ml-2 float-right'
                      type='submit'>
                      Post
                    </button>
                  </form>
                </div>
              ) : ('')}
            </div>
            <div className='w-full overflow-hidden mb-4'>{commentList}</div>

          </div>
        ) : (
          <Lottie options={setLoattie} width={150} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.getdetail1.details
  };
};

export default connect(
  mapStateToProps,
  { getDetail }
)(withRouter(Detail));
