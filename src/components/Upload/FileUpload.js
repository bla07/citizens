import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { newsPostAction } from "../../store/actions/createnewsAction";
import ReactPlayer from "react-player";

import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../assets/loading/1127-success.json";


import UploadIllustration from "../../assets/img/6323.png";

import "../../assets/scss/FileUpload.scss";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      category: "",
      date: "",
      media: null,
      mediaShow: null,
      mediaValidate : false,
      validTitle : false,
      validDescription : false,
      validCategory : false,
      validDate : false,
      notif : false
    };
    this.mediaHandle = this.mediaHandle.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  mediaHandle = e => {
    this.setState({
      mediaShow: URL.createObjectURL(e.target.files[0]),
      media: e.target.files[0]
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.media === null) {
      this.setState({
        mediaValidate : true
      })
    } else {
      const fd = new FormData();
      fd.append(
        "image",
        this.state.media,
        this.state.media.name,
        this.state.media.type
      );
      const newsInput = {
        newsDesc: {
          title: this.state.title,
          description: this.state.description,
          category: this.state.category,
          date: this.state.date
        },
        image: fd
      };

      if (newsInput.newsDesc.title === "") {
        this.setState({
          validTitle : true
        })
      } else if (newsInput.newsDesc.category === "") {
        this.setState({
          validCategory : true
        }) 
      } else if (newsInput.newsDesc.date === "") {
        this.setState({
          validDate : true
        })  
      } else if (newsInput.newsDesc.description === "") {
        this.setState({
          validDescription : true
        }) 
      } else {
        await this.props.newsPostAction(newsInput);
        this.setState({
         notif : true
        })
        setTimeout(() => {
         this.props.history.push("/");
        }, 3000)
      }
    }

    setTimeout(() => {
      this.setState({
      mediaValidate : false,
      validTitle : false,
      validDescription : false,
      validCategory : false,
      validDate : false,
      })
    }, 2000)
  };

  render() {
    const { title, description, category, date } = this.state;

    const setLoattie = {
      loop: true,
      autoplay: true,
      animationData: Myloading,
      renderSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    let showVideo = this.state.media;

    return (
      <div className='bg-color-hot'>
        <div className='ab-width'>
          <form onSubmit={this.handleSubmit}>
            <div className='flex flex-wrap overflow-hidden'>
              <div className='w-full overflow-hidden md:w-full lg:w-2/5 xl:w-2/5 p-4'>
                {showVideo && showVideo.type === "video/mp4" ? (
                  <div className='image-upload border'>
                    <label htmlFor='img-input'>
                      <ReactPlayer
                        url={this.state.mediaShow}
                        width='100%'
                        height='250px'
                      />
                    </label>
                    <input
                      type='file'
                      onChange={this.mediaHandle}
                      id='img-input'
                      className='coba'
                    />
                  </div>
                ) : (
                  <div className='image-upload border'>
                    <label htmlFor='img-input'>
                      <img
                        className='object-cover cursor-pointer'
                        src={
                          this.state.mediaShow === null
                            ? UploadIllustration
                            : this.state.mediaShow
                        }
                        alt='your-pict'
                      />
                    </label>
                    <input
                      type='file'
                      onChange={this.mediaHandle}
                      id='img-input'
                      className='coba'
                    />
                  </div>
                )}

                {this.state.mediaValidate ?  
                (
                  <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-1 text-xs">
                    Warning
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700 text-xs">
                    <p>You need upload the image (png, jpg, jpeg) or video (mp4)</p>
                  </div>
                </div>
                ) 
                : 
                (null)}
              </div>
              <div className='w-full overflow-hidden md:w-full lg:w-3/5 xl:w-3/5 p-4'>
                <div className='flex flex-wrap justify-between w-full overflow-hidden'>
                  <h2 className='font-semibold mb-2 border-b-2 border-gray-400 text-gray-700 text-lg py-1'>
                    News Details
                  </h2>
                  <div>
                    <Link to='/'>
                      <button className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 mx-2 rounded focus:outline-none text-xs'>
                        Cancel
                      </button>
                    </Link>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-2 rounded focus:outline-none text-xs'
                      type='submit'>
                      Publish
                    </button>
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <div className='my-2'>
                    <label className='text-gray-700 text-lg font-bold'>
                      Title
                    </label>
                    <br />
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mt-2'
                      type='text'
                      autoComplete='off'
                      name='title'
                      value={title}
                      onChange={this.handleChange}
                    />
                    <div>
                      {this.state.validTitle ? 
                      ( <p className="text-red-500 text-xs italic">Please fill the title</p> ) : 
                      (null)}
                    </div>
                  </div>

                  <div className='py-2'>
                    <label className='text-gray-700 text-lg font-bold'>
                      Category
                    </label>
                    <br />
                  </div>
                  <div>
                    <select
                      onChange={this.handleChange}
                      name='category'
                      value={category}
                      className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none '>
                      <option value="" disabled={this.props.defaultDisabled ? true : null} >Choose Category</option>
                      <option defaultValue>News</option>
                      <option defaultValue>Lifestyle</option>
                      <option defaultValue>Food</option>
                      <option defaultValue>Tech</option>
                      <option defaultValue>Education</option>
                      <option defaultValue>Entertainment</option>
                      <option defaultValue>Video</option>
                    </select>
                    <div>
                    {this.state.validCategory ? 
                      (<p className="text-red-500 text-xs italic">Please select the category</p>  ) : 
                      (null)}
                    </div>
                  </div>

                  <div className='py-2'>
                    <label className='text-gray-700 text-lg font-bold'>
                      Date
                    </label>
                    <br />
                    <input
                      type='date'
                      min='1945-01-01'
                      max='2020-01-01'
                      name='date'
                      value={date}
                      onChange={this.handleChange}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  mt-2'
                    />
                     <div> 
                     {this.state.validDate? 
                      (<p className="text-red-500 text-xs italic">Please choose date</p>) : 
                      (null)}
                    </div>
                  </div>

                  <div className='py-2'>
                    <label className='text-gray-700 text-lg font-bold'>
                      Description
                    </label>
                    <br />
                    <textarea
                      type='text'
                      name='description'
                      value={description}
                      onChange={this.handleChange}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mt-2 h-64'
                    />
                    <div>
                    {this.state.validDescription? 
                      ( <p className="text-red-500 text-xs italic">Please fill description </p> ) : 
                      (null)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {this.state.notif ? 
        (
          <div className="for-modal shadow rounded">
          <div className="pop-up">
            <Lottie options={setLoattie} width="250px" height="150px" />
            <h2 className="text-center text-gray-700 text-lg">Thank you for creating the news.<br/> Please wait, we'll take care of it.</h2>
          </div>
        </div>
        ) : 
        (
          null
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataNews: state.createnews1.dataNews
  };
};

export default connect(
  mapStateToProps,
  { newsPostAction }
)(withRouter(FileUpload));
