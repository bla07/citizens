import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

import about from "../../assets/about/about.mp4";
import Commentnews from "../../assets/img/Commentnews.svg";
import Uploadnews from "../../assets/img/Uploadnews.svg";
import Readnews from "../../assets/img/Readnews.svg";
import Team1 from "../../assets/Our Team/1.jpg";
import Team2 from "../../assets/Our Team/2.jpg";
import Team3 from "../../assets/Our Team/3.jpg";
import Team4 from "../../assets/Our Team/4.jpg";
import Team5 from "../../assets/Our Team/5.jpg";
import Team6 from "../../assets/Our Team/6.jpg";

import "../../assets/scss/About.scss";

class About extends Component {
  render() {
    return (
      <div className='bg-color-hot'>
        <div className='ab-width abt-top'>

          <div className='flex flex-wrap overflow-hidden px-8'>
          <div className='w-full overflow-hidden lg:w-1/2 xl:w-1/2 px-8 py-4'>
              <ReactPlayer
                url={about}
                width='100%'
                height='200px'
                controls={true}
              />
            </div>

            <div className='w-full overflow-hidden lg:w-1/2 xl:w-1/2 py-4 px-6 text-gray-800'>
              <h1 className='font-semibold text-4xl mb-3'>Citizens</h1>
              <h2>
                Citizen News is the platform for you to share your story, to
                speak up your voice, and to spread the news. Proudly developed
                by Aldo Lim, Angel Ria Purnamasari, Kaleb Lim, Agung Dwi Putra,
                Khairunissa Afifa, and Joe Phang.
              </h2>
            </div>
          </div>

          <h1 className='text-center py-12 text-4xl font-bold text-gray-700'>
            Citizens Feature
          </h1>
          <div className="flex flex-wrap overflow-hidden">

            <div className="w-full overflow-hidden lg:w-1/3 xl:w-1/3 p-6 mx-auto">
              <div className="flex justify-center">
              <img src={Uploadnews} alt="upload" className="w-64 h-64"/>
              </div>
              <h1 className="text-blue-600 font-bold text-center text-2xl py-2">Upload News</h1>
            </div>

            <div className="w-full overflow-hidden lg:w-1/3 xl:w-1/3 p-6 mx-auto">
            <div className="flex justify-center">
              <img src={Readnews} alt="comment" className="w-64 h-64"/>
              </div>
              <h1 className="text-blue-600 font-bold text-center text-2xl py-2">Read News</h1>
            </div>

            <div className="w-full overflow-hidden lg:w-1/3 xl:w-1/3 p-6 mx-auto">
            <div className="flex justify-center">
              <img src={Commentnews} alt="comment" className="w-64 h-64"/>
              </div>
              <h1 className="text-blue-600 font-bold text-center text-2xl py-2">Comment News</h1>
            </div>

          </div>

          <h1 className='text-center py-12 text-4xl font-bold text-gray-700'>
            Our Team
          </h1>
          <div className='flex flex-wrap overflow-hidden'>
            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/6 xl:w-1/6'>
              <div className='flex flex-wrap overflow-hidden'>
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-center'>
                    <img
                      src={Team1}
                      alt='Some'
                      className='w-32 h-32 flex self-center rounded-full shadow-lg mb-6 object-cover'
                    />
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <h1 className='text-center text-lg font-bold text-gray-800'>Aldo Lim</h1>
                </div>
              </div>
            </div>

            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/6 xl:w-1/6'>
              <div className='flex flex-wrap overflow-hidden'>
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-center'>
                    <img
                      src={Team3}
                      alt='Some'
                      className='w-32 h-32 flex self-center rounded-full shadow-lg mb-6 object-cover'
                    />
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <h1 className='text-center text-lg font-bold text-gray-800'>Joe Phang</h1>
                </div>
              </div>
            </div>

            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/6 xl:w-1/6'>
              <div className='flex flex-wrap overflow-hidden'>
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-center'>
                    <img
                      src={Team2}
                      alt='Some'
                      className='w-32 h-32 flex self-center rounded-full shadow-lg mb-6 object-cover'
                    />
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <h1 className='text-center text-lg font-bold text-gray-800'>Lim Khaleb</h1>
                </div>
              </div>
            </div>

            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/6 xl:w-1/6'>
              <div className='flex flex-wrap overflow-hidden'>
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-center'>
                    <img
                      src={Team4}
                      alt='Some'
                      className='w-32 h-32 flex self-center rounded-full shadow-lg mb-6 object-cover'
                    />
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <h1 className='text-center text-lg font-bold text-gray-800'>Khairunnisha Afifa</h1>
                </div>
              </div>
            </div>

            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/6 xl:w-1/6'>
              <div className='flex flex-wrap overflow-hidden'>
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-center'>
                    <img
                      src={Team6}
                      alt='Some'
                      className='w-32 h-32 flex self-center rounded-full shadow-lg mb-6 object-cover'
                    />
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <h1 className='text-center text-lg font-bold text-gray-800'>Angel Ria Purnamasari</h1>
                </div>
              </div>
            </div>

            <div className='w-full overflow-hidden md:w-1/2 lg:w-1/6 xl:w-1/6'>
              <div className='flex flex-wrap overflow-hidden'>
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-center'>
                    <img
                      src={Team5}
                      alt='Some'
                      className='w-32 h-32 flex self-center rounded-full shadow-lg mb-6 object-cover'
                    />
                  </div>
                </div>

                <div className='w-full overflow-hidden'>
                  <h1 className='text-center text-lg font-bold text-gray-800'>Agung Dwi P.</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
