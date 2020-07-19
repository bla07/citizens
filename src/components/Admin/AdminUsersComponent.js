import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllUser } from "../../store/actions/getalluserAction";
import setToken from "../../helpers/setToken";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "../../assets/scss/AdminUsersComponent.scss";

class AdminUsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    this.props.getAllUser();
  }

  handleDeletebyAdmin = async id => {
    const { token } = this.state;
    console.log(token);

    try {
      const response = await axios.delete(
        `https://citizensapp.herokuapp.com/api/v1/user/delete/${id}`,
        {
          Authorization: `Bearer ${token}`
        }
      );
      
      console.log(response.data.result);

      toast('User Deleted Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      
      this.props.getAllUser(this.props.allUser)
    } catch (error) {}
  };

  render() {

    const allUserData = this.props.allUser.map((users, index) => {
      if (users.isAdmin == false) {
        return (
          <tr className="hover:bg-grey-lighter" key={users._id}>
            <td className="py-4 px-6 border-b border-grey-light">{index + 1}</td>
            <td className="py-4 px-6 border-b border-grey-light">
              {users.fullname}
            </td>
            <td className="py-4 px-6 border-b border-grey-light">
              {users.username}
            </td>
            <td className="py-4 px-6 border-b border-grey-light text-sm">
              <h4 className="bg-transparent text-blue font-semibold py-1 px-2 border border-blue-500 rounded text-sm text-center">
                {users.news.length}
              </h4>
            </td>
            <td className="py-4 px-6 border-b border-grey-light flex pd-l-20 justify-center">
              <Link to={`/user/${users._id}`} target="_blank">
              <button 
                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-600 hover:bg-blue-700 text-white mx-2"
                >
                  View User
              </button>
              </Link>
              <button 
              className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-600 hover:bg-red-700 text-white"
              onClick={() => this.handleDeletebyAdmin(users._id)}>
                Delete
              </button>
            </td>
      
          </tr>
        );
      }

      else
        return null;
    });

    /* Count Total Contributor */
    let amountContributor = 0;
    this.props.allUser.map(user => {
      if (user.isAdmin == false)
        return amountContributor++
      else
        return null
    });

    let amountUser = this.props.allUser.map(totalContribution => {
      return (
        totalContribution.news.length      
      )
    })

    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    const dataContribution = arrSum(amountUser)
    

    return (
      <div className="bg-gray-800 h-screen w-full">
        <div className="w-4/5 mx-auto">

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

          <div className="text-5xl font-medium">
            <h1 className="font-bold py-8 pl-2 text-4xl text-white">Manage Users</h1>
            <div>
              <ul className="list-reset flex bg-transparent">
                <li className="py-3 px-4 text-center border-b-2 border-solid border-transparent border-teal bg-gray-100 mx-2 rounded total">
                  <div className="text-grey-darker no-underline hover:no-underline">
                    <div className="text-xxl text-light-coral tracking-tight text-teal">{ amountContributor }</div>
                    <div className="text-sm tracking-tight mb-1 text-light-coral text-bold">
                      Total Contributor
                    </div>
                  </div>
                </li>
                <li className="py-3 px-4 text-center border-b-2 border-solid border-transparent border-teal bg-gray-100 mx-2 rounded total">
                  <div className="text-grey-darker no-underline hover:no-underline">
                    <div className="text-xxl text-light-coral tracking-tight text-teal">{ dataContribution }</div>
                    <div className="text-sm tracking-tight mb-1 text-light-coral text-bold">
                      Total Contribution
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white shadow-md rounded mt-6 pb-6 bg-gray-100 scroll-admin">
            <table className="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                    NO
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                    Name
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                    Username
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                    Contribution
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{allUserData}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUser: state.getalluser1.allUser
  };
};

export default connect(
  mapStateToProps,
  { getAllUser }
)(withRouter(AdminUsersComponent));
