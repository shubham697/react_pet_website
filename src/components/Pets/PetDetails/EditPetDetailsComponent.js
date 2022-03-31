import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import ownerStore from "../../../stores/ownerStore";
import { updatePet, loadCurrentPet, removePetMedia, addPetMedia } from "../../../actions/petActions";
import { getSpecies, getBreed } from "../../../actions/adminActions";
import { showMessageFull } from "../../../actions/messageActions";
import { dismissLoading, setLoading } from "../../../actions/loadingActions";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import ReactGA from 'react-ga';
import CroppingModal from "../../Modals/ProfilePhotoEditModal";
import { BrowserView, MobileView } from "react-device-detect";

class PetCreationJourneyStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableBtn: false,
            pet: {},
            petName: "",
            petId: props.petId,
            petBreed: "",
            petSpecies: "",
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
            optionsGender: [{ label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Unknown", value: "Unknown" }],
            optionsSpeciesLoading: true,
            labelField: "label",
            valueField: "value",
            petAge: 0,
            petGender: "Male",
            allowDiscover: true,
            allowShareSocialMedia: true,
            profilePictureChange: null,
            pictures: [],
            allMedia: [],
            removingMedia: [],
            previewPhoto: null,
            cropCallback: this.croppedObject
        };

        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
        this.backList = this.backList.bind(this);
        this.confirmEditPet = this.confirmEditPet.bind(this);
        this.dismissLoadingOverlay = this.dismissLoadingOverlay.bind(this);
        this.handleChangeChk = this.handleChangeChk.bind(this);
        this.onDropProfile = this.onDropProfile.bind(this);
        this.removeMedia = this.removeMedia.bind(this);
        this.addPetMedia = this.addPetMedia.bind(this);
        this.croppedObject = this.croppedObject.bind(this);

    }

    croppedObject(image, pObject) {
        pObject.setState({
            profilePictureChange: [image],
            previewPhoto: URL.createObjectURL(image),
            cropping: false
        });

    }

    componentDidMount() {
        ReactGA.event({
            category: "user_visited_edit_pet_page",
            action: "User visited edit pet page",
        });
        setLoading("Loading Pet Details, Please Wait...");
        petStore.addChangeListener(this.onChange);
        //get stuff
        loadCurrentPet(this.state.petId);
        this.LoadSpeciesChoices();
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    addPetMedia() {
        if (this.state.pictures.length == 0) {
            showMessageFull("Successfully Edit Pet Details", "You have successfully edited your pet details", this.backList);
            dismissLoading();
        } else {
            addPetMedia(this.state.petId, this.state.pictures).then(response => {
                if (response.success) {
                    showMessageFull("Successfully Edit Pet Details", "You have successfully edited your pet details", this.backList);
                    dismissLoading();
                } else {
                    showMessageFull("Error editing Pet Details", "You have failed to edit your pet details: " + response.message, this.backList);
                    dismissLoading();
                }
            });
        }
    }

    backList() {
        this.props.history.push('/owner/pets');
    }

    onChange() {
        this.setState({
            pet: petStore.getSelectedPet()
        })
        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);
    }

    dismissLoadingOverlay() {
        dismissLoading();
        let selectedOption = 0;
        for (let i = 0; i < this.state.optionsGender.length; i++) {
            if (this.state.optionsGender[i].value == this.state.pet.gender) {
                selectedOption = i;
                break;
            }
        }
        this.setState({
            petName: this.state.pet.petName,
            petBreed: this.state.pet.petBreed,
            petSpecies: this.state.pet.petSpecies,
            dateOfDeparture: new Date(this.state.pet.dateOfDepartureParsed),
            special: this.state.pet.description[0],
            bestMemory: this.state.pet.description[1],
            allowDiscover: this.state.pet.allowSharingDiscover == null ? true : this.state.pet.allowSharingDiscover,
            allowShareSocialMedia: this.state.pet.allowSharing == null ? true : this.state.pet.allowSharing,
            petAge: this.state.pet.age,
            petGender: this.state.pet.gender,
            profilePhoto: this.state.profilePictureChange,
            allMedia: this.state.pet.media
        });
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
                let isContainCurrentBreed = false
                let breedObject = [];
                for (const obj of res.data) {
                    if (obj.breedName == this.state.petBreed) {
                        isContainCurrentBreed = true
                    }
                    breedObject.push({ label: obj.breedName, value: obj.breedName });
                }
                this.setState({
                    optionsBreed: breedObject,
                });
                if (isContainCurrentBreed == false) {
                    this.setState({
                        petBreed: '',
                    });
                }
            }
            dismissLoading();
        })
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

    confirmEditPet(event) {
        event.preventDefault();

        // disable the button
        this.setState({
            disableBtn: true
        });

        // added delay to change button text to previous
        setTimeout(
            function () {
                // enable the button
                this.setState({
                    disableBtn: false
                })
            }.bind(this),
            3000
        );

        ReactGA.event({
            category: "user_edited_pet_page",
            action: "User edited pet",
        });

        //create pet
        setLoading("Editing Pet (" + this.state.petName + "), please wait...");



        //call action
        let petObject = {
            petID: this.state.petId,
            petName: this.state.petName,
            petBreed: this.state.petBreed,
            petSpecies: this.state.petSpecies,
            dateOfDeparture: this.state.dateOfDeparture,
            description1: this.state.special,
            description2: this.state.bestMemory,
            allowSharing: this.state.allowShareSocialMedia == "on" ? true : false,
            allowSharingDiscover: this.state.allowDiscover == "on" ? true : false,
            age: parseInt(this.state.petAge),
            gender: this.state.petGender,
            profilePhoto: this.state.profilePictureChange
        }
        if (this.state.petBreed == "" || this.state.petBreed == null) {
            petObject.petBreed = this.state.petSpecies;
        }
        else {
            petObject.petBreed = this.state.petBreed;
        }

        updatePet(petObject).then(_petObject => {
            if (_petObject.success) {
                if (this.state.removingMedia.length > 0) {
                    removePetMedia(this.state.petId, this.state.removingMedia).then(response => {
                        this.addPetMedia();
                    });
                } else {
                    this.addPetMedia();
                }

            } else {
                showMessageFull("Failed to edit Pet Details", "You have failed to edit your pet details. " + _petObject.message, null);
                dismissLoading();
            }
        });
    }

    onDropProfile(picture) {
        if (picture.length == 0) {
            this.setState({
                profilePictureChange: picture,
                previewPhoto: null,
            });
            return;
        }
        if (picture.length == 2) {
            picture = picture.splice(1, 1);
        }
        this.setState({
            profilePictureChange: picture,
            cropping: true
        });
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
    }

    removeMedia(media) {
        let _removingMedia = this.state.removingMedia;
        _removingMedia.push(media.mediaID);
        let remainingMedia = this.state.allMedia;
        for (var i = 0; i < remainingMedia.length; i++) {
            if (remainingMedia[i]._id == media._id) {
                remainingMedia.splice(i, 1);
                break;
            }
        }
        this.setState({ removingMedia: _removingMedia, allMedia: remainingMedia });

    }

    handleChangeChk(inputName, event) {
        if (inputName == "discovery") {
            this.setState({ allowDiscover: event.target.value });
        } else {
            this.setState({ allowShareSocialMedia: event.target.value });
        }
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
                    <div className="container mt-100 animated fadeIn ">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 text-center">
                                <h4>Editing <u>{this.state.pet.petName} the {this.state.pet.petBreed}</u></h4>
                            </div>
                        </div>
                        <BrowserView>
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6  mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <h5><u>Profile Picture</u></h5>
                                    <br />
                                    {(this.state.profilePhoto == null || this.state.profilePhoto[0] == null) && this.state.previewPhoto == null &&
                                        <img src={this.state.pet.profilePhoto} style={{ width: "40%" }} />
                                    }
                                    {this.state.previewPhoto != null &&
                                        <img style={{ width: "50%" }}
                                            src={this.state.previewPhoto}
                                        />
                                    }
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6  mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <h5><u>All Pictures</u></h5>
                                    <div class="row-fluid">
                                        <div className="all-images-area">

                                            {(this.state.allMedia || []).map((picture, index) => {
                                                return (
                                                    <div className="all-images-img" key={index}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <img src={picture.url} style={{ maxHeight: "15em" }} />
                                                            </div>
                                                            <div className="col-12">
                                                                <button className="btn btn-danger" onClick={() => this.removeMedia(picture)}>Remove Image</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <ImageUploader
                                        buttonText='Change Profile Image'
                                        onChange={this.onDropProfile}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                        withIcon={false}
                                        fileContainerStyle={{ boxShadow: "0 0 0 0" }}
                                        label={this.state.profilePhoto == null ? "No Photo Selected" : this.state.profilePhoto[0] == null ? "No Photo Selected" : "Selected: " + this.state.profilePhoto[0].name}
                                        buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                    />
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <ImageUploader
                                        buttonText='Add more images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                        maxFileSize={15242880}
                                        withPreview={true}
                                        singleImage={true}
                                        withIcon={false}
                                        fileContainerStyle={{ boxShadow: "0 0 0 0" }}
                                        label="Max File Size 15mb"
                                        buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                    />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6  mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <h5><u>Profile Picture</u></h5>
                                    <br />
                                    {(this.state.profilePhoto == null || this.state.profilePhoto[0] == null) && this.state.previewPhoto == null &&
                                        <img src={this.state.pet.profilePhoto} style={{ width: "40%" }} />
                                    }
                                    {this.state.previewPhoto != null &&
                                        <img style={{ width: "50%" }}
                                            src={this.state.previewPhoto}
                                        />
                                    }
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <ImageUploader
                                        buttonText='Change Profile Image'
                                        onChange={this.onDropProfile}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                        withIcon={false}
                                        withLabel={false}
                                        fileContainerStyle={{ boxShadow: "0 0 0 0" }}
                                        label={this.state.profilePhoto == null ? "No Photo Selected" : this.state.profilePhoto[0] == null ? "No Photo Selected" : "Selected: " + this.state.profilePhoto[0].name}
                                        buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6  mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <h5><u>All Pictures</u></h5>
                                    <div class="row-fluid">
                                        <div className="all-images-area">

                                            {(this.state.allMedia || []).map((picture, index) => {
                                                return (
                                                    <div className="all-images-img" key={index}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <img src={picture.url} style={{ maxHeight: "15em" }} />
                                                            </div>
                                                            <div className="col-12">
                                                                <button className="btn btn-danger" onClick={() => this.removeMedia(picture)}>Remove Image</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                    <ImageUploader
                                        buttonText='Add more images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                        maxFileSize={15242880}
                                        withPreview={true}
                                        singleImage={true}
                                        withIcon={false}
                                        withLabel={false}
                                        fileContainerStyle={{ boxShadow: "0 0 0 0" }}
                                        label="Max File Size 15mb"
                                        buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                    />
                                </div>
                            </div>
                        </MobileView>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    <div className="col-md-12" >
                                        <form
                                            id="contactForm1"
                                            className="contact-us-form"
                                            noValidate="novalidate"
                                            onSubmit={this.confirmEditPet}>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Name</label>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={this.state.petName}
                                                            onChange={e => this.handleFormValueChange("petName", e)}
                                                            type="text"
                                                            className="form-control"
                                                            name="petName"
                                                            disabled
                                                        />
                                                    </div>
                                                </div >
                                            </div >


                                            <div className="row" >
                                                <div className="col-sm-6 col-6" >
                                                    <label>Species:</label>
                                                </div>
                                                <div className="col-sm-6 col-6" >
                                                    <div className="form-group" >
                                                        <Select
                                                            searchable={false}
                                                            values={[{ label: this.state.petSpecies, value: this.state.petSpecies }]}
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
                                                        <Select
                                                            searchable={false}
                                                            values={[{ label: this.state.petBreed, value: this.state.petBreed }]}
                                                            options={this.state.optionsBreed}
                                                            onChange={(values) => this.onChangeDropdown(values, "breed")} />
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

                                            <div className="row" >
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
                                                            values={[{ label: this.state.pet.gender, value: this.state.pet.gender }]}
                                                        />
                                                    </div>
                                                </div >
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>Tell us why <u>{this.state.pet.name}</u> was special to you.</label>
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

                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <label>What is your best memory of <u>{this.state.pet.name}</u>?</label>
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
                                            <div className="col-sm-12 col-md-12  mb-10">
                                                <button className="btn-tall btn-danger" onClick={this.backList}>Back to Pets List</button>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <button className="btn-tall btn-success" type="submit" disabled={this.state.disableBtn}>Confirm Edit</button>
                                            </div>

                                        </form >
                                        <p className="form-message" ></p>
                                    </div >
                                </div>
                            </div>

                        </div>

                    </div>

                }
                {this.state.cropping &&
                    <CroppingModal cImg={this.state.profilePictureChange[0]} callbackFunc={this.state.cropCallback} parent={this} />
                }
            </React.Fragment>
        );
    }
}

export default withRouter(PetCreationJourneyStep1);