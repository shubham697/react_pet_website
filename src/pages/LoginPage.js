import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import LoginSection from '../components/Login/LoginComponent';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <LoginSection />
                </div>
                <Footer />
            </div>
        )
    }
}

export default LoginPage;