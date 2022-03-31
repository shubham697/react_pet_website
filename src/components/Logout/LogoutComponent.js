import React, { Component } from "react";
import { logoutOwner } from "../../actions/ownerActions";
import { showMessage } from "../../actions/messageActions";
import { setLoading, dismissLoading } from "../../actions/loadingActions";
import { withRouter } from 'react-router-dom';

class LogoutComponent extends Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.logoutSuccessCallback = this.logoutSuccessCallback.bind(this);
    }

    componentDidMount() {
        this.logoutUser();
    }
    verifyFailureCallback() {
        //Redirect to login
    }

    verifySuccessCallback() {
        //Redirect to profile page
    }

    logoutSuccessCallback() {
        this.props.history.push('/login');
    }

    logoutUser() {
        setLoading("Logging Out, please wait...")
        logoutOwner();
        dismissLoading();
        let messageObject = {
            header: "Successfully Logged Out",
            message: "You have successfully Logged out of your account.",
            callbackFunc: this.logoutSuccessCallback
        };
        showMessage(messageObject);
    }

    render() {
        return (
            <React.Fragment >
                <div className="container animated fadeIn">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 text-center">
                            <h3>Logging Out, please wait...</h3>
                        </div>
                    </div>

                </div>

            </React.Fragment >
        );
    }
}

export default withRouter(LogoutComponent);