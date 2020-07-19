import React, { Component } from 'react'
import ProfileDashboard from '../components/User/ProfileDashboard/ProfileDashboard';
import ProfileNews from '../components/User/ProfileDashboard/ProfileNews';

class ProfileDashboardPage extends Component {
  render() {
    return (
      <div>
        <ProfileDashboard/>
        <ProfileNews/>
      </div>
    )
  }
}

export default ProfileDashboardPage
