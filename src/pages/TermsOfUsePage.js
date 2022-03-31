import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import TermsOfUseComponent from '../components/Misc/TermsOfUserComponent';

class TermsOfUsePage extends Component {
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
                    <TermsOfUseComponent />
                </div>
                <Footer />
            </div>
        )
    }
}

export default TermsOfUsePage;