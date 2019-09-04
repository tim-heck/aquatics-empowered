import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import './MobileNav.css';
import FilterMenu from '../FilterMenu/FilterMenu';

class MobileNav extends Component {

    openMobileNav = () => {
        document.getElementById("mobile-nav").style.width = "100%";
        this.closeFiltersMenu();
    }

    closeMobileNav = () => {
        document.getElementById("mobile-nav").style.width = "0px";
    }

    openFiltersMenu = () => {
        document.getElementById("filter-menu").style.height = "100vh";
    }

    closeFiltersMenu = () => {
        document.getElementById("filter-menu").style.height = "0px";
    }

    render() {
        return (
            <>
                <div className="mobile-header">
                    <Icon name="bars" size="big" onClick={this.openMobileNav}/>
                    <div className="right-mobile-header">
                        <Icon name="tasks" size="big" onClick={this.openFiltersMenu} />
                        <Icon name="search" size="big" onClick={this.openSearch} />
                    </div>
                </div>
                <div id="mobile-nav" className="mobile-nav">
                    <div className="mobile-nav-closebtn">
                        <Icon name="x" size="big" onClick={this.closeMobileNav} />
                    </div>
                    <ul>
                        <li>
                            <Link className="mobile-nav-link" to="/stories">Stories</Link>
                        </li>
                        <li>
                            <Link className="mobile-nav-link" to="/share">Share a Story</Link>
                        </li>
                        <li>
                            <Link className="mobile-nav-link" to="/aquatics-empowered-about">Aquatics Empowered</Link>
                        </li>
                        <li>
                            <Link className="mobile-nav-link" to="/hot-tubbing-for-hope-about">Hot Tubbing For Hope</Link>
                        </li>
                        <li className="donate">
                            <a className="mobile-nav-link"
                                href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/"
                                target="_blank" rel="noopener noreferrer">Donate</a>
                        </li>
                    </ul>
                </div>
                <FilterMenu close={this.closeFiltersMenu}/>
            </>
        )
    }
}

export default connect()(MobileNav);
