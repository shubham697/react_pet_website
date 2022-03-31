import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep } from "../../../actions/petActions";
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
            currentStep: props.currentStep,
            totalSteps: props.totalSteps,
            nextStepMethod: props.nextStep,
            prevStepMethod: props.prevStep
        };

        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);

        setTimeout(function () {
            this.dismissChat();
        }.bind(this), 500);
    }



    componentDidMount() {
        ReactGA.event({
            category: "pet_creation_step_1",
            action: "User entered step 1 of pet creation",
        });
        petStore.addChangeListener(this.onChange);
        scroll.scrollToTop();
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    dismissChat() {
        if (isMobile) {
            var elem = document.getElementById("purechat-container");
            if (elem != null) {
                elem.remove();
            } else {
                setTimeout(function () {
                    this.dismissChat();
                }.bind(this), 500);
            }
        }
    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
    }

    closeModal() {
        resetPetFunction();
    }

    nextStep() {
        incrementPetCreationStep();
        this.state.nextStepMethod();
        scroll.scrollToTop();
    }

    /*handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] =
            event.target.type === "checkbox" ?
                event.target.checked :
                event.target.value;
        this.setState(stateValue);
    }*/

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
                        <div className="row align-items-center justify-content-center mb-25">
                            {isBrowser && <div className="col-sm-12 col-md-6 col-lg-6 text-center">
                                <img src="img/main/pet/pet_creation_1.png" className="rounded text-center" width="70%" />
                            </div>}
                            <div className="col-sm-12 col-md-6 col-lg-6 text-center">
                                <h4 style={{ color: "#f78459" }}>Real Pet, Real Stories Commitment</h4>
                                <br />
                                <p style={{ fontSize: "18px", textAlign: "justify" }}>We are sorry for your lost and we are glad that you are taking this first step towards recovery. After all, our pet companions are like family to us.</p>
                                <br />
                                <p style={{ fontSize: "18px", textAlign: "justify" }}>Pets Haven features <b>real stories of real pets</b> who have passed on.We welcome you to this community of pet owners who help one another get over grief of the loss of a faithful companion.</p>

                            </div>
                        </div>
                        <div className="row text-center" style={{ marginBottom: "10px" }}>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <a className="btn btn-danger" href="/home">
                                    <p className="button-text">Refuse to this committment</p>
                                </a>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <button className="btn btn-success" onClick={this.nextStep}>
                                    <p className="button-text">Pledge to this commitment</p>
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