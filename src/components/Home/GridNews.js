import React, { Component } from "react";
import Moment from 'moment';
import "moment-timezone";
import Lottie from "react-lottie";
import ScrollUpButton from "react-scroll-up-button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getNews } from "../../store/actions/getnewsAction";

import Contribution from "./Contribution";
import GridVideo from "./GridVideo";
import CardHotNews from "./CardHotNews"

// Loading stuff
import Myloading from "../../assets/loading/201-simple-loader.json";

import "../../assets/scss/GridNews.scss";

class GridNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryCheck: "",
      loading: false
    };
  }

  componentDidMount = async () => {
    await this.props.getNews();
    this.setState({ loading: true });
  };

  onLinkClick = () => {
    window.open(`https://play.google.com/store/apps/details?id=com.glints.citizens`, "_blank");
}


  render() {
    let dataAllnews = this.props.news;

    let cateNews = dataAllnews.filter(newsFil => newsFil.status === "Approved");

    // News Data
    let newsFilter = cateNews.filter(
      checkNews => checkNews.category[0] === "News"
    );

    let sliceNews = newsFilter.slice(1, 4);

    const newsData = sliceNews.map(newspro => {
      return (
        <div
          className='w-full overflow-hidden border-b-2 border-gray-400'
          key={newspro._id}>
          <Link to={`/detail/${newspro._id}`}>
            <h2 className='font-semibold my-4 font-serif'>{newspro.title}</h2>
          </Link>
        </div>
      );
    });

    // Lifestyle Data
    let lifeFilter = cateNews.filter(
      checkNews => checkNews.category[0] === "Lifestyle"
    );

    console.log(cateNews)

    let sliceLifestyle = lifeFilter.slice(0, 4);

    const lifestyleData = sliceLifestyle.map(newspro => {
      return (
        <div className='flex justify-beetwen pt-4 for-wrap' key={newspro._id}>
          <div className='w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 overflow-hidden pr-4'>
            <h1 className='text-lg font-semibold font-serif pt-2 capitalize'>
              <Link to={`/detail/${newspro._id}`}>{newspro.title}</Link>
            </h1>
            <p className='text-sm font-serif pt-2 text-gray-700'>
              {newspro.description.substring(0, 170)}...{" "}
              <Link to={`/detail/${newspro._id}`}>
                <span className='text-blue-800 font-bold font-sans'>
                  Read More
                </span>
              </Link>
            </p>
            <p className='text-sm font-bold pt-2'>
              <Link to={`/user/${newspro.user._id}`}>
                {newspro.user.fullname}
              </Link>
            </p>
            <p className='text-xs text-gray-700'>
              { Moment(newspro.date).format("dddd, MMMM Do YYYY") }
            </p>
          </div>
          <div className='w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 overflow-hidden p-3 width-img'>
            <Link to={`/detail/${newspro._id}`}>
              <img src={newspro.media.secure_url} alt='nature' className="object-cover object-center"/>
            </Link>
          </div>
        </div>
      );
    });

    // Food Data
    let foodFilter = cateNews.filter(
      checkNews => checkNews.category[0] === "Food"
    );

    let sliceFood = foodFilter.slice(1, 4);

    const foodData = sliceFood.map(newspro => {
      return (
        <div
        className='w-full overflow-hidden border-b-2 border-gray-400'
        key={newspro._id}>
        <Link to={`/detail/${newspro._id}`}>
          <h2 className='font-semibold my-4 font-serif'>{newspro.title}</h2>
        </Link>
      </div>
      )
    });

    // Tech Data
    let techFilter = cateNews.filter(
      checkNews => checkNews.category[0] === "Tech"
    );

    let sliceTech = techFilter.slice(4, 7);

    const techData = sliceTech.map(newspro => {
      return (
        <div
          className='w-full overflow-hidden border-b-2 border-gray-400'
          key={newspro._id}>
          <Link to={`/detail/${newspro._id}`}>
            <h2 className='font-semibold my-4 font-serif'>{newspro.title}</h2>
          </Link>
        </div>
      );
    });

    // Education Data
    let eduFilter = cateNews.filter(
      checkNews => checkNews.category[0] === "Education"
    );

    let sliceEdu = eduFilter.slice(1, 4);

    const educateData = sliceEdu.map(newspro => {
      return (
        <div
          className='w-full overflow-hidden border-b-2 border-gray-400'
          key={newspro._id}>
          <Link to={`/detail/${newspro._id}`}>
            <h2 className='font-semibold my-4 font-serif'>{newspro.title}</h2>
          </Link>
        </div>
      );
    });

    // Entertainment Data
    let entertainFilter = cateNews.filter(
      checkNews => checkNews.category[0] === "Entertainment"
    );

    let sliceEnter = entertainFilter.slice(0, 4);

    const entertainData = sliceEnter.map(newspro => {
      return (
        <div className='flex justify-beetwen pt-4 for-wrap' key={newspro._id}>
          <div className='w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 overflow-hidden pr-4'>
            <h1 className='text-lg font-semibold font-serif pt-2 capitalize'>
              <Link to={`/detail/${newspro._id}`}>{newspro.title}</Link>
            </h1>
            <p className='text-sm font-serif pt-2 text-gray-700'>
              {newspro.description.substring(0, 170)}...{" "}
              <Link to={`/detail/${newspro._id}`}>
                <span className='text-blue-800 font-bold font-sans'>
                  Read More
                </span>
              </Link>
            </p>
            <p className='text-sm font-bold pt-2'>
              <Link to={`/user/${newspro.user._id}`}>
                {newspro.user.fullname}
              </Link>
            </p>
            <p className='text-xs text-gray-700'>
              { Moment(newspro.date).format("dddd, MMMM Do YYYY") }
            </p>
          </div>
          <div className='w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 overflow-hidden p-3 width-img'>
            <Link to={`/detail/${newspro._id}`}>
              <img src={newspro.media.secure_url} alt='nature' className="object-cover object-center"/>
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
      <div className='bg-color-hot'>
        <ScrollUpButton 
           StopPosition={0}
           ShowAtPosition={150}
           EasingType='easeOutCubic'
           AnimationDuration={500}
           ContainerClassName='ScrollUpButton__Container'
           TransitionClassName='ScrollUpButton__Toggled'
        />
        <div className='flex justify-end play-button'>
          <button  onClick={this.onLinkClick}>
          <img
            src='https://neversinkmediagroup.com/wabt/wp-content/uploads/sites/7/2018/10/Google-Play-Store-Logo.png'
            alt='play-store'
            className='w-48'
          />
          </button>
        </div>
        <div className='widht-home mx-auto'>
          <div className='flex flex-wrap overflow-hidden'>
            <div className='w-full overflow-hidden md:w-3/4 lg:w-3/4 xl:w-3/4 px-3'>

              {/* List News Category */}
              { newsFilter.length !== 0 ? (
                <div className='title-grid flex flex-wrap w-full'>
                  <div>
                    <hr className='separator' />
                  </div>
                  <div className='title-design w-1/2'>
                    <Link to={`/category/News`}>
                      <span>News</span>
                    </Link>
                  </div>
                  <div className='btn-seemore w-1/2 text-right'>
                    <Link to={`/category/News`}>
                      <button className='px-8 py-2 text-xs text-white font-semibold'>
                        See More
                      </button>
                    </Link>
                  </div>

                  {this.state.loading ? (
                    <div className='flex flex-wrap overflow-hidden'>
                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${ newsFilter[0] && newsFilter[0]._id}`}>
                            <img
                              src={
                                newsFilter[0] && newsFilter[0].media.secure_url
                              }
                              className='h-64 w-full object-cover object-center'
                            />
                            <h2 className='py-3 font-serif font-semibold'>
                              {newsFilter[0] && newsFilter[0].title}
                            </h2>
                            </Link>
                          </div>

                          <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            {newsData}
                          </div>
                        </div>
                      </div>

                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          { newsFilter.length >= 6 ? (
                            <>
                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${ newsFilter[4] && newsFilter[4]._id}`}>
                              <img
                                src={
                                  newsFilter[4] && newsFilter[4].media.secure_url
                                }
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {newsFilter[4] && newsFilter[4].title}
                              </h2>
                              </Link>
                            </div>
                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${ newsFilter[5] && newsFilter[5]._id}`}>
                              <img
                                src={
                                  newsFilter[5] && newsFilter[5].media.secure_url
                                }
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {newsFilter[5] && newsFilter[5].title}
                              </h2>
                              </Link>
                            </div>
                            </>
                          ) : ('') }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                  )}
                </div>
              ) : ('') }

              {/* List Education Category */}
              { eduFilter.length !== 0 ? (
                <div className='title-grid flex flex-wrap w-full'>
                  <div>
                    <hr className='separator education' />
                  </div>
                  <div className='title-design w-1/2'>
                    <Link  to={`/category/Education`}>
                      <span>Education</span>
                    </Link>
                  </div>
                  <div className='btn-seemore w-1/2 text-right'>
                    <Link  to={`/category/Education`}>
                      <button className='px-8 py-2 text-xs text-white font-semibold'>
                        See More
                      </button>
                    </Link>
                  </div>

                  {this.state.loading ? (
                    <div className='flex flex-wrap overflow-hidden'>
                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            {educateData}
                          </div>

                          <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to= {`/detail/${eduFilter[0] && eduFilter[0]._id}`}>
                            <img
                              src={eduFilter[0] && eduFilter[0].media.secure_url}
                              className='h-64 w-full object-cover object-center'
                            />
                            <h2 className='py-3 font-serif font-semibold'>
                              {eduFilter[0] && eduFilter[0].title}
                            </h2>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          { eduFilter.length >= 6 ? (
                            <>
                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to= {`/detail/${eduFilter[4] && eduFilter[4]._id}`}>
                              <img
                                src={eduFilter[4] && eduFilter[4].media.secure_url}
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {eduFilter[4] && eduFilter[4].title}
                              </h2>
                              </Link>
                            </div>

                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to= {`/detail/${eduFilter[5] && eduFilter[5]._id}`}>
                              <img
                                src={eduFilter[5] && eduFilter[5].media.secure_url}
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {eduFilter[5] && eduFilter[5].title}
                              </h2>
                              </Link>
                            </div>
                            </>
                          ) : ('') }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                  )}
                </div>
              ) : ('') }

              {/* List Tech Category */}
              { techFilter.length !== 0 ? (
                <div className='title-grid flex flex-wrap w-full'>
                  <div>
                    <hr className='separator' />
                  </div>
                  <div className='title-design w-1/2'>
                    <Link to={`/category/Tech`}>
                      <span>Tech</span>
                    </Link>
                  </div>
                  <div className='btn-seemore w-1/2 text-right'>
                    <Link to={`/category/Tech`}>
                      <button className='px-8 py-2 text-xs text-white font-semibold'>
                        See More
                      </button>
                    </Link>
                  </div>

                  {this.state.loading ? (
                    <div className='flex flex-wrap overflow-hidden'>
                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          <div className='w-full overflow-hidden'>
                            <div className='flex flex-wrap overflow-hidden'>
                              <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                                <Link to={`/detail/${ techFilter[0] && techFilter[0]._id}`}>
                                <img
                                  src={ techFilter[0] && techFilter[0].media.secure_url }
                                  className='h-64 w-full object-cover object-center'
                                />
                                <h2 className='py-3 font-serif font-semibold'>
                                  {techFilter[0] && techFilter[0].title}
                                </h2>
                                </Link>
                              </div>

                              { techFilter[1] ? (
                                <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                                  <Link to={`/detail/${ techFilter[1] && techFilter[1]._id }`}>
                                    <img
                                      src={ techFilter[1] && techFilter[1].media.secure_url }
                                      className='h-64 w-full object-cover object-center'
                                    />
                                    <h2 className='py-3 font-serif font-semibold'>
                                      {techFilter[1] && techFilter[1].title}
                                    </h2>
                                  </Link>
                                </div>
                              ) : ('') }
                            </div>
                          </div>

                          { techFilter.length >= 6 ? (
                            <>
                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                              {techData}
                            </div>

                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${ techFilter[2] && techFilter[2]._id }`}>
                              <img
                                src={ techFilter[2] && techFilter[2].media.secure_url }
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {techFilter[2] && techFilter[2].title}
                              </h2>
                              </Link>
                            </div>
                            </>
                          ) : ('')}

                        </div>
                      </div>
                    </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                  )}
                </div>
              ) : ('') }

              {/* List Food Category */}
              { foodFilter.length !== 0 ? (
                <div className='title-grid flex flex-wrap w-full'>
                  <div>
                    <hr className='separator' />
                  </div>
                  <div className='title-design w-1/2'>
                    <Link to={`/category/Food`}>
                      <span>Food</span>
                    </Link>
                  </div>
                  <div className='btn-seemore w-1/2 text-right'>
                    <Link to={`/category/Food`}>
                      <button className='px-8 py-2 text-xs text-white font-semibold'>
                        See More
                      </button>
                    </Link>
                  </div>

                  {this.state.loading ? (
                    <div className='flex flex-wrap overflow-hidden'>
                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${foodFilter[0] && foodFilter[0]._id}`}>
                            <img
                              src={
                                foodFilter[0] && foodFilter[0].media.secure_url
                              }
                              className='h-64 w-full object-cover object-center'
                            />
                            <h2 className='py-3 font-serif font-semibold'>
                              {foodFilter[0] && foodFilter[0].title}
                            </h2>
                            </Link>
                          </div>

                          <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            {foodData}
                          </div>
                        </div>
                      </div>

                      <div className='w-full overflow-hidden'>
                        <div className='flex flex-wrap overflow-hidden'>
                          { foodFilter.length >= 6 ? (
                            <>
                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${foodFilter[4] && foodFilter[4]._id}`}>
                              <img
                                src={ foodFilter[4] && foodFilter[4].media.secure_url }
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {foodFilter[4] && foodFilter[4].title}
                              </h2>
                              </Link>
                            </div>

                            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 p-3'>
                            <Link to={`/detail/${foodFilter[5] && foodFilter[5]._id}`}>
                              <img
                                src={ foodFilter[5] && foodFilter[5].media.secure_url }
                                className='h-64 w-full object-cover object-center'
                              />
                              <h2 className='py-3 font-serif font-semibold'>
                                {foodFilter[5] && foodFilter[5].title}
                              </h2>
                              </Link>
                            </div>
                            </>
                          ) : ('') }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                  )}
                </div>
              ) : ('') }

              {/* List Lifestyle Category */}
              { lifeFilter.length !== 0 ? (
                <div className='title-grid flex flex-wrap w-full'>
                  <div>
                    <hr className='separator lifestyle' />
                  </div>
                  <div className='title-design w-1/2'>
                    <Link to={`/category/Lifestyle`}>
                      <span>Lifestyle</span>
                    </Link>
                  </div>
                  <div className='btn-seemore w-1/2 text-right'>
                    <Link to={`/category/Lifestyle`}>
                      <button className='px-8 py-2 text-xs text-white font-semibold'>
                        See More
                      </button>
                    </Link>
                  </div>

                  {this.state.loading ? (
                      <div className="w-full overflow-hidden p-3">
                      <div className="flex flex-wrap overflow-hidden">{lifestyleData}</div>
                      <div className="flex justify-end pt-4">
                      </div>
                    </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                  )}
                </div>
              ) : ('') }

              {/* List Entertainment Category */}
              { entertainFilter.length !== 0 ? (
                <div className='title-grid flex flex-wrap w-full'>
                  <div>
                    <hr className='separator entertain' />
                  </div>
                  <div className='title-design w-1/2'>
                    <Link to={`/category/Entertainment`}>
                      <span>Entertain</span>
                    </Link>
                  </div>
                  <div className='btn-seemore w-1/2 text-right'>
                    <Link to={`/category/Entertainment`}>
                      <button className='px-8 py-2 text-xs text-white font-semibold'>
                        See More
                      </button>
                    </Link>
                  </div>

                  {this.state.loading ? (
                      <div className="w-full overflow-hidden p-3">
                      <div className="flex flex-wrap overflow-hidden">{entertainData}</div>
                      <div className="flex justify-end pt-4">
                      </div>
                    </div>
                  ) : (
                    <Lottie options={setLoattie} width={150} />
                  )}
                </div>
              ) : ('') }

              <div className='title-grid flex flex-wrap w-full'>
                <div>
                  <hr className='separator' />
                </div>
                <div className='title-design w-1/2'>
                  <Link to={`/category/Video`}>
                    <span>Video</span>
                  </Link>
                </div>
                <div className='btn-seemore w-1/2 text-right'>
                  <Link to={`/category/Video`}>
                    <button className='px-8 py-2 text-xs text-white font-semibold'>
                      See More
                    </button>
                  </Link>
                </div>

                {this.state.loading ? (
                  <div className='flex flex-wrap overflow-hidden'>
                    <GridVideo/>
                  </div>
                ) : (
                  <Lottie options={setLoattie} width={150} />
                )}
              </div>
            </div>

            <div className='w-full overflow-hidden md:w-1/4 lg:w-1/4 xl:w-1/4 display-side'>
              <Contribution/>
              <CardHotNews/>
            </div>
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
)(withRouter(GridNews));
