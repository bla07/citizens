import React, { Component } from "react";
import axios from "axios";
import setToken from '../../helpers/setToken';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getNews } from "../../store/actions/getnewsAction";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "../../assets/scss/AdminNewsComponent.scss";

class AdminNewsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
    };
  }

  componentDidMount() {
    if(localStorage.token){
      setToken(localStorage.token)
    }
    this.props.getNews();
  }

  handlePublish = async (id) =>{
    const {token} = this.state

    try{
      const response = await axios.put(
        `https://citizensapp.herokuapp.com/api/v1/news/status/${id}`,{
          Authorization : `Bearer ${token}`,
          status : "Approved"
        }
      );

      this.props.getNews(this.props.news)

      toast('News Approved Successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

    } catch(error){
      toast('Failed to Approve News', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      console.log(error.response)
    }
  }

  handleReject = async (id) =>{
    const {token} = this.state

    try{
      const response = await axios.put(
        `https://citizensapp.herokuapp.com/api/v1/news/status/${id}`,{
          Authorization : `Bearer ${token}`,
          status : "Rejected"
        }
      );

      toast.success('News Rejected Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      
      this.props.getNews(this.props.news)
    } catch(error){
      toast.error('Failed to Reject News', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      console.log(error.response)
    }
  }

  render() {
    const dataNews = this.props.news.map(data => {
      if (data.status === "Pending") {
        return (
          <tr className="hover:bg-grey-lighter" key={data._id}>
            <td className="py-4 px-4 border-b border-grey-light text-sm font-bold text-capitalize">
              {data.user.username}
            </td>
            <td className="py-4 px-6 border-b border-grey-light text-sm">
              {data.title}
            </td>
            <td className="py-4 px-6 border-b border-grey-light text-sm">
              <h4 className="bg-transparent text-pumpkin font-semibold py-1 px-2 border border-yellow-500 rounded text-sm text-center">
                {data.status}
              </h4>
            </td>
            <td className="py-4 text-center border-b border-grey-light text-sm">
              {data.date.substring(0, 10)}
            </td>
            <td className="py-4 px-6 border-b border-grey-light flex pd-l-10 justify-center">
              <Link to={`/detail/${data._id}`} target="_blank" >
              <button 
                className="text-grey-lighter font-bold py-1 px-2 rounded text-xs bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Detail
              </button>
              </Link>
              <button 
                className="text-grey-lighter font-bold py-1 px-2 rounded text-xs bg-green-600 hover:bg-green-700 mx-2 text-white"
                onClick={() => this.handlePublish(data._id)}
                >
                Publish
              </button>
              <button 
              className="text-grey-lighter font-bold py-1 px-2 rounded text-xs bg-red-600 hover:bg-red-700 text-white"
              onClick={() => this.handleReject(data._id)}
              >
                Reject
              </button>
            </td>
          </tr>
        );
      }

      else
        return null;
    });

    /* Count Total News */
    const amountData = this.props.news.map(total => {
      return total.length;
    });

    /* Count Total Pending News */
    let pendingTotal = 0;
    this.props.news.map(data => {
      if (data.status === "Pending")
        return pendingTotal++
      else
        return null
    });

    /* Count Total Reported News */
    let reportTotal = 0;
    this.props.news.map(data => {
      if (data.total_report !== 0)
        return reportTotal++
      else
        return null
    });

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
            <h1 className="font-bold py-8 pl-2 text-white text-5xl">Dashboard</h1>
            <div>
              <ul className="list-reset flex bg-transparent ">
                <li className="py-3 px-4 text-center border-b-2 border-solid border-transparent border-teal bg-gray-100 mx-2 rounded total">
                  <div className="text-grey-darker no-underline hover:no-underline">
                    <div className="text-xxl text-light-coral tracking-tight text-teal">{amountData.length}</div>
                    <div className="text-sm tracking-tight mb-1 text-light-coral text-bold">
                      Total News
                    </div>
                  </div>
                </li>
                <li className="py-3 px-4 text-center border-b-2 border-solid border-transparent border-teal bg-gray-100 mx-2 rounded total">
                  <div className="text-grey-darker no-underline hover:no-underline">
                    <div className="text-xxl text-pumpkin tracking-tight text-teal">{ pendingTotal }</div>
                    <div className="text-sm tracking-tight mb-1 text-pumpkin text-bold">
                      Total Pending
                    </div>
                  </div>
                </li>
                <li className="py-3 px-4 text-center border-b-2 border-solid border-transparent border-teal bg-gray-100 mx-2 rounded total">
                  <div className="text-grey-darker no-underline hover:no-underline">
                    <div className="text-xxl text-grey-500 tracking-tight text-teal">{ reportTotal }</div>
                    <div className="text-sm tracking-tight mb-1 text-grey-500 text-bold">
                      Total Reported
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
                  <th className="py-4 px-6 bg-light-coral font-bold uppercase text-sm text-white border-b border-grey-light text-center">
                    Author
                  </th>
                  <th className="py-4 px-6 bg-light-coral font-bold uppercase text-sm text-white border-b border-grey-light text-center">
                    Title
                  </th>
                  <th className="py-4 px-6 bg-light-coral font-bold uppercase text-sm text-white border-b border-grey-light text-center">
                    Status
                  </th>
                  <th className="py-4 px-6 bg-light-coral font-bold uppercase text-sm text-white border-b border-grey-light text-center">
                    Date
                  </th>
                  <th className="py-4 px-6 bg-light-coral font-bold uppercase text-sm text-white border-b border-grey-light text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{dataNews}</tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.getnews1.news
  };
};

export default connect(
  mapStateToProps,
  { getNews }
)(withRouter(AdminNewsComponent));
