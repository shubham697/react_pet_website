import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import SetPasswordComponent from '../components/Owner/SetPasswordComponent';

class SetPasswordPage extends Component {

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
                <div>
                    <SetPasswordComponent token={this.state.token} />
                </div>
                <div style={{ paddingTop: "50%" }}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default SetPasswordPage;