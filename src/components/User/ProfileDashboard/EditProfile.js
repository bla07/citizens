import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import setToken from "../../../helpers/setToken";
import { connect } from "react-redux";
import { getDetailUser } from "../../../store/actions/getdetailuserAction";

// import User from '../assets/img/user.svg'

import "../../../assets/scss/EditProfile.scss";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullname: "",
      birthday: "",
      gender: "",
      address: "",
      token: "",
      myProfile: null,
      showProfile : null,
      successChangePict : false,
      alertPict : false,

      alertFullname : false,
      alertBirthday : false,
      alertGender : false,
      alertAddress : false,
      successChangeData : false

    };
  }

  componentDidMount() {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const id = this.props.match.params.id;
    this.props.getDetailUser(id);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { email, gender, birthday, fullname, address } = this.state;
    if (this.state.fullname === "") {
      this.setState({
        alertFullname : true
      })
    } else if (this.state.birthday === "") {
      this.setState({
        alertBirthday : true
      })
    } else if (this.state.gender === "") {
      this.setState({
        alertBirthday : true
      })
    } else if (this.state.address === "") {
      this.setState({
        alertAddress : true
      })
    } else {
      try {
        const response = await axios.put(
          `https://app-citizenjournalism.herokuapp.com/api/v1/user/update`,
          {
            emai: email,
            gender: gender,
            birthday: birthday,
            fullname: fullname,
            address: address
          }
        );
        console.log(response.data);
      } catch (error) {}

      this.setState ({
        successChangeData : true
      })
      setTimeout(() => {
        this.props.history.push(
          `/user/${this.props.getDetailUser(this.props.details.user._id)}`
        );
      }, 1500)
    }
    setTimeout(() => {
      this.setState({
        alertFullname : false,
        alertBirthday : false,
        alertGender : false,
        alertAddress : false,
        successChangeData : false
      })
    }, 2000)
  };

  handlerChangePict = e => {
    this.setState({
      showProfile : URL.createObjectURL(e.target.files[0]),      
      myProfile: e.target.files[0]
    });
  };

  handlePictProfile = async e => {
    e.preventDefault();

    if(this.state.myProfile === null) {
      this.setState({
        alertPict : true
      })
    } else {
      const fd = new FormData();
      fd.append(
        "image",
        this.state.myProfile,
        this.state.myProfile.name,
        this.state.myProfile.type
      );
      await axios.put(
        `https://app-citizenjournalism.herokuapp.com/api/v1/user/photo`,
        fd,
        {
          onUploadProgress: progressEvent => {
            console.log(
              "upload progress = :" +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          }
        }
      );
      this.setState({
        successChangePict : true
      })
    }
    setTimeout(() => {
      this.setState({
        alertPict : false,
        successChangePict : false
      })
    }, 2000)
  };

  render() {
    const accountEdit = this.props.details.user;

    const { email, fullname, birthday, address } = this.state;

    return (
      <div>
        <div className='ab-width'>
          <div className='flex flex-wrap overflow-hidden'>
            <div className='w-full overflow-hidden lg:w-1/5 xl:w-1/5 p-4 shadow'>
              <ul>
                <li className='my-2 font-semibold text-sm relative'><Link to={`/editprofile/${accountEdit && accountEdit._id}`}>Edit Profile</Link></li>
                <li className='my-2 font-semibold text-sm realtive'><Link to={`/editprofile/${accountEdit && accountEdit._id}/delete-account`}>Delete Account</Link></li>
              </ul>
            </div>
            
            <div className='w-full overflow-hidden lg:w-4/5 xl:w-4/5 py-4 px-12'>
              <div className='mb-12 mt-4'>
              {this.state.successChangeData ? 
              (
                <div className="flex items-center bg-blue-500 text-white text-xs font-bold px-2 py-2 rounded my-2 w-1/4 mx-auto" role="alert">
                <p>Change success</p>
                </div>
              ) : (null)}
                <form>
                  <div className='flex flex-wrap image-upload'>
                    <label htmlFor='img-input'>
                      <img
                        className='h-24 w-24 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6 object-cover cursor-pointer'
                        src={this.state.showProfile !== null ? this.state.showProfile : accountEdit && accountEdit.image.secure_url}
                        alt='your-pict'
                      />
                    </label>
                    <input
                      type='file'
                      id='img-input'
                      className='coba'
                      onChange={this.handlerChangePict}
                    />
                    <div className="my-auto ml-6">
                      <h1 className="text-3xl font-semibold font-serif" >{accountEdit && accountEdit.fullname}</h1>
                      <button
                      className='bg-transparent border hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded text-xs '
                      onClick={this.handlePictProfile}>
                      Save Image
                      </button>
                      {this.state.alertPict ? 
                      (
                      <div className="flex items-center bg-red-500 text-white text-xs font-bold px-2 py-2 rounded my-2" role="alert">
                      <p>Please choose your image!</p>
                      </div>
                      ) 
                      : 
                      (null)}
                      {this.state.successChangePict ? 
                      (
                        <div className="flex items-center bg-blue-500 text-white text-xs font-bold px-2 py-2 rounded my-2" role="alert">
                        <p>Change picture success</p>
                      </div>
                      ) 
                      : 
                      (null)}
                    </div>
                  </div>
                </form>
              </div>

              <div>
                <form className='edit-form' onSubmit={this.handleSubmit}>
                  <div className='md:flex md:items-center mb-6'>
                    <div className='w-1/6'>
                      <label
                        className='block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4'
                        htmlFor='inline-full-name'>
                        Email
                      </label>
                    </div>
                    <div className='w-5/6'>
                      <input
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='inline-full-name'
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        placeholder='Email'
                        autoComplete='off'
                      />
                    </div>
                  </div>

                  <div className='md:flex md:items-center mb-6'>
                    <div className='w-1/6'>
                      <label
                        className='block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4'
                        htmlFor='inline-full-name'>
                        Full Name
                      </label>
                    </div>
                    <div className='w-5/6'>
                      <input
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        type='text'
                        name='fullname'
                        value={fullname}
                        onChange={this.handleChange}
                        placeholder='Full Name'
                        autoComplete='off'
                      />
                      {this.state.alertFullname ? <p className="text-red-500 text-xs italic">Name should be fill</p>: null}
                    </div>
                  </div>

                  <div className='md:flex md:items-center mb-6'>
                    <div className='w-1/6'>
                      <label
                        className='block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4'
                        htmlFor='inline-full-name'>
                        Birthday
                      </label>
                    </div>
                    <div className='w-5/6'>
                      <input
                        type='date'
                        min='1945-01-01'
                        max='2020-01-01'
                        name='birthday'
                        value={birthday}
                        onChange={this.handleChange}
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                      />
                        {this.state.alertBirthday ? <p className="text-red-500 text-xs italic">Birthday should be fill</p>: null}
                    </div>
                  </div>

                  <div className='md:flex md:items-center mb-6'>
                    <div className='w-1/6'>
                      <label
                        className='block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4'
                        htmlFor='inline-full-name'>
                        Gender
                      </label>
                    </div>
                    <div className='flex col-3 radio text-white'>
                      <label htmlFor='opt1' className='text-gray-600 radio px-3'>
                        <input
                          type='radio'
                          name='gender'
                          value='M'
                          onChange={this.handleChange}
                          className='hidden'
                          id='opt1'
                        />
                        <span className='label'></span>Male
                      </label>
                      <label htmlFor='opt2' className='text-gray-600 radio px-3'>
                        <input
                          type='radio'
                          name='gender'
                          value='F'
                          onChange={this.handleChange}
                          className='hidden'
                          id='opt2'
                        />
                        <span className='label'></span>Female
                      </label>
                    </div>
                    {this.state.alertGender ? <p className="text-red-500 text-xs italic">Gender should be fill</p>: null}
                  </div>

                  <div className='md:flex md:items-center mb-6'>
                    <div className='w-1/6'>
                      <label
                        className='block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4'
                        htmlFor='inline-full-name'>
                        Addres
                      </label>
                    </div>
                    <div className='w-5/6'>
                      <textarea
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        type='text'
                        name='address'
                        onChange={this.handleChange}
                        value={address}
                        placeholder='Addres'
                      />
                      {this.state.alertAddress ? (<p className="text-red-500 text-xs italic">Form should be fill</p>):( null)}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded text-xs'
                      type='submit'>
                      Submit
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
    details: state.user1.detailUser
  };
};

export default connect(
  mapStateToProps,
  { getDetailUser }
)(withRouter(EditProfile));
