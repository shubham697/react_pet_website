import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction } from "../../../actions/petActions";
import { customStyles } from "../../../constants/styles";
import Header from '../../../components/Header/header';
import TitleSection from './TitleSection';
import Footer from '../../../components/footer/footer';
import StepWizard from 'react-step-wizard';
import Step1Details from "../PetCreationJourneyPageComponents/Step1";
import Step2Details from "../PetCreationJourneyPageComponents/Step2";
import Step3Details from "../PetCreationJourneyPageComponents/Step3";
import Step6Details from "../PetCreationJourneyPageComponents/Step6";
import Step7Details from "../PetCreationJourneyPageComponents/Step7";

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

                <div>
                    <Header />


                    <div className="row col-md-12 ptb-50 d-flex justify-content-center mt-75">

                        <StepWizard>
                            {/*<Step1Details />*/}
                            <Step2Details />
                            <Step3Details />
                            <Step6Details />
                            <Step7Details />
                        </StepWizard>
                    </div>

                    <Footer />
                </div>

            </React.Fragment>
        );
    }
}

export default PetCreationJourney;