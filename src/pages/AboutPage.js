import React, {Component} from 'react'

import Header from '../components/Header/header';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import PromoSection from '../components/PromoSection';
import ServiceSection2 from '../components/Service/ServiceAboutUs2';
import ActionToCall from '../components/ActionToCall';
import Footer from '../components/footer/footer';
import ServiceSection from '../components/Service/ServiceAboutUs';
import MissionSection from '../components/Business';


class AboutUsPage extends Component{
    render(){
        return(
            <div>
                <Header />
                <div className="main">
                    <HeroSection title="About Us" />
                    <ServiceSection />
                    <MissionSection />
                    <PromoSection />
                    <ServiceSection2 />
                    <ActionToCall />
                </div>
                <Footer />
            </div>
        )
    }
}

export default AboutUsPage;