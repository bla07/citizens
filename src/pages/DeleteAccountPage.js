import React, { Component } from 'react'
import HeadCategory from '../components/layout/HeadCategory';
import DeleteAccount from '../components/User/ProfileDashboard/DeleteAccount';


class DeleteAccountPage extends Component {
  render() {
    return (
      <div>
        <HeadCategory/>
        <DeleteAccount/>
      </div>
    )
  }
}

export default DeleteAccountPage
