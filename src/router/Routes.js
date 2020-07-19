import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Layout
import HeadCategory from "../components/layout/HeadCategory";
import Footer from "../components/layout/Footer";

// Admin Layout
import AdminSidebar from "../components/Admin/AdminSidebar";

// Main Page
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

// User Page
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ForgotPage from "../pages/ForgotPage";
import EditProfilePage from "../pages/EditProfilePage";
import DeleteAccountPage from "../pages/DeleteAccountPage";
import FileUploadPage from "../pages/FileUploadPage";
import VerifyPage from "../pages/VerifyPage";
import VerifyForgotPage from "../pages/VerifyForgotPage";
import SuccesChangePasswordPage from "../pages/SuccesChangePasswordPage";
import NewCitizensPage from "../pages/NewCitizensPage";
import ProfileDashboardPage from "../pages/ProfileDashboardPage";
import ProfileNewsPage from "../pages/ProfileNewsPage";

// Profile
import UserNewsPage from "../pages/UserNewsPage";
import UserStatusPage from "../pages/UserStatusPage";

// Category Pages
import CategoryPage from "../pages/CategoryPage";
import DetailVideoPage from "../pages/DetailVideoPage";

// Admin Control
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminNewsPage from "../pages/AdminNewsPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminRejectedPage from "../pages/AdminRejectedPage";
import AdminReportedPage from "../pages/AdminReportedPage";
import AdminApprovedPage from "../pages/AdminApprovedPage";

// News
import DetailPage from "../pages/DetailPage";

// Other
import NotfoundPage from "../pages/NotfoundPage";

const Routes = () => {

  const AppRoute = ({component : Component, layout : Layout, auth: Auth , ...rest}) => (
    <Auth>
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} />
  </Auth>
  )

  const Navigate = props => (
    <div>
      <HeadCategory/>
        {props.children}
      <Footer/>
    </div>
  )

  const noneFoot = props => (
    <div>
      <HeadCategory/>
        {props.children}
    </div>
  )

  const AdminMenu = props => (
    <div>
      <AdminSidebar/>
      {props.children}
    </div>
  )

  const User = props => (props.children)

  const Admin = props => (
    localStorage.adminToken ? 
      props.children : <Redirect to ="/login" />
  )

  const UserIn = props => (
    localStorage.token ? 
      props.children : <Redirect to ="/signin" />
  )

  return (
    <section>
      <Switch>
        <AppRoute exact path="/" layout={Navigate} auth={User}  component={HomePage} />
        <AppRoute exact path="/category/:category" layout={Navigate} auth={User} component={CategoryPage} />

        <AppRoute exact path="/about" layout={Navigate} auth={User}  component={AboutPage} />

        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/forgot" component={ForgotPage} />

        <Route exact path="/login" component={AdminLoginPage} />
        <AppRoute exact path="/dashboard" layout={AdminMenu} auth={Admin} component={AdminNewsPage}/>
        <AppRoute exact path="/adminapproved" layout={AdminMenu} auth={Admin} component={AdminApprovedPage}/>
        <AppRoute exact path="/adminrejected" layout={AdminMenu} auth={Admin} component={AdminRejectedPage}/>
        <AppRoute exact path="/adminreported" layout={AdminMenu} auth={Admin} component={AdminReportedPage}/>
        <AppRoute exact path="/admindashboardusers" layout={AdminMenu} auth={Admin} component={AdminUserPage} />

        <AppRoute exact path="/detail/:id" layout={Navigate} auth={User} component={DetailPage} />
        <AppRoute exact path="/videoDetail/:id" layout={Navigate} auth={User} component={DetailVideoPage}/>

        <AppRoute exact path="/user/:id" layout={noneFoot} auth={User} component={UserNewsPage} />
        <AppRoute exact path="#" auth={UserIn} component={ProfileNewsPage}/>
        <AppRoute exact path="/profile/:id/status" auth={UserIn} layout={noneFoot} component={UserStatusPage}/>
        <AppRoute exact path="/editprofile/:id" auth={UserIn} layout={noneFoot} component={EditProfilePage} />
        <AppRoute exact path="/editprofile/:id/delete-account" auth={UserIn} layout={noneFoot} component={DeleteAccountPage}/>
        <AppRoute exact path="/profile/:id" layout={noneFoot} auth={UserIn} component={ProfileDashboardPage}/>
        <AppRoute exact path="/profile/:id/upload" auth={UserIn} layout={noneFoot} component={FileUploadPage} />
        
        <Route exact path="/verify" component={VerifyPage} />
        <Route exact path="/verifyforgot" component={VerifyForgotPage}/>
        <Route exact path="/verifyforgot/succeschange" component={SuccesChangePasswordPage}/>
        <Route exact path="/greetings" component={NewCitizensPage}/>

        <Route component={NotfoundPage} />
        
      </Switch>
    </section>
  );
};



export default Routes;
