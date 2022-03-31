import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";
import ImageUploader from 'react-images-upload';

class PetCreationJourneyStep3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            disableContactBtn: false,
            contactBtnText: "Next Step",
            pictures: [],
            profilePicture: null
        };

        this.onDrop = this.onDrop.bind(this);
        this.onDropProfile = this.onDropProfile.bind(this);

        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    onDropProfile(picture) {
        this.setState({
            profilePicture: picture
        });
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
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
        pet2.profilePicture = this.state.profilePicture;
        pet2.pictures = this.state.pictures;

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
                                <h2>Rest Assured we will take good care of</h2>
                                <h3><b><u>{this.state.pet.name}</u></b></h3>
                                <br />
                                <div className="row justify-content-center align-items-center" >

                                    <div className="col-md-12" >
                                        <h4>Select a Profile Picture</h4>
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText='Upload Profile Image'
                                            onChange={this.onDropProfile}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                            maxFileSize={15242880}
                                            withPreview={true}
                                            singleImage={true}
                                            fileContainerStyle={{ boxShadow: "0 0 0 0", border: "1px solid #000000", display: "inline-block", margin: "0", padding: "0" }}
                                            buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                            label="Max file size: 15mb"
                                        />
                                    </div >


                                </div>
                                {
                                    (this.state.profilePicture != null) &&
                                    <div className="row justify-content-center align-items-center" >
                                        <div className="col-md-12" >
                                            <h4>Upload any other pictures.</h4>
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='Choose images'
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                withPreview={true}
                                                label="Max file size: 15mb"
                                            />
                                        </div >
                                    </div>
                                }
                                <div className="row text-center" style={{ marginBottom: "10px" }}>
                                    <div className="col-md-12">
                                        <button className="btn btn-success" onClick={this.nextStep}>Proceed to Next Step</button>
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

export default PetCreationJourneyStep3;