import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import PrivacyPolicyComponent from '../components/Misc/PrivacyPolicyComponent';

class PrivacyPolicyPage extends Component {
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
                    <PrivacyPolicyComponent />
                </div>
                <Footer />
            </div>
        )
    }
}

export default PrivacyPolicyPage;