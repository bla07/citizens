import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Moment from 'moment';
import { getVideo } from "../../store/actions/getvideoAction";

import "../../assets/scss/GridVideo.scss";

class GridVideo extends Component {
  componentDidMount() {
    this.props.getVideo();
  }

  render() {
    
    let filterData = this.props.allVideo.filter(saring => saring.status === "Approved");
    
    let videoCitizens = filterData.slice(0,4)
    
    const videos = videoCitizens.map(vidZens => {
      console.log(vidZens)
      return (
          <div className="w-1/2 overflow-hidden p-3" key={vidZens._id}>
          <div className="w-full overflow-hidden">
          <ReactPlayer
              url={vidZens.media.secure_url}
              width="100%"
              height="230px"
            />
          </div>

            <div className="w-full overflow-hidden">
              <Link to={`/videoDetail/${vidZens._id}`}>
                <h1 className="font-semibold">{vidZens.title}</h1>
              </Link>
              <p className='text-sm font-bold pt-2'>
                <Link to={`/user/${vidZens.user._id}`}>
                  {vidZens.user.fullname}
                </Link>
              </p>
              <p className="text-xs">{ Moment(vidZens.date).format("dddd, MMMM Do YYYY") }</p>
            </div>
          </div>          
      )
    })

    return (
      <div className="bg-color-hot py-4">
        <div className="flex flex-wrap overflow-hidden">

        <div className="w-full flex flex-wrap overflow-hidden">
          {videos}
        </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allVideo: state.video1.allVideo
  };
};

export default connect(
  mapStateToProps,
  { getVideo }
)(withRouter(GridVideo));
