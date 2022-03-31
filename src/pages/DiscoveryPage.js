import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import PetDiscoveryComponent from '../components/Pets/PetListing/PetDiscoverComponent';

class DiscoveryPage extends Component {
    render() {
        return (
            <div>
                <Header />

                <PetDiscoveryComponent />

                <Footer />
            </div>
        )
    }
}

export default DiscoveryPage;