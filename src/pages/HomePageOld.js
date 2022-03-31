import React, { Component } from 'react'

import Header from '../components/Header/header';
import HeroSection from '../components/HeroSection/HeroSection';
import PromoSection from '../components/PromoSection/PromoMain';
import ServiceSection2 from '../components/Service/ServiceAboutUs2';
import Contact from '../components/Contact';
import ActionToCall from '../components/ActionToCall';
import Footer from '../components/footer/footer';
import { resetPetFunction } from "../actions/petActions";


class HomePage extends Component {

    componentDidMount() {
        resetPetFunction();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <HeroSection />
                    <PromoSection />
                    <ServiceSection2 />
                    <Contact />
                    <ActionToCall />
                </div>
                <Footer />
            </div>
        )
    }
}

export default HomePage