import React, { Component } from 'react'
import HeadCategory from '../components/layout/HeadCategory';
import ProfileDashboard from '../components/User/ProfileDashboard/ProfileDashboard'
import NewsStatusUser from '../components/User/ProfileDashboard/NewsStatusUser';

export class UserStatusPage extends Component {
  render() {
    return (
      <div>
        <HeadCategory/>
        <ProfileDashboard/>
        <NewsStatusUser/>
      </div>
    )
  }
}

export default UserStatusPage;
