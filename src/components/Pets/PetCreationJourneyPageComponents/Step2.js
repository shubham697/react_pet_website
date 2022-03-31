import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { validateStringLength } from "../../../utils/validation";
import { showMessageFull, showMessage } from "../../../actions/messageActions";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";
import ReactGA from 'react-ga';
import {
    isMobile,
    isBrowser
} from "react-device-detect";
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll';

class PetCreationJourneyStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            disableContactBtn: false,
            contactBtnText: "Next Step",
            petName: "",
            currentStep: props.currentStep,
            totalSteps: props.totalSteps,
            nextStepMethod: props.nextStep,
            prevStepMethod: props.prevStep
        };

        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "pet_creation_step_2",
            action: "User entered step 2 of pet creation",
        });
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
        if (!validateStringLength(this.state.petName, 3, 25)) {
            showMessageFull("Invalid Pet Name", "Pet names must be between 3 and 25 characters");
            return;
        }

        this.setState({ scrollTop: 0 });

        //post the name object to update pet creation object
        let pet2 = this.state.pet;
        pet2.petName = this.state.petName;
        updatePetCreation(pet2);
        incrementPetCreationStep();
        this.state.nextStepMethod();
        scroll.scrollToTop();
    }

    handleFormValueChange(inputName, event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.nextStep();
            return;
        }
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

                    <div className="container animated fadeIn" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                        <div className="row mb-25">
                            {isBrowser && <div className=" col-sm-12 col-md-6 col-lg-6 text-center">
                                <img src="img/main/pet/pet_creation_2.png" className="rounded text-center" width="70%" />
                            </div>
                            }
                            <div className="col-sm-12 col-md-6 col-lg-6 text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    <h4 style={{ color: "#f78459" }}>We want to know about your pet companion.</h4>
                                    <p style={{ fontSize: "16px" }}>We know it is hard to lose a pet companion. We know it hurts. We are here for you. Know that you are not alone in this endeavour to send your pet off to a better place.</p>
                                    <p style={{ fontSize: "20px" }}><b>Please share the name of your pet companion.</b></p>

                                </div>
                            </div>

                        </div>

                        <div className="row text-center align-items-center justify-content-center">
                            <div className="col-md-12" >
                                <h4>Please share the name of your pet companion.</h4>
                            </div>
                            <div className="col-md-6" >
                                <form
                                    id="contactForm1"
                                    className="contact-us-form"
                                    noValidate="novalidate">
                                    <div className="row" >
                                        <div className="col-sm-12 col-12" >
                                            <div className="form-group" >
                                                <input value={this.state.petName}
                                                    onChange={e => this.handleFormValueChange("petName", e)}
                                                    type="text"
                                                    className="form-control"
                                                    name="petName"
                                                    placeholder="Enter pet companion name"
                                                    onKeyPress={e => this.handleFormValueChange("enter", e)}
                                                    required="required" /

                                                >
                                            </div>
                                        </div >
                                    </div>

                                </form >
                                <p className="form-message" ></p>
                            </div >
                            <br />
                            <div className="col-md-12">
                                <button className="btn btn-success" onClick={this.nextStep}>
                                    <p className="button-text"> Next </p>
                                </button>
                            </div>
                        </div>

                    </div>

                }
            </React.Fragment>
        );
    }
}

export default PetCreationJourneyStep1;
