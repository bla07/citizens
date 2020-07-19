import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';

import "../../assets/scss/NavbarAdmin.scss";

class NavbarAdmin extends Component {

  removeToken = async () => {
    await localStorage.clear();
    window.location.reload(true);
    this.props.history.push('/login');
  }  

  render() {
    return (
      <div>
        <div className="area"></div>
          <nav className="main-menu">
            <ul>
              <li className="has-subnav">
                <Link to="/">
                <i className="fa fa-home fa-2x"></i>
                <span className="nav-text">Home Page</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/dashboard">
                <i className="far fa-newspaper fa-2x"></i>
                <span className="nav-text">Dashboard</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/adminapproved">
                <i className="fas fa-check-circle fa-2x"></i>
                <span className="nav-text">Manage Published News</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/adminrejected">
                <i className="fas fa-times-circle fa-2x"></i>
                <span className="nav-text">Manage Rejected News</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/adminreported">
                <i className="fas fa-exclamation-triangle fa-2x"></i>
                <span className="nav-text">Manage Reported News</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/admindashboardusers">
                <i className="fas fa-users-cog fa-2x"></i>
                <span className="nav-text">Manage Users</span>
                </Link>
              </li>
              </ul>
              <ul className="logout">
              <li>
   
                <button onClick={this.removeToken} className="text-white">
                <i className="fa fa-power-off fa-2x"></i>
                <span className="nav-text">Logout</span>
                </button>

              </li>
            </ul>
          </nav>
      </div>
    );
  }
}

export default (withRouter(NavbarAdmin));
