import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';
import Nav from '../Menus/Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import InfoPage from '../InfoPage/InfoPage';
import AquaticsEmpoweredAboutPage from '../AquaticsEmpoweredAboutPage/AquaticsEmpoweredAboutPage';
import HTFHAboutPage from '../HTFHAboutPage/HTFHAboutPage';
import ShareStoryForm from '../Stories/ShareStoryForm/ShareStoryForm';
import StoriesPage from '../Stories/StoriesPage/StoriesPage';
import MobileNav from '../Menus/MobileNav/MobileNav';
import AdminEditStoryView from '../Admin/AdminEditStoryPage/AdminEditStoryView';
import AdminCategoriesPage from '../Admin/AdminCategoriesPage/AdminCategoriesPage';
import AdminFlaggedList from '../Admin/AdminCategoriesPage/AdminFlaggedList';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <MobileNav />
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/stories" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/aquatics-empowered-about"
              component={AquaticsEmpoweredAboutPage}
            />
            <Route
              exact
              path="/hot-tubbing-for-hope-about"
              component={HTFHAboutPage}
            />
            <Route
              exact
              path="/share"
              component={ShareStoryForm}
            />
            <Route
              exact
              path="/stories"
              component={StoriesPage}
            />
            {/* This route is for an administrator (only current users w/ log in creds),
            to view the form to edit a submitted story's content and images */}
            <Route
              exact
              path="/edit-story"
              component={AdminEditStoryView}
            />


            {/* ---------PROTECTED ADMIN ROUTES BELOW----------- */}
            <ProtectedRoute
              exact
              path="/admin-categories"
              component={AdminCategoriesPage}
            />

             <ProtectedRoute
             exact
             path = "/admin-flagged-list"
             component = {AdminFlaggedList}
             />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminCategoriesPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
