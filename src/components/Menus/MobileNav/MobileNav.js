import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import './MobileNav.css';

class MobileNav extends Component {

    openMobileNav = () => {
        document.getElementById("mobile-nav").style.width = "100%";
        this.closeFiltersMenu();
        this.closeSearch();
    }

    closeMobileNav = () => {
        document.getElementById("mobile-nav").style.width = "0px";
    }

    getAllStoriesOnClose = () => {
        this.props.dispatch({ type: 'FETCH_STORIES' })
        this.closeFiltersMenu();
    }

    openFiltersMenu = () => {
        this.props.dispatch({ type: 'SET_STORIES', payload: [] })
        document.getElementById("filter-menu").style.height = "100vh";
        this.closeSearch();
    }

    closeFiltersMenu = () => {
        document.getElementById("filter-menu").style.height = "0px";
    }

    toggleSearch = () => {
        document.getElementById("search-bar").classList.toggle("display-search");
        this.closeFiltersMenu();
    }

    closeSearch = () => {
        document.getElementById("search-bar").classList.remove("display-search");
    }

    render() {
        return (
            <>
                <div className="mobile-header">
                    <Icon name="bars" size="big" onClick={this.openMobileNav}/>
                    <div className="right-mobile-header">
                        <Icon name="tasks" size="big" onClick={this.openFiltersMenu} />
                        <Icon name="search" size="big" onClick={this.toggleSearch} />
                    </div>
                </div>
                <div id="mobile-nav" className="mobile-nav">
                    <div className="mobile-nav-top">
                        <Link to="/stories">
                            <img className="logo-h2whoa" src="images/h2whoa-logo.png" alt="h2whoa" />
                        </Link>
                        <div className="mobile-nav-closebtn">
                            <Icon name="x" size="big" onClick={this.closeMobileNav} />
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link className="mobile-nav-link" to="/stories" onClick={this.closeMobileNav}>Stories</Link>
                        </li>
                        <li>
                            <Link className="mobile-nav-link" to="/share" onClick={this.closeMobileNav}>Share a Story</Link>
                        </li>
                        <li>
                            <Link className="mobile-nav-link" to="/aquatics-empowered-about" onClick={this.closeMobileNav}>Aquatics Empowered</Link>
                        </li>
                        <li>
                            <Link className="mobile-nav-link" to="/hot-tubbing-for-hope-about" onClick={this.closeMobileNav}>Hot Tubbing For Hope</Link>
                        </li>
                        <li className="donate">
                            <a className="mobile-nav-link"
                                href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/"
                                target="_blank" rel="noopener noreferrer" onClick={this.closeMobileNav}>Donate</a>
                        </li>
                    </ul>
                    <div className="mobile-nav-bottom">
                        <div className="tag-line">
                            <h2>Share a Story. Take a Story.</h2>
                        </div>
                        <div className="sponsored-by">
                            <h2>Brought to you by:</h2>
                            <a href="http://aquaticsempowered.org" rel="noopener noreferrer" target="_blank" >
                                <img className="logo-aquatics-empowered" src="images/aquatic-empowered.png" alt="h2whoa" />
                            </a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default connect()(MobileNav);
