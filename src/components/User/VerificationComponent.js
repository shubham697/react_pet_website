import React, { Component } from "react";
import ownerStore from "../../stores/ownerStore";
import { verifyOwnerEmail } from "../../actions/ownerActions";
import { showMessage } from "../../actions/messageActions";
import { setLoading, dismissLoading } from "../../actions/loadingActions";
import { withRouter } from 'react-router-dom';

class UserHeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owner: ownerStore.getOwnerObject(),
            token: props.token
        }
        this.onChange = this.onChange.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
        this.verifyFailureCallback = this.verifyFailureCallback.bind(this);
        this.verifySuccessCallback = this.verifySuccessCallback.bind(this);
    }

    componentDidMount() {
        ownerStore.addChangeListener(this.onChange);
        this.verifyToken();
    }

    componentWillUnmount() {
        ownerStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ owner: ownerStore.getOwnerObject() });
    }

    verifyFailureCallback() {
        //Redirect to login
        this.props.history.push("/login");
    }

    verifySuccessCallback() {
        this.props.history.push("/owner/pets");
    }

    verifyToken() {
        setLoading("Verifying Token, please wait...")
        verifyOwnerEmail(this.state.token).then((res) => {
            dismissLoading();
            if (!res.success) {
                //show modal wrong with message
                let messageObject = {
                    header: "Error with Verification",
                    message: "The verification token might have expired, please login to your account and click on the resend token Verification button.",
                    callbackFunc: this.verifyFailureCallback
                };
                showMessage(messageObject);
            } else {
                //show modal success
                let messageObject = {
                    header: "Successfully Verified",
                    message: "You have successfully Verified your Email.",
                    callbackFunc: this.verifySuccessCallback
                };
                showMessage(messageObject);
            }
        });
    }

    render() {
        return (
            <React.Fragment >
                <div className="container animated fadeIn">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 text-center">
                            <h3>Verifying your account, please wait...</h3>
                        </div>
                    </div>

                </div>

            </React.Fragment >
        );
    }
}

export default withRouter(UserHeaderComponent);