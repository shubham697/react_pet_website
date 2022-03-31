import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";

class PetCreationJourneyStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            ownerName: "",
            email: "",
            password: ""
        };
        console.log(this.state.pet);
        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        petStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
    }

    closeModal() {
        resetPetFunction();
    }

    nextStep() {
        //post the name object to update pet creation object
        let pet2 = this.state.pet;
        pet2.owner = this.state.ownerName;
        updatePetCreation(pet2);
        incrementPetCreationStep();
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

                    <div className="container animated fadeIn">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 text-center">
                                <h2>Your candle has been lit.</h2>
                            </div>
                        </div>

                        <div className="row">
                            {/*<div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                <img src="img/placeholder/CandleFinal.jpg" className="rounded text-center" maxWidth="100%" />
                </div>*/}
                            <div className="col-sm-12 col-md-12 col-lg-12 text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                                <br />
                                <div className="row text-center justify-content-center align-items-center" >
                                    <p style={{ fontSize: "20px" }}>To finalize your candle an account needs to be created.</p>
                                    <div className="col-md-12" >
                                        <form
                                            id="contactForm1"
                                            className="contact-us-form"
                                            noValidate="novalidate">
                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Your Name:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <input value={this.state.petType}
                                                            onChange={e => this.handleFormValueChange("ownerName", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="ownerName"
                                                            placeholder="Your Name"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Your Email:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <input value={this.state.email}
                                                            onChange={e => this.handleFormValueChange("email", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="example@example.com"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Password:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <input value={this.state.password}
                                                            onChange={e => this.handleFormValueChange("password", e)}
                                                            type="password"
                                                            className="form-control"
                                                            name="password"
                                                            placeholder="*********"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div>
                                        </form >
                                        <p className="form-message" ></p>
                                    </div >
                                </div>
                                <div className="row text-center" style={{ marginBottom: "10px" }}>
                                    <div className="col-md-12">
                                        <button className="btn btn-success" onClick={this.nextStep}>I want to share more of my Companion</button>
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <div className="col-md-12">
                                        <button className="btn btn-danger" onClick={this.closeModal}>I refuse to light the candle for my Pet</button>
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

export default PetCreationJourneyStep1;