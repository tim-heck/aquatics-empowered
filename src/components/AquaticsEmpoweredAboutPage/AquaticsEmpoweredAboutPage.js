import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AquaticsEmpowered.css' 

class AquaticsEmpoweredAboutPage extends Component {

    render() {
        return (
            <>
            <div>
                <a href="http://aquaticsempowered.org">Aquatics Empowered</a>
            </div>
            <div>
                    <img src="/images/Troy.jpg" class="center" alt="Aquatics Empowered founder Troy Derheim"/>
                </div>

                <p>We’ve been in the pool industry in the Midwest for 27 years. About 12 years ago, we started concentrating on local city pool projects. As a mid-sized pool contractor, we mostly help with smaller city pools.

                    In working with these small rural communities, we kept coming across the same problems: Officials didn’t know how to map out the process of financing and building a pool or spa. For these officials in many small communities, it isn’t their primary position — it’s a secondary job or even a voluntary position. So they wouldn’t know how to develop plans or 
                    raise the funds for a new body of water, whether it was a new or renovated pool, spa, splash pad or other form of water.</p>
            
          
                
            </>
        )
    }
}

export default connect()(AquaticsEmpoweredAboutPage);
