import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Lottie from "react-lottie";

// Loading stuff
import Myloading from "../../assets/loading/201-simple-loader.json";

import "../../assets/scss/CardHotNews.scss";

class CardHotNews extends Component {
  constructor(props) {
    super (props);

    this.state ={
      trends : [],
      loading : false
    }
  }


  getTrending = async () =>{
    await axios({
      mehod : "GET",
      url : `https://citizensapp.herokuapp.com/api/v1/news/popular`
    }).then(response => {
      this.setState({trends : response.data.result});
      this.setState({loading : true})
    });
  };

  componentDidMount = async () => {
    await this.getTrending()

  }

  render() {
    let trendSlice = this.state.trends
    
    let sliceNow = trendSlice.slice(0,10)

    const showTrends = sliceNow && sliceNow.map((helloTrends, index) => {
      let getVideoTrends = helloTrends._id.media.secure_url.split(".")

      if (getVideoTrends[3] === "mp4"){
        return (
          <li className="my-3" key={helloTrends._id._id}>
          <div className="flex flex-wrap overflow-hidden">
            <div className="p-1 w-1/6 overflow-hidden sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 text-base">
              {index + 1}
            </div>
            <div className="w-5/6 overflow-hidden no-underline hover:underline text-base sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
              <Link to={`/videoDetail/${helloTrends._id._id}`}>{helloTrends._id.title} </Link>
            </div>
          </div>
          </li>
        )
      } else {
        return (
          <li className="my-3" key={helloTrends._id._id}>
          <div className="flex flex-wrap overflow-hidden">
            <div className="p-1 w-1/6 overflow-hidden sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 text-base">
              {index + 1}
            </div>
            <div className="w-5/6 overflow-hidden no-underline hover:underline text-base sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
              <Link to={`/detail/${helloTrends._id._id}`}>{helloTrends._id.title} </Link>
            </div>
          </div>
          </li>
        )
      }
    })

    const setLoattie = {
      loop: true,
      autoplay: true,
      animationData: Myloading,
      renderSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };


    return (
      <div className="bg-color-hot mt-4">
        <div className="p-2 border rounded">
          <h3 className='text-center font-semibold py-4'>TRENDING NEWS</h3>
          <div className="flex flex-wrap overflow-hidden">
            <ol className="w-full mx-auto">
              {this.state.loading ? (
                <>
                {showTrends}
                </>
              ) : ( <Lottie options={setLoattie} width={150} /> )}
            </ol>
          </div>        
        </div>
      </div>
    );
  }
}


export default (withRouter(CardHotNews));
