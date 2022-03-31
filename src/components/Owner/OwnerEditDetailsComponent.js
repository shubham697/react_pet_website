import React, { Component } from "react";
import ownerStore from "../../stores/ownerStore";
import { showMessage, showMessageFull } from "../../actions/messageActions";
import { dismissLoading, setLoading } from "../../actions/loadingActions";
import { changePassword } from "../../actions/ownerActions";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';

class OwnerEditDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableBtn: false,
            owner: ownerStore.getOwnerObject(),
            fullName: "",
            email: "",
            oldPassword: "",
            changePassword: "",
            changePassword2: ""
        };

        this.onChange = this.onChange.bind(this);
        this.dismissLoadingOverlay = this.dismissLoadingOverlay.bind(this);
        this.handleFormValueChange = this.handleFormValueChange.bind(this);
        this.confirmEditOwner = this.confirmEditOwner.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "user_visited_edit_owner_details_page",
            action: "User Visited Edit Owner Details",
        });
        ownerStore.addChangeListener(this.onChange);
        this.dismissLoadingOverlay();
    }

    componentWillUnmount() {
        ownerStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            owner: this.state.owner.getOwnerObject()
        })
        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);
    }

    dismissLoadingOverlay() {
        dismissLoading();
        this.setState({
            fullName: this.state.owner.fullName,
            email: this.state.owner.email
        });
    }

    onSuccess() {
        this.props.history.push('/owner/pets');
    }

    confirmEditOwner(event) {

        event.preventDefault();

        // disable the button
        this.setState({
            disableBtn: true
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

        ReactGA.event({
            category: "user_edited_owner_details",
            action: "User Edited Owner Details",
        });
        //change password validation
        if (this.state.changePassword != this.state.changePassword2) {
            showMessageFull("Failed to Change Password", "New Passwords do not match", null);
            this.setState({
                changePassword: "",
                changePassword2: "",
                oldPassword: ""
            });
            return;
        }

        if (this.state.oldPassword == "") {
            showMessageFull("Failed to Change Password", "Old Password cannot be empty", null);
            this.setState({
                changePassword: "",
                changePassword2: "",
                oldPassword: ""
            });
            return;
        }

        //create pet
        setLoading("Editing Owner " + this.state.fullName + "...");

        changePassword(this.state.oldPassword, this.state.changePassword).then(response => {
            if (response.success) {
                showMessageFull("Successfully Changed Password", "Successfully Changed Password", this.onSuccess);
            } else {
                showMessageFull("Failed to Change Password", response.message, null);
            }
            dismissLoading();
        })


    }

    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }

    handleSubmit(event) {
        event.preventDefault();

        // disable the button
        this.setState({
            createBtn: true
        });

        // added delay to change button text to previous
        setTimeout(
            function () {
                // enable the button
                this.setState({
                    createBtn: false
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
                                <h4>Editing Owner Profile</h4>
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
                                            onSubmit={this.confirmEditOwner}>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Full Name</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.fullName}
                                                            onChange={e => this.handleFormValueChange("fullName", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="fullName"
                                                            disabled
                                                        />
                                                    </div>
                                                </div >
                                            </div >
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
                                                            disabled
                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <h4><u>Password Change</u></h4>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Old Password</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.oldPassword}
                                                            onChange={e => this.handleFormValueChange("oldPassword", e)}
                                                            type="password"
                                                            className="form-control"
                                                            name="oldPassword"

                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>New Password</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.changePassword}
                                                            onChange={e => this.handleFormValueChange("changePassword", e)}
                                                            type="password"
                                                            className="form-control"
                                                            name="changePassword"

                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Confirm New Password</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.changePassword2}
                                                            onChange={e => this.handleFormValueChange("changePassword2", e)}
                                                            type="password"
                                                            className="form-control"
                                                            name="changePassword2"

                                                        />
                                                    </div>
                                                </div >
                                            </div >
                                            <div className="col-sm-12 col-md-12">
                                                <button className="btn-tall btn-success" type="submit" disabled={this.state.disableBtn}>Confirm Edit</button>
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

export default withRouter(OwnerEditDetailsComponent);