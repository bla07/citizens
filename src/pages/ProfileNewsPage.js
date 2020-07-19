import React, { Component } from 'react';
import HeadCategory from '../components/layout/HeadCategory';
import ProfileNews from '../components/User/ProfileDashboard/ProfileNews';

class ProfileNewsPage extends Component {
  render() {
    return (
      <div>
        <HeadCategory/>
        <ProfileNews/>
      </div>
    )
  }
}

export default ProfileNewsPage
