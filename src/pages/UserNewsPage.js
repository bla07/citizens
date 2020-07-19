import React, { Component } from 'react';
import UserProfile from '../components/User/ShowUser/UserProfile';
import NavbarUser from '../components/User/ShowUser/NavbarUser';
import NewsByUser from '../components/User/ShowUser/NewsByUser';

export class UserPage extends Component {
  render() {
    return (
      <div>
        <UserProfile/>
        <NavbarUser/>
        <NewsByUser/>
      </div>
    )
  }
}

export default UserPage;
