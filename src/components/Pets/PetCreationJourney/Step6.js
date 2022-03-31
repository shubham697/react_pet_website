import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";

class PetCreationJourneyStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            petType: "",
            dateOfDeparture: "",
            special: "",
            bestMemory: ""
        };

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
        pet2.petType = this.state.petType;
        pet2.dateOfDeparture = this.state.dateOfDeparture;
        pet2.special = this.state.special;
        pet2.bestMemory = this.state.bestMemory;
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
                                <h2>We want to know more about <u>{this.state.pet.name}</u></h2>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    <p style={{ fontSize: "20px" }}>Your candle is getting ready...</p>
                                    <div className="col-md-12" >
                                        <form
                                            id="contactForm1"
                                            className="contact-us-form"
                                            noValidate="novalidate">
                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Type/Breed:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <input value={this.state.petType}
                                                            onChange={e => this.handleFormValueChange("petType", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="petType"
                                                            placeholder="Pet Type/Breed"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Date of Departure</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <input value={this.state.dateOfDeparture}
                                                            onChange={e => this.handleFormValueChange("dateOfDeparture", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="dateOfDeparture"
                                                            placeholder="Date of Departure (MM/DD/YYYY)"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Tell us why {this.state.pet.name} was special to you.</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.special}
                                                            onChange={e => this.handleFormValueChange("special", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="special"
                                                            placeholder="He/she was special because"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div >

                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>What is your best memory of {this.state.pet.name}?</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.bestMemory}
                                                            onChange={e => this.handleFormValueChange("bestMemory", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="bestMemory"
                                                            placeholder="Our best memory was"
                                                            required="required" /
                                                        >
                                                    </div>
                                                </div >
                                            </div >


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
                            <div className=" col-sm-12 col-md-6 col-lg-6 text-center">
                                <img src="img/placeholder/PetDetails.jpg" className="rounded text-center" width="100%" />
                            </div>
                        </div>

                    </div>

                }
            </React.Fragment>
        );
    }
}

export default PetCreationJourneyStep1;