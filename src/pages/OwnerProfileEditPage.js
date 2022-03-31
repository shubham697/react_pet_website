import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import OwnerEditDetailsComponent from '../components/Owner/OwnerEditDetailsComponent';

class EditPetPage extends Component {

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
                    <OwnerEditDetailsComponent />
                </div>
                <div style={{ paddingTop: "50%" }}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default EditPetPage;