import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Logo3 from '../../assets/img/Logo3.png'

class NewGreetCitizen extends Component {
  render() {
    return (
      <div className="bcg-color p-12">
        <div>
          <div className="flex justify-center w-56 mx-auto py-4">
            <img src={Logo3} alt="Logo-Citizens" className="mx-12"/>
            <h3 className="mx-12 text-5xl text-white font-serif font-bold bg-transparent border border-white-500 px-12 rounded" >Success</h3>
          </div>
          <div className="w-4/5">
              <h1 className="text-white py-4 font-semibold text-3xl">Congratulations! You Are Citizens</h1>
          </div>
          <div className="flex flex-wrap overflow-hidden">

              <div className="w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/3">
                  <p className="text-2xl font-serif text-white text-justify pr-4">
                    Now, you can upload your own news by using our upload feature. You can also give apprecciation to other contributor by leaving them a comment. 
                    <br/><br/>
                    We also update subscribe to your favorite contributor. Never miss  any news from them. 
                  </p>
              </div>

              <div className="w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/3">
                  <p className="text-3xl font-serif text-white text-justify px-4 font-semibold">Become our top Contributor</p>
                  <div className="text-center ml-16 my-4">
                    <i style={{fontSize :'6rem', color:'#ffffff'}} className="fas fa-medal"></i>
                  </div>
                  <p className="text-2xl font-serif text-white text-justify px-4">Upload more news and become our Top Contributor</p>
              </div>

              <div className="w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/3">
                  <div className="text-center ml-16 my-4">
                   <i style={{fontSize :'6rem', color:'#ffffff'}} className="fas fa-user-circle"></i>
                  </div>
                  <h1 className="text-3xl font-semibold font-serif text-white text-justify px-4">Update Your Profile</h1>
                  <p className="text-2xl font-serif text-white text-justify px-4">We would like to know you more, dont't forget to update your profile picture.</p>
              </div>

            </div>

        </div>
        <div className="flex justify-center py-4">
          <Link to="/">
          <button className="text-2xl bg-white hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded">Go Home</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default NewGreetCitizen
