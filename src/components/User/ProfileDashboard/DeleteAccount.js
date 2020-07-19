import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import setToken from "../../../helpers/setToken";
import { connect } from "react-redux";
import { getDetailUser } from "../../../store/actions/getdetailuserAction";

// import User from '../assets/img/user.svg'

import "../../../assets/scss/EditProfile.scss";

class DeleteAccount extends Component {
  state = {
    token : "",
    handleModal : false,
    handleCloseModal : false
  }

  componentDidMount() {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const id = this.props.match.params.id;
    this.props.getDetailUser(id);
  }

  handleModal = () => {
    this.setState({
      handleModal : true
    })
  }

  handleCloseModal = () => {
    this.setState({
      handleModal : false
    })
  }

  handleDeleteByUser = async () => {

    if (localStorage.token) {
      setToken(localStorage.token);
    }

    let tokenCheck = localStorage.token;

    try {
      const response = await axios.delete(
        `https://app-citizenjournalism.herokuapp.com/api/v1/user/delete`,
        {
          Authorization: `Bearer ${tokenCheck}`
        }
      );
      // alert("Are you sure?");
      console.log(response.data.result);
      alert("Delete Account Succes")
      localStorage.clear();
      this.props.history.push("/")
    } catch (error) { }
  };

  render() {
    const accountEdit = this.props.details.user;

    return (
      <div className='bg-color-hot'>
        <div className='ab-width'>
          <div className='flex flex-wrap overflow-hidden '>
            <div className='w-full overflow-hidden lg:w-1/5 xl:w-1/5 p-4'>
            <ul>
                <li className='my-2 font-semibold text-sm'><Link to={`/editprofile/${accountEdit && accountEdit._id}`}>Edit Profile</Link></li>
                <li className='my-2 font-semibold text-sm'><Link to={`/editprofile/${accountEdit && accountEdit._id}/delete-account`}>Delete Account</Link></li>
              </ul>
            </div>
            
            <div className='w-full overflow-hidden lg:w-4/5 xl:w-4/5 py-4 px-12'>
              <div className='mb-12 mt-4'>
                  <div className='flex flex-wrap image-upload'>
                    <label htmlFor='img-input'>
                      <img
                        className='h-24 w-24 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6 object-cover'
                        src={accountEdit && accountEdit.image.secure_url}
                        alt='your-pict'
                      />
                    </label>
                    <div className="my-auto ml-6">
                      <h1 className="text-3xl font-semibold font-serif" >{accountEdit && accountEdit.fullname}</h1>
                    </div>
                  </div>
              </div>

              <div>
              
                <div className='btn-delete'>
                  <button
                    className='bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 mb-12 rounded text-xs'
                    onClick={this.handleModal}>
                    Delete Account
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {this.state.handleModal ? 
        (
          <div className="back-modal">
          <div className="bg-gray-500 delete-account mx-auto p-6">
            <h2 className="text-center p-4">Are you sure?</h2>
            <div className="flex justify-around p-4">
            <button className="text-xs bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
            onClick={this.handleCloseModal}
            >Cancel</button>
            <button className="text-xs bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            onClick={this.handleDeleteByUser}
            >Yes</button>
            </div>
          </div>
          </div>
        ) 
        : 
        (
          null
        )}

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
)(withRouter(DeleteAccount));
