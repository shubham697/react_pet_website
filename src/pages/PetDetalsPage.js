import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import PetDetailsSection from '../components/Pets/PetDetails/PetDetailsComponent';
import {
    BrowserView,
    MobileView
} from "react-device-detect";

class PetDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <PetDetailsSection petId={this.state.id} />
                </div>
                <BrowserView>
                    <div style={{ paddingTop: "50%" }}>
                        <Footer />
                    </div>
                </BrowserView>
            </div>
        )
    }
}

export default PetDetailsPage;