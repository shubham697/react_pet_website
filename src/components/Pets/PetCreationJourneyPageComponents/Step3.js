import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { validateNull } from "../../../utils/validation";
import { showMessageFull, showMessage } from "../../../actions/messageActions";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";
import ImageUploader from 'react-images-upload';
import ReactGA from 'react-ga';
import CroppingModal from "../../Modals/ProfilePhotoEditModal";
import {
    isMobile,
    isBrowser
} from "react-device-detect";
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll';

class PetCreationJourneyStep3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            disableContactBtn: false,
            contactBtnText: "Next Step",
            pictures: [],
            profilePicture: [],
            previewPhoto: null,
            currentStep: props.currentStep,
            totalSteps: props.totalSteps,
            nextStepMethod: props.nextStep,
            prevStepMethod: props.previousStep,
            cropping: false,
            cropCallback: this.croppedObject
        };

        this.onDrop = this.onDrop.bind(this);
        this.onDropProfile = this.onDropProfile.bind(this);

        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.croppedObject = this.croppedObject.bind(this);
    }

    croppedObject(image, pObject) {
        pObject.setState({
            profilePicture: [image],
            previewPhoto: URL.createObjectURL(image),
            cropping: false
        });

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

    onDropProfile(picture) {
        if (picture.length == 0) {
            this.setState({
                profilePicture: picture,
                previewPhoto: null,
            });
            return;
        }
        if (picture.length == 2) {
            picture = picture.splice(1, 1);
        }
        this.setState({
            profilePicture: picture,
            cropping: true
        });
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
    }

    componentDidMount() {
        ReactGA.event({
            category: "pet_creation_step_3",
            action: "User entered step 3 of pet creation",
        });
        petStore.addChangeListener(this.onChange);

        setTimeout(function () {
            this.dismissChat();
        }.bind(this), 500);
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
        if (!validateNull(this.state.profilePicture[0])) {
            showMessageFull("Invalid Pet Profile Picture", "Pets must have at least one profile picture");
            return;
        }
        let pet2 = this.state.pet;
        pet2.profilePicture = this.state.profilePicture;
        console.log(this.state.profilePicture);
        pet2.pictures = this.state.pictures;

        updatePetCreation(pet2);
        incrementPetCreationStep();

        this.state.nextStepMethod();
        scroll.scrollToTop();
    }

    prevStep() {
        //post the name object to update pet creation object
        this.state.prevStepMethod();
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
                        <div className="">
                            <div className="col-md-12 col-lg-12 text-center">
                                <h4 style={{ color: "#f78459" }}>Rest Assured we will take good care of</h4>
                                <h4 style={{ color: "#f78459" }}><b><u>{this.state.pet.petName}</u></b></h4>
                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    {this.state.previewPhoto != null &&
                                        <div className="col-md-6" >
                                            <h5>Profile Picture Preview</h5>
                                            <img style={{ height: "14em" }}
                                                src={this.state.previewPhoto}
                                            />
                                        </div >
                                    }
                                    {
                                        this.state.previewPhoto == null ?
                                        <div className="col-md-12" >
                                            <h5>Select a Profile Picture</h5>
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='Upload Profile Image'
                                                onChange={this.onDropProfile}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                withPreview={false}
                                                withLabel={false}
                                                singleImage={true}
                                                label="Max file size: 15mb"
                                                fileContainerStyle={{ boxShadow: "0 0 0 0", border: "1px solid #000000", verticalAlign: "middle", width: "12em", height: "12em", padding: "10px" }}
                                                buttonStyles={{ background: "#989898", borderRadius: "10px" }}
                                            />
                                        </div >
                                        :
                                        <div className="col-md-12" >
                                            <ImageUploader
                                                withIcon={false}
                                                buttonText='Change Profile Image'
                                                onChange={this.onDropProfile}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                withPreview={false}
                                                withLabel={false}
                                                singleImage={true}
                                                label="Max file size: 15mb"
                                                fileContainerStyle={{ boxShadow: "0 0 0 0", padding: "0px" }}
                                                buttonStyles={{ background: "#989898", borderRadius: "10px" }}
                                            />
                                        </div >
                                    }

                                </div>
                                {
                                    (this.state.profilePicture != null) &&
                                    <div className="row justify-content-center align-items-center" >
                                        <div className="col-md-12 mt-25" >
                                            <h4>Upload any other pictures.</h4>
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='Choose images'
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                withLabel={false}
                                                withPreview={true}
                                                label="Max file size: 15mb"
                                                fileContainerStyle={{  boxShadow: "0 0 0 0", border: "1px solid #000000", verticalAlign: "middle", width: "12em", minHeight: "12em", padding: "10px" }}
                                                buttonStyles={{ background: "#989898", borderRadius: "10px" }}
                                            />
                                        </div >
                                    </div>
                                }
                                <div className="row justify-content-center" style={{ marginBottom: "5px" }}>
                                    <div className="col-sm-12 col-md-12 mt-25">
                                        <button className="btn btn-success" onClick={this.nextStep}>
                                            <p className="button-text">Proceed to Next Step</p>
                                        </button>
                                    </div>
                                    <div className="col-sm-12 col-md-12">
                                        <a style={{ cursor: "pointer" }} onClick={this.prevStep}>Back to Previous Step</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                }
                {this.state.cropping &&
                    <CroppingModal cImg={this.state.profilePicture[0]} callbackFunc={this.state.cropCallback} parent={this} />
                }
            </React.Fragment>
        );
    }
}

export default PetCreationJourneyStep3;