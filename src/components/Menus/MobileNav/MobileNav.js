import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './MobileNav.css';

class MobileNav extends Component {

    openMobileNav = () => {
        document.getElementById("mobile-nav").style.width = "100%";
    }

    closeMobileNav = () => {
        document.getElementById("mobile-nav").style.width = "0px";
    }

    render() {
        return (
            <>
                <div className="mobile-header">
                    <Icon name="bars" size="big" onClick={this.openMobileNav}/>
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
            </>
        )
    }
}

export default connect()(MobileNav);
