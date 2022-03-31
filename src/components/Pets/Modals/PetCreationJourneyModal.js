import React, { Component } from "react";
import Modal from 'react-modal';
import petStore from "../../../stores/petStore";
import { resetPetFunction } from "../../../actions/petActions";
import { customStyles } from "../../../constants/styles";
import Step1Details from "../PetCreationJourney/Step1Route";
import Step2Details from "../PetCreationJourney/Step2";
import Step3Details from "../PetCreationJourney/Step3";
import Step4Details from "../PetCreationJourney/Step4";
import Step5Details from "../PetCreationJourney/Step5";
import Step6Details from "../PetCreationJourney/Step6";
import Step7Details from "../PetCreationJourney/Step7";

class PetCreationJourney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            createBtn: false,
            pet: {},
            cStyle: customStyles,
            showMode: props.showModal
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        petStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
        this.setState({ currentStep: petStore.getPetCreationStep() })
    }

    closeModal() {
        resetPetFunction();
    }

    openPetCreation() {
        this.setState({
            open_pet_creation: true
        });

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

                <Modal isOpen={this.state.showMode}
                    onRequestClose={this.closeModal}
                    style={this.state.cStyle}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Pet Creation Modal">
                    {
                        (this.state.currentStep === 1) &&
                        <Step1Details />

                    }
                    {
                        (this.state.currentStep === 2) &&
                        <Step2Details />

                    }
                    {
                        (this.state.currentStep === 3) &&
                        <Step3Details />

                    }
                    {
                        (this.state.currentStep === 4) &&
                        <Step4Details />

                    }
                    {
                        (this.state.currentStep === 5) &&
                        <Step5Details />

                    }
                    {
                        (this.state.currentStep === 6) &&
                        <Step6Details />

                    }
                    {
                        (this.state.currentStep === 7) &&
                        <Step7Details />

                    }
                </Modal>
            </React.Fragment>
        );
    }
}

export default PetCreationJourney;