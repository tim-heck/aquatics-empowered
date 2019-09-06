import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import FilterMenu from '../FilterMenu/FilterMenu';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';

class Nav extends Component {

  openFiltersMenu = () => {
    this.props.dispatch({ type: 'SET_STORIES', payload: [] })
    document.getElementById("filter-menu").style.height = "100vh";
  }

  closeFiltersMenu = () => {
    document.getElementById("filter-menu").style.height = "0px";
  }

  getAllStoriesOnClose = () => {
    this.props.dispatch({ type: 'FETCH_STORIES' })
    this.closeFiltersMenu();
  }

  openSearch = () => {
    document.getElementById("search-bar").style.height = "60px";
  }

  closeSearch = () => {
    document.getElementById("search-bar").style.height = "0";
  }

  render() {
    return (
      <>
        <div className="nav">
          <Link to="/stories">
            <img className="logo" src="images/aquatic-empowered.png" alt="Aquatics Empowered" />
          </Link>
          <div className="nav-right">
            <NavLink className="nav-link" to="/stories">
              Stories
            </NavLink>
            <NavLink className="nav-link" to="/share">
              Share a Story
            </NavLink>
            <NavLink className="nav-link" to="/aquatics-empowered-about">
              Aquatics Empowered
            </NavLink>
            <NavLink className="nav-link" to="/hot-tubbing-for-hope-about">
              Hot Tubbing For Hope
            </NavLink>
            <a className="nav-link donate"
              href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/"
              target="_blank" rel="noopener noreferrer">Donate</a>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {this.props.user.id && (
              <>
                <LogOutButton className="nav-link nav-link-button" />
              </>
            )}
          </div>
        </div>
        {/* Only displays the admin menu if the user is an admin */}
        {this.props.user.id && this.props.user.admin === true && (
          <>

          </>
        )}
        <div className="filter-search-menu">
          <div className="icon-group">
            <Icon name="tasks" size="big" onClick={this.openFiltersMenu} />
            <Icon name="search" size="big" onClick={this.openSearch}/>
          </div>
        </div>
        <SearchBar />
        <FilterMenu filterNone={this.getAllStoriesOnClose} close={this.closeFiltersMenu} />
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
