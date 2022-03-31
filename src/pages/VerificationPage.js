import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import VerificationComponent from '../components/User/VerificationComponent';

class VerificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.match.params.token
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <HeroSection title="Verify Email" />
                    <VerificationComponent token={this.state.token} />
                </div>
                <Footer />
            </div>
        )
    }
}

export default VerificationPage;