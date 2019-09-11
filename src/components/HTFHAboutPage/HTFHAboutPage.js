import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HTFH.css'

class HTFHAboutPage extends Component {

    render() {
        return (
            <div className="container htfh-about">
                <h2>
                    <a className="external-link" href="http://aquaticsempowered.org/hot-tubbing-for-hope/" >Hot Tubbing For Hope</a>
                </h2>
                <img className="about-item center" src="/images/LeoDunkirk.jpg" alt="Hot Tubbing for Hope" />
                <div className="about-item">
                    <p className="about-text">Come join us November 15, 16, and 17th to help fundraise for the first ever Hot Tubbing for Hope.
                        We will raise money to help promote and expand the launch of aquatics empowered helping other
                        charities worldwide and small towns establish and maintain aquatic therapy resources.</p>
                    <a className="ui button" href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/" 
                    rel="noopener noreferrer" target="_blank">Donate</a>
                </div>
            </div>
        )
    }
}

export default connect()(HTFHAboutPage);
