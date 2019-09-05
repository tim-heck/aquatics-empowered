import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HTFH.css' 

class HTFHAboutPage extends Component {

    render() {
        return (
            <>
                <div>
                    <a href="http://aquaticsempowered.org/hot-tubbing-for-hope/" >Hot Tubbing For Hope</a>
                </div>
                <br/>
                <div>
<<<<<<< HEAD
                    <img src="/images/LeoDunkirk.jpg" className="center" alt=""/>
=======
                    <img src="/images/LeoDunkirk.jpg" class="center" alt="Hot Tubbing for Hope"/>
>>>>>>> 2cb7a44cac1be3e5ce7413923330acfa398ffdd9
                </div>

                <p>Come join us November 15, 16, and 17th to help fundraise for the first ever Hot Tubbing for Hope. 
                    We will raise money to help promote and expand the launch of aquatics empowered helping other 
                     charities worldwide and small towns establish and maintain aquatic therapy resources.</p>
                
                {/* <a href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/" target="_blank" 
                rel="noopener noreferrer" class="button">Donate!</a> */}
                <a href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/"><button type="button">Donate</button></a>
            </>
        )
    }
}

export default connect()(HTFHAboutPage);
