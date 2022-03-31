import React, { Component } from "react";
import ownerStore from "../../stores/ownerStore";
import { showMessage } from "../../actions/messageActions";
import { dismissLoading, setLoading } from "../../actions/loadingActions";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';

class OwnerEditDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            owner: ownerStore.getOwnerObject(),
            fullName: "",
            email: "",
            oldPassword: "",
            changePassword: "",
            changePassword2: ""
        };

        this.onChange = this.onChange.bind(this);
        this.confirmEditOwner = this.confirmEditOwner.bind(this);
        this.dismissLoadingOverlay = this.dismissLoadingOverlay.bind(this);
        this.handleFormValueChange = this.handleFormValueChange.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "user_visited_owner_details_page",
            action: "User Visited Owner Details",
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

    confirmEditOwner() {
        //create pet
        setLoading("Editing Owner " + this.state.fullName + "...");

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
                                <h4>Viewing Owner Profile</h4>
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
                                            noValidate="novalidate">
                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Full Name:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <label>{this.state.fullName}</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Email:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <label>{this.state.email}</label>
                                                </div>
                                            </div>



                                        </form >
                                        <p className="form-message" ></p>
                                    </div >
                                </div>
                                <div className="row justify-content-center" style={{ marginBottom: "5px" }}>
                                    <div className="col-sm-12 col-md-12">
                                        <a href="/owner/profile/edit"><button className="btn-tall btn-success">Edit Profile Details</button></a>
                                    </div>
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