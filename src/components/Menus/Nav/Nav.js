import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
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
        {props.user.id && (
          <>
            <LogOutButton className="nav-link nav-link-button" />
          </>
        )}
      </div>
    </div>
    {/* Only displays the admin menu if the user is an admin */}
    {props.user.id && props.user.admin === true && (
      <>
        
      </>
    )}
    <div className="nav-placeholder"></div>
  </>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
