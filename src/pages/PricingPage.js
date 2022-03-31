import React, {Component} from 'react'

import Header from '../components/Header/header';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import Pricing from '../components/Pricing';
import ActionToCall from '../components/ActionToCall';
import Footer from '../components/footer/footer';


class Price extends Component{
    render(){
        return(
            <div>
                <Header />
                <div className="main">
                    <HeroSection title="Our Pricing" />
                    <Pricing faq="true" />
                    <ActionToCall />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Price;