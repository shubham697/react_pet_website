import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import LogoutSection from '../components/Logout/LogoutComponent';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <LogoutSection />
                </div>
                <Footer />
            </div>
        )
    }
}

export default LoginPage;