import React, { Component } from "react";
import { verifyPasswordResetToken, resetPasswordProper } from "../../actions/ownerActions";
import { showMessageFull } from "../../actions/messageActions";
import { dismissLoading, setLoading } from "../../actions/loadingActions";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import sha256 from 'crypto-js/sha256';

class SetPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            disableBtn: false,
            email: "",
            password: "",
            confirmPassword: "",
            btnText: "Confirm Set Password"
        };
        this.handleFormValueChange = this.handleFormValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAccountInformation = this.getAccountInformation.bind(this);
        this.redirectToReset = this.redirectToReset.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentDidMount() {
        //get reset account information
        setLoading("Loading Account Information...");
        this.getAccountInformation();
    }

    redirectToReset() {
        this.props.history.push('/resetpassword');
    }

    redirectToLogin() {
        this.props.history.push('/login');
    }

    getAccountInformation() {
        verifyPasswordResetToken(this.state.token).then((res) => {
            dismissLoading();
            if (!res.success) {
                showMessageFull("Failed to Load Account Info", res.message, this.redirectToReset);
            } else {
                this.setState({
                    email: res.data.email
                });
            }
        });
    }


    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password != this.state.confirmPassword) {
            showMessageFull("Change Password Failed", "Passwords don't match");
            return;
        }

        if (this.state.password.length < 8) {
            showMessageFull("Change Password Failed", "Passwords must me at least 8 characters long");
            return;
        }

        setLoading("Changing Password...");

        resetPasswordProper(this.state.token, sha256(process.env.REACT_APP_PASSWORD_SALT + this.state.confirmPassword).toString()).then((res) => {
            dismissLoading();
            if (res.success) {
                showMessageFull("Successfuly Set Password", "You have successfully set your password, please proceed to login.", this.redirectToLogin);
            } else {
                showMessageFull("Failed to Set Password", res.message, null);
            }
        });

        // disable the button
        this.setState({
            disableBtn: true,
            btnText: "Setting Password..."
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
                                <h4>Set Password</h4>
                            </div>
                            <div className="col-md-12 col-lg-12 text-center">
                                <h6>Setting Password for <u>{this.state.email}</u></h6>
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
                                                    <label>Password</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.password}
                                                            onChange={e => this.handleFormValueChange("password", e)}
                                                            type="password"
                                                            className="form-control"
                                                            name="password"

                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Confirm Password</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.confirmPassword}
                                                            onChange={e => this.handleFormValueChange("confirmPassword", e)}
                                                            type="password"
                                                            className="form-control"
                                                            name="confirmPassword"

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

export default withRouter(SetPasswordComponent);