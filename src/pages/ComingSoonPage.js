import React, {Component} from 'react'

import Header from '../components/Header/header';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import ComingSoonComponent from '../components/Misc/ComingSoonComponent';
import ActionToCall from '../components/ActionToCall';
import Footer from '../components/footer/footer';


class AboutUsPage extends Component{
    render(){
        return(
            <div>
                <Header />
                <div className="main">
                    <HeroSection title="Discovery Coming Soon" />
                    <ComingSoonComponent />
                    <ActionToCall />
                </div>
                <Footer />
            </div>
        )
    }
}

export default AboutUsPage;