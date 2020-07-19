import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "nuka-carousel";

import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../assets/loading/201-simple-loader.json";

import "../../assets/scss/Contribution.scss";

class Contribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTopContributor: [],
      loading: false
    };
  }

  getContribution = async () => {
    await axios({
      method: "GET",
      url: `https://citizensapp.herokuapp.com/api/v1/user/contributors`
    }).then(response => {
      this.setState({ listTopContributor: response.data.result });
    });
  };

  componentDidMount = async () => {
    await this.getContribution();
    this.setState({ loading: true });
  };

  render() {
    const topContributor = this.state.listTopContributor;

    const topUser = topContributor.map(check => {
      return (
        <div key={check._id._id}>
          <Link to={`/user/${check._id._id}`}>
            <div className='flex justify-center'>
              <img
                src={check._id.image.secure_url}
                alt='Some'
                className='w-24 h-24 flex self-center rounded-full shadow-lg mb-6 object-cover'
              />
            </div>
            <h3 className='text-center font-semibold'>{check._id.fullname}</h3>
          </Link>
          <div className='bg-gray-400 py-2 font-semibold mb-3 mt-3'>
            <h3 className='text-center'>
              Subscribers <span>{check._id.subscribers.length}</span>
            </h3>
          </div>
          <div className='bg-gray-400 py-2 font-semibold'>
            <h3 className='text-center'>
              Total News <span>{check.news.length}</span>
            </h3>
          </div>
          <div className='flex justify-center my-4'>
            <Link to={`/user/${check._id._id}`}>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded text-xs'>
                View
              </button>
            </Link>
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
      <div>
        <div className="pos-sticky w-1/4">
        <h3 className='text-center font-semibold py-4'>TOP CONTRIBUTOR</h3>
        {this.state.loading ? (
          <Carousel
            withoutControls={true}
            autoplay={true}
            transitionMode={"fade"}
            wrapAround = {true}
            className="p-4"
            >
            {topUser}
          </Carousel>
        ) : (
          <Lottie options={setLoattie} width={150} />
        )}
        </div>
      </div>
    );
  }
}

export default Contribution;
