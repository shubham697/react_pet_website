import React, { Component } from "react";
import { resetPassword } from "../../actions/ownerActions";
import { showMessage } from "../../actions/messageActions";
import { dismissLoading, setLoading } from "../../actions/loadingActions";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ReactGA from 'react-ga';

class ResetPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableBtn: false,
            email: "",
            confirmEmail: "",
            btnText: "Confirm Reset"
        };
        this.handleFormValueChange = this.handleFormValueChange.bind(this);
        this.clearEmail = this.clearEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "user_visited_reset_password_page",
            action: "User Visited Reset Password Page",
        });
    }


    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }

    clearEmail() {
        this.setState({
            email: "",
            confirmEmail: ""
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        setLoading("Reseting Password...");



        resetPassword(this.state.confirmEmail).then((res) => {
            dismissLoading();
            if (res.success) {
                let messageObject = {
                    header: "Successfully Reset Password",
                    message: "You have successfully reseted your password, please check your email for the password reset link.",
                    callbackFunc: this.clearEmail
                };
                showMessage(messageObject);
            } else {
                //popup
                let messageObject = {
                    header: "Failed to Reset Password",
                    message: "Failed to reset password, please check that your email is a valid email.",
                    callbackFunc: this.clearEmail
                };
                showMessage(messageObject);
            }
        });

        // disable the button
        this.setState({
            disableBtn: true,
            btnText: "Reseting..."
        });

        // added delay to change button text to previous
        setTimeout(
            function () {
                // enable the button
                this.setState({
                    disableBtn: false
                })
            }.bind(this),
            3000
        );
    }

    render() {
        return (
            <React.Fragment >

                {
                    <div className="container mt-75 animated fadeIn ">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 text-center">
                                <h4>Reset Password</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    <div className="col-md-12" >

                                        <form
                                            id="contactForm1"
                                            className="contact-us-form"
                                            noValidate="novalidate"
                                            onSubmit={this.handleSubmit}>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Email</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.email}
                                                            onChange={e => this.handleFormValueChange("email", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="email"

                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Confirm Email</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.confirmEmail}
                                                            onChange={e => this.handleFormValueChange("confirmEmail", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="confirmEmail"

                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="col-sm-12 col-md-12">
                                                <Button
                                                    type="submit"
                                                    className="btn primary-solid-btn"
                                                    id="btnContactUs"
                                                    disabled={this.state.disableBtn}
                                                    variant="primary"
                                                >
                                                    {
                                                        this.state.disableBtn && <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            style={{ marginRight: "5px" }}
                                                        />
                                                    }
                                                    {this.state.btnText}
                                                </Button>
                                            </div>

                                        </form >
                                        <p className="form-message" ></p>
                                    </div >


                                </div>
                            </div>

                        </div>

                    </div>

                }
            </React.Fragment>
        );
    }
}

export default withRouter(ResetPasswordComponent);