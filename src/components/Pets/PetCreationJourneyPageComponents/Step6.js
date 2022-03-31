import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import ownerStore from "../../../stores/ownerStore";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation, createPet, generatePetBurialCert } from "../../../actions/petActions";
import { getSpecies, getBreed } from "../../../actions/adminActions";
import { showMessage, showMessageFull } from "../../../actions/messageActions";
import { validatePetObject, validatePet } from "../../../utils/validation";
import { dismissLoading, setLoading } from "../../../actions/loadingActions";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom';
import BurialModal from '../../Modals/DeathCertModal';
import ReactGA from 'react-ga';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll';

class PetCreationJourneyStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            petType: "",
            dateOfDeparture: new Date(),
            special: "",
            bestMemory: "",
            currentStep: props.currentStep,
            totalSteps: props.totalSteps,
            nextStepMethod: props.nextStep,
            prevStepMethod: props.previousStep,
            optionsBreed: [],
            optionsSpecies: [],
            optionsSpeciesLoading: true,
            labelField: "label",
            valueField: "value",
            burialCert: "",
            petCreationSuccess: false,
            optionsGender: [{ label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Unknown", value: "Unknown" }],
            petGender: "Male",
            petAge: 0,
            newPet: null,
            allowDiscover: true,
            allowShareSocialMedia: true,
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.LoadSpeciesChoices = this.LoadSpeciesChoices.bind(this);
        this.LoadBreedChoices = this.LoadBreedChoices.bind(this);
        this.createPet = this.createPet.bind(this);
        this.petBurialDismiss = this.petBurialDismiss.bind(this);
        this.handleChangeChk = this.handleChangeChk.bind(this);

    }

    componentDidMount() {
        ReactGA.event({
            category: "pet_creation_step_6",
            action: "User entered step 6 of pet creation",
        });
        petStore.addChangeListener(this.onChange);
        //get stuff
        this.LoadSpeciesChoices();
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    handleChangeChk(inputName, event) {
        if (inputName == "discovery") {
            this.setState({ allowDiscover: event.target.value });
        } else {
            this.setState({ allowShareSocialMedia: event.target.value });
        }
    }

    LoadSpeciesChoices() {
        getSpecies().then((res) => {
            if (res.success) {
                let speciesObject = [];
                for (const obj of res.data) {
                    speciesObject.push({ label: obj.speciesName, value: obj.speciesName });
                }
                this.setState({
                    optionsSpecies: speciesObject,
                    optionsSpeciesLoading: false
                });
            }
        })
    }

    LoadBreedChoices(species) {
        if (species == "Others") {
            return;
        }
        setLoading("Loading Breeds");
        getBreed(species).then((res) => {
            if (res.success) {
                let breedObject = [];
                for (const obj of res.data) {
                    breedObject.push({ label: obj.breedName, value: obj.breedName });
                }
                this.setState({
                    optionsBreed: breedObject
                });

            }
            dismissLoading();
        })
    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
    }

    closeModal() {
        resetPetFunction();
    }

    onChangeDropdown(value, typeC) {
        if (typeC == "breed") {
            this.setState({ petBreed: value[0].value });
        } else if (typeC == "species") {

            this.setState({ petSpecies: value[0].value });
            this.setState({ optionsBreed: [] });
            //load breed
            this.LoadBreedChoices(value[0].value);
        } else if (typeC == "date") {
            this.setState({ dateOfDeparture: value });
        } else if (typeC == "petGender") {
            this.setState({ petGender: value[0].value });
        }

    }

    nextStep() {
        //post the name object to update pet creation object
        let pet2 = this.state.pet;
        if (this.state.petBreed == "" || this.state.petBreed == null) {
            pet2.petBreed = this.state.petSpecies;
        }
        else {
            pet2.petBreed = this.state.petBreed;
        }
        pet2.petSpecies = this.state.petSpecies;
        pet2.dateOfDeparture = this.state.dateOfDeparture;
        pet2.special = this.state.special;
        pet2.bestMemory = this.state.bestMemory;
        pet2.age = this.state.petAge;
        pet2.gender = this.state.petGender;
        pet2.allowSharing = this.state.allowShareSocialMedia;
        pet2.allowSharingDiscover = this.state.allowDiscover;

        if (validatePet(pet2) != "") {
            showMessageFull("Error in Creating Pet", validatePet(pet2), null);
            return;
        }

        updatePetCreation(pet2);
        incrementPetCreationStep();

        if (ownerStore.getOwnerObject().jwt == null)
            this.state.nextStepMethod();
        else
            this.createPet();

        scroll.scrollToTop();
    }

    petBurialDismiss() {
        //GO TO PET PAGE*****
        this.props.history.push('/owner/pets');
    }

    createPet() {
        //create pet
        let petObject = {
            petName: this.state.pet.petName,
            description1: this.state.pet.special,
            description2: this.state.pet.bestMemory,
            petBreed: this.state.pet.petBreed,
            petSpecies: this.state.pet.petSpecies,
            profilePhoto: this.state.pet.profilePicture[0],
            media: this.state.pet.pictures,
            dateOfDeparture: this.state.pet.dateOfDeparture,
            age: this.state.petAge,
            gender: this.state.petGender,
            allowSharing: this.state.allowShareSocialMedia,
            allowSharingDiscover: this.state.allowDiscover
        }
        if (validatePetObject(petObject) != "") {
            showMessageFull("Error in Creating Pet", validatePetObject(petObject), null);
            return;
        }

        setLoading("Generating Pet Burial Certificate...");




        let petBurialObject = {
            profilePhoto: this.state.pet.profilePicture[0],
            petName: this.state.pet.petName,
            dateOfDeparture: this.state.pet.dateOfDeparture
        }

        generatePetBurialCert(petBurialObject).then(response => {
            if (response.success) {
                setLoading("Creating Pet...");
                petObject.deathCert = response.data;
                this.setState({ burialCert: response.data });
                let createPetResponse = createPet(petObject).then((res) => {
                    dismissLoading();
                    if (!res.success) {
                        //show modal wrong with message
                        let messageObject = {
                            header: "Error with Pet Creation",
                            message: res.message
                        };
                        showMessage(messageObject);
                    } else {
                        ReactGA.event({
                            category: "pet_creation_successful",
                            action: "User successfully created pet",
                        });
                        //show modal success
                        let messageObject = {
                            header: "Successfully Created Pet",
                            message: "You have successfully created your pet companion. Please login to view your pets."
                        };
                        //showMessage(messageObject);
                        this.setState({ petCreationSuccess: true, newPet: res.data });
                    }

                });
            } else {
                let messageObject = {
                    header: "Error with Pet Creation",
                    message: response.message
                };
                showMessage(messageObject);
            }
        });
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
                        <div className="row">
                            <div className="col-md-12 col-lg-12 text-center">
                                <h4 style={{ color: "#f78459" }}>Your candle is getting ready...</h4>
                                <h4>Meanwhile, we want to know more about <u>{this.state.pet.petName}</u></h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12 text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    <div className="col-md-12" >
                                        <form
                                            id="contactForm1"
                                            className="contact-us-form"
                                            noValidate="novalidate">
                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Species:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <Select
                                                            searchable={false}
                                                            options={this.state.optionsSpecies}
                                                            onChange={(values) => this.onChangeDropdown(values, "species")}
                                                            loading={this.state.optionsSpeciesLoading}
                                                        />
                                                    </div>
                                                </div >
                                            </div>
                                            {this.state.optionsBreed.length > 0 && <div className="row  mt-10" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Breed:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <Select searchable={false} options={this.state.optionsBreed} onChange={(values) => this.onChangeDropdown(values, "breed")} />
                                                    </div>
                                                </div >
                                            </div>
                                            }


                                            <div className="row mt-10" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Date of Departure</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <DatePicker
                                                            selected={this.state.dateOfDeparture}
                                                            onChange={(date) => this.onChangeDropdown(date, "date")}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                        />
                                                    </div>
                                                </div >
                                            </div>
                                            <div className="row mt-10" >
                                                <div className="col-sm-2 col-2" >
                                                    <label>Age</label>
                                                </div>
                                                <div className="col-sm-3 col-3" >
                                                    <div className="form-group" >
                                                        <input value={this.state.petAge}
                                                            onChange={e => this.handleFormValueChange("petAge", e)}
                                                            type="number"
                                                            className="form-control"
                                                            name="petAge"
                                                        />
                                                    </div>
                                                </div >
                                                <div className="col-sm-3 col-3" >
                                                    <label>Gender</label>
                                                </div>
                                                <div className="col-sm-4 col-4" >
                                                    <div className="form-group" >
                                                        <Select
                                                            searchable={false}
                                                            options={this.state.optionsGender}
                                                            onChange={(value) => this.onChangeDropdown(value, "petGender")}
                                                            values={[{ label: this.state.petGender, value: this.state.petGender }]}
                                                        />
                                                    </div>
                                                </div >
                                            </div>
                                            <div className="row mt-10" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Tell us why <u>{this.state.pet.petName}</u> was special to you.</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <textarea value={this.state.special}
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

                                            <div className="row mt-10" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>What is your best memory of <u>{this.state.pet.petName}</u>?</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <textarea value={this.state.bestMemory}
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
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >

                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" onChange={(e) => this.handleChangeChk("discovery", e)} defaultChecked={this.state.allowDiscover}>

                                                        </input>
                                                        <label class="form-check-label" for="exampleCheck1">Allow my pet to be featured on Discovery Page</label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-12" >
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" onChange={(e) => this.handleChangeChk("socialmedia", e)} defaultChecked={this.state.allowShareSocialMedia}>

                                                        </input>
                                                        <label class="form-check-label" for="exampleCheck2">Allow my pet to be featured on The Paradise Beyond Social Media</label>
                                                    </div>
                                                </div>
                                            </div>

                                        </form >
                                        <p className="form-message" ></p>
                                    </div >
                                </div>
                                <div className="row justify-content-center" style={{ marginBottom: "5px" }}>
                                    <div className="col-sm-12 col-md-12">
                                        <button className="btn btn-success" onClick={this.nextStep} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
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
                {this.state.petCreationSuccess && this.state.newPet != null &&
                    <BurialModal burialCert={this.state.burialCert} callbackFunc={this.petBurialDismiss} petID={this.state.newPet.petID} />
                }
            </React.Fragment>
        );
    }
}

export default withRouter(PetCreationJourneyStep1);