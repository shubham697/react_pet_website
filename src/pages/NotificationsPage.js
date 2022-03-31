import React, { Component } from 'react'

import Header from '../components/Header/header';
import Footer from '../components/footer/footer';
import OwnerNotificationsComponent from '../components/Owner/OwnerNotificationsComponent';

class NotificationsPage extends Component {

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
                    <OwnerNotificationsComponent />
                </div>
                <div style={{ paddingTop: "50%" }}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default NotificationsPage;