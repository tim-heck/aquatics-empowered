import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AquaticsEmpowered.css'



class AquaticsEmpoweredAboutPage extends Component {

    render() {
        return (

            <div className="container">
                <h2>
                    <a className="external-link" href="http://aquaticsempowered.org" rel="noopener noreferrer" target="_blank">Aquatics Empowered</a>
                </h2>
                <img className="about-item center" src="/images/Troy.jpg" alt="Aquatics Empowered founder Troy Derheim" />
                <p className="about-item about-text">We’ve been in the pool industry for 28 years. Nineteen years ago, we started
                concentrating on local city pool projects. As a mid-sized pool contractor, our for-profit entity started helping
                with smaller community pools.
                <br />
                <br />
                While working with the rural communities, we kept coming across the same problems:
                Community members struggled with the process, planning, designing, financing, building, and then profitably managing
                an aquatic facility. In most cases this isn’t their primary position, it’s a secondary job or even a voluntary position.
                This creates a very challenging situation for an important and much needed addition to the community. In addition to
                operational challenges, comes the sticker shock, some of the facilities costing well into the millions. Many communities
                do not realize more affordable solutions are available. The process with fundraising could take in excess of five years.
                <br />
                <br />
                <strong>Filling the gap</strong> – Communities need access to aquatic therapy.
                <br />
                <br />
                My wife is in the healthcare industry, the trend seems to be almost every discipline is prescribing aquatic therapy. Everybody is
                recommending it, even to help with the opioid crisis, as part of a pain reduction treatment regimen. Aquatic therapy is one of the
                top options with physical and occupational therapists and other medical professionals. As a disabled veteran I have realized the
                value of aquatic therapy. We see daily who benefits from aquatic therapy. The aquatic solutions don’t have to be the biggest, most
                expensive or fanciest feature, just a solution to achieve pain reduction and peace of mind.
                <br />
                <br />
                There just aren’t enough aquatics facilities to meet the rising need. Even if the communities have an outdoor pool, they only keep
                it open for the kids, which means Memorial Day to Labor Day weekend. I’ve had people say, “We only have 300 people in the whole town,
                so we really can’t afford anything.” Aquatics Empowered can provide a solution. There’s more than one type of plan that can work,
                they just need guidance and support. We explain they don’t need a major center to provide aquatic solutions. We’ve been able to take
                a corner of their town hall building and install a small aquatic feature such as a swim spa. This provides the community a cost
                effective year-round use for all residents.
                <br />
                <br />
                We help communities acquire grants and resources. Through our website, we connect communities with each other for advice, and with
                industry professionals for guidance.  The site continues to add information on the benefits of aquatic therapy and advice for organizing
                resources to build aquatic solutions.  We are building relationships with other organizations, medical groups, industry organizations,
                and manufacturers. We want to harness all resources and bring them together to support rural communities.
                <br />
                <br />
                Our goal is for every community to have a safe and compliant aquatic facility, even if it’s only a swim spa in the City Hall building.
                While the focus is on communities, we help individuals as well. We are implementing a program to take donated hot tubs and repurpose them
                for disabled individuals or Make a Wish children.
                <br />
                <br />
                Aquatics Empowered has been in the works since 2014. Time has been spent researching and gathering industry resources, we’ve heard story
                after story of how aquatic therapy helps those with disabilities, children with autism, rehabilitating athletes, helping disabled veterans,
                mental illness, opioid use reduction, professional athletes’ rehabilitation, and the list goes on and on.  I’ve spoken with people from the
                Autism Society who have seen huge success when children with autism get in water and work with a physical therapist.
                <br />
                <br />
                Water has healing capabilities, whether it’s mentally or physically, and this gets us fired up!  Water isn’t just for recreation — it’s
                life-changing.  We create smiles, life long memories, and change lives daily!
                </p>
            </div>

        )
    }
}

export default connect()(AquaticsEmpoweredAboutPage);
