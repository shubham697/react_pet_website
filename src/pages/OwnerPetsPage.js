import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import PetListSection from '../components/Pets/PetListing/PetListComponent';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <PetListSection isOwner={true} />
                </div>
                <Footer />
            </div>
        )
    }
}

export default LoginPage;