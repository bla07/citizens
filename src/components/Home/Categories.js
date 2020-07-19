import React, { Component } from "react";
import ScrollUpButton from "react-scroll-up-button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCategory } from "../../store/actions/getdetailcategoriesAction";
import Lottie from "react-lottie";
import ReactPlayer from "react-player";
import Moment from 'moment';

// Loading stuff
import Myloading from "../../assets/loading/201-simple-loader.json";

import "../../assets/scss/Categories.scss";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading : false
    }
  }

  componentDidMount = async () => {
    const category = this.props.match.params.category;
    await this.props.getCategory(category);
    this.setState({
      loading : true
    })
  }

  render() {

    const firstNews = this.props.categories[0];
    
    let sliceMydata = this.props.categories.slice(1);

    let filterCaterories = sliceMydata.filter(divide => divide.status === "Approved");

    const dataCategory = filterCaterories.map(categoryObj => {
      
      if(categoryObj.category[0] === "Video") {
        return (
          <div className="w-full overflow-hidden" key={categoryObj._id}>
          <div className="flex flex-wrap overflow-hidden p-8">
            <div className="w-full overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 p-3">
               <ReactPlayer 
               url={categoryObj.media.secure_url}      
               width="100%"
               height="130px" />
            </div>

            <div className="w-full overflow-hidden md:w-2/3 lg:w-2/3 xl:w-2/3 p-3">
                <h2 className="font-semibold"><Link to={`/videoDetail/${categoryObj._id}`}>{categoryObj.title}</Link></h2>
                <p className='text-sm font-bold pt-2'>
                  <Link to={`/user/${firstNews && firstNews.user._id}`}>
                    {firstNews && firstNews.user.fullname}
                  </Link>
                </p>
                <p className="text-xs">{firstNews && Moment(firstNews.date).format("dddd, MMMM Do YYYY")}</p>
                <p className="text-sm py-4 text-justify">{categoryObj.description.substring(0,65)} ... <span className="font-semibold text-blue-800"><Link to={`/videoDetail/${categoryObj._id}`}> Read More </Link></span></p>
            </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="flex flex-wrap overflow-hidden" key={categoryObj._id}>
          <div className="w-full overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 p-3">
              <img src={categoryObj.media.secure_url} className="h-40 w-full object-cover object-center"/>
          </div>
            <div className="w-full overflow-hidden md:w-2/3 lg:w-2/3 xl:w-2/3 p-3">
                <h2 className="font-semibold"><Link to={`/detail/${categoryObj._id}`}>{categoryObj.title}</Link></h2>
                <p className='text-sm font-bold pt-2'>
                  <Link to={`/user/${firstNews && firstNews.user._id}`}>
                    {firstNews && firstNews.user.fullname}
                  </Link>
                </p>
                <p className="text-xs">{firstNews && Moment(firstNews.date).format("dddd, MMMM Do YYYY")}</p>
                <p className="text-sm py-4 text-justify">{categoryObj.description.substring(0,65)} ... <span className="font-semibold text-blue-800"><Link to={`/detail/${categoryObj._id}`}> Read More </Link></span></p>
            </div>
          </div>
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
      <div className="bg-color-hot py-4">
      <ScrollUpButton 
        StopPosition={0}
        ShowAtPosition={150}
        EasingType='easeOutCubic'
        AnimationDuration={500}
        ContainerClassName='ScrollUpButton__Container'
        TransitionClassName='ScrollUpButton__Toggled'
        />
        <div className="width-category pt-12">
        <div className="flex flex-wrap overflow-hidden">

            <div className="w-full overflow-hidden md:w-3/4 lg:w-3/4 xl:w-3/4 p-4">
            {this.state.loading ? (           
              <div className="flex flex-wrap overflow-hidden p-4">
             
             {firstNews && firstNews.category[0] === "Video" ? (
                <div className="w-full overflow-hidden">
                  <ReactPlayer 
                    url={firstNews && firstNews.media.secure_url} 
                    width="100%"
                  />
                </div>
                ) : (
                  <div className="w-full overflow-hidden">
                  <img 
                    src={firstNews && firstNews.media.secure_url} 
                    className="image-style object-cover object-center"
                  />
                </div>
              )}

              <div className="w-full overflow-hidden py-4">
                <h1 className="font-bold text-gray-700">
                <Link to={`/videoDetail/${firstNews && firstNews._id}`}>
                {firstNews && firstNews.title}
                </Link>
                </h1>
                <p className='text-sm font-bold pt-2'>
                  <Link to={`/user/${firstNews && firstNews.user._id}`}>
                    {firstNews && firstNews.user.fullname}
                  </Link>
                </p>
                <p className="text-xs">{firstNews && Moment(firstNews.date).format("dddd, MMMM Do YYYY")}</p>
                <p className="text-sm py-4 text-justify">{firstNews && firstNews.description.substring(0,150)} ... <span className="font-semibold text-blue-800"><Link to={`/detail/${firstNews && firstNews._id}`}> Read More </Link></span></p>
                <hr/>
              </div>

              </div> ) : (<Lottie options={setLoattie} width={150} />)}

                {this.state.loading ? (  
                  <div>
                    {dataCategory}
                  </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                )}
                
              </div>

            <div className="w-full overflow-hidden md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">

            </div>
          </div>
        </div>
        

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories1.categories
  };
};

export default connect(
  mapStateToProps,
  { getCategory }
)(withRouter(Categories));
