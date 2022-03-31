import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import ownerStore from "../../../stores/ownerStore";
import { startOwnerCreation, logoutOwner, startOwnerLogin, loginOwnerSocialMedia, changeFacebookRegistration } from "../../../actions/ownerActions";
import { createPet, generatePetBurialCert } from "../../../actions/petActions";
import { showMessage, showMessageFull } from "../../../actions/messageActions";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import sha256 from 'crypto-js/sha256';
import { setLoading, dismissLoading } from "../../../actions/loadingActions";
import { withRouter } from 'react-router-dom'
import BurialModal from '../../Modals/DeathCertModal';
import ReactGA from 'react-ga';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { validateEmail } from "../../../utils/validation";
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll';
import {
    isMobile as _isMobile
} from "react-device-detect";

class PetCreationJourneyStep7 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            ownerName: "",
            email: "",
            password2: "",
            password: "",
            disableBtn: false,
            btnText: "Register as Owner",
            btnTextFB: "Register with Facebook",
            isRegistration: ownerStore.getCurrentRegistrationStatus(),
            currentStep: props.currentStep,
            totalSteps: props.totalSteps,
            nextStepMethod: props.nextStep,
            prevStepMethod: props.previousStep,
            showNotification: false,
            burialCert: "",
            petCreationSuccess: false,
            newPet: null,
            isFacebookLogin: ownerStore.getCurrentFacebookStatus()
        };

        this.onChange = this.onChange.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.changeBtnText = this.changeBtnText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRegistration = this.changeRegistration.bind(this);
        this.registrationSuccessCallback = this.registrationSuccessCallback.bind(this);
        this.loginRegistrationFailureCallback = this.loginRegistrationFailureCallback.bind(this);
        this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
        this.petBurialDismiss = this.petBurialDismiss.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.resetButtons = this.resetButtons.bind(this);
        this.registerFacebook = this.registerFacebook.bind(this);
        this.onOwnerChange = this.onOwnerChange.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "pet_creation_step_7",
            action: "User entered step 7 of pet creation",
        });
        petStore.addChangeListener(this.onChange);
        ownerStore.addChangeListener(this.onOwnerChange);

        this.changeRegistration();
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
        ownerStore.removeChangeListener(this.onOwnerChange);
    }
    onOwnerChange() {

        this.setState({
            isRegistration: ownerStore.getCurrentRegistrationStatus(),
            isFacebookLogin: ownerStore.getCurrentFacebookStatus()
        });

    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
    }


    loginFacebook(response) {
        let ownerObject = {
            socialMediaId: response.userID,
            socialMediaType: "Facebook",
            password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
        }

        let loginOwnerAction = loginOwnerSocialMedia(ownerObject).then((res) => {
            if (!res.success) {
                this.registerFacebook(response);
            } else {
                ReactGA.set({
                    userId: res.data.email,
                    fullName: res.data.fullName
                });
                //show modal success
                let messageObject = {
                    header: "Successfully Logged In",
                    message: "You have successfully Logged into your account, and your pet companion will be tagged to that account.",
                    callbackFunc: this.loginSuccessCallback
                };
                dismissLoading();
                showMessage(messageObject);

            }
        });
    }

    registerFacebook(response) {
        let ownerObject = {
            email: response.email,
            password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
            fullName: response.name,
            socialMediaID: response.userID,
            socialMediaType: "Facebook",
            profilePhotoUrl: response.picture.data.url
        }

        // added delay to change button text to previous
        setTimeout(
            function () {
                // enable the button
                this.setState({
                    createBtn: false
                })
                this.resetButtons();
            }.bind(this),
            1000
        );

        //await
        let createOwnerAction = startOwnerCreation(ownerObject).then((res) => {
            if (!res.success) {
                /*//show modal wrong with message
                let messageObject = {
                    header: "Error with Registration",
                    message: res.message,
                    callbackFunc: this.loginRegistrationFailureCallback
                };
                showMessage(messageObject);
                dismissLoading();*/
                this.loginFacebook(response);
            } else {
                ReactGA.set({
                    userId: res.data.email,
                    fullName: res.data.fullName
                });
                //show modal success
                let messageObject = {
                    header: "Successfully Registered",
                    message: "You have successfully registered your account, and your pet companion is tagged to that account. Please verify your account via the email link we sent you.",
                    callbackFunc: this.registrationSuccessCallback
                };
                showMessage(messageObject);
                dismissLoading();
                this.props.history.push('/owner/pets');
            }
        });

    }

    changeRegistration() {
        if (this.state.isRegistration) {
            changeFacebookRegistration(false, false);
            this.setState({
                btnText: "Login as Owner",
                btnTextFB: "Login with Facebook",
            })
        } else {
            changeFacebookRegistration(true, false);
            this.setState({
                btnText: "Register as Owner",
                btnTextFB: "Register with Facebook",
            })
        }
    }

    changeBtnText(text) {
        this.setState({ btnText: text, btnTextFB: text });

    };



    prevStep() {
        //post the name object to update pet creation object
        this.state.prevStepMethod();
    }

    petBurialDismiss() {
        this.props.history.push('/owner/pets');
        // if (this.state.isRegistration) {
        //     logoutOwner();
        //     this.props.history.push('/login');
        // } else {
        //     //GO TO PET PAGE*****
        //     this.props.history.push('/owner/pets');
        // }
    }

    registrationSuccessCallback() {
        //create pet
        setLoading("Generating Pet Burial Certificate...");
        let petObject = {
            petName: this.state.pet.petName,
            description1: this.state.pet.special,
            description2: this.state.pet.bestMemory,
            petBreed: this.state.pet.petBreed,
            petSpecies: this.state.pet.petSpecies,
            profilePhoto: this.state.pet.profilePicture[0],
            media: this.state.pet.pictures,
            dateOfDeparture: this.state.pet.dateOfDeparture,
            age: this.state.pet.age,
            gender: this.state.pet.gender,
        }

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
                    console.log(res);
                    dismissLoading();
                    if (!res.success) {
                        //show modal wrong with message
                        let messageObject = {
                            header: "Error with Pet Creation",
                            message: res.message
                        };
                        showMessage(messageObject);
                        dismissLoading();
                    } else {
                        //show modal success
                        ReactGA.event({
                            category: "pet_creation_successful",
                            action: "User successfully created pet",
                        });
                        let messageObject = {
                            header: "Successfully Created Pet",
                            message: "You have successfully created your pet companion. Please login to view your pets."
                        };

                        scroll.scrollToTop();
                        this.setState({ petCreationSuccess: true, newPet: res.data });
                        dismissLoading();
                    }


                });
            } else {
                dismissLoading();
                let messageObject = {
                    header: "Error with Pet Creation",
                    message: response.message
                };
                showMessage(messageObject);
            }


        });


    }

    loginSuccessCallback() {
        //create pet
        setLoading("Generating Pet Burial Certificate...");
        let petObject = {
            petName: this.state.pet.petName,
            description1: this.state.pet.special,
            description2: this.state.pet.bestMemory,
            petBreed: this.state.pet.petBreed,
            petSpecies: this.state.pet.petSpecies,
            profilePhoto: this.state.pet.profilePicture[0],
            media: this.state.pet.pictures,
            dateOfDeparture: this.state.pet.dateOfDeparture
        }

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
                        dismissLoading();
                    } else {
                        //show modal success
                        ReactGA.event({
                            category: "pet_creation_successful",
                            action: "User successfully created pet",
                        });
                        let messageObject = {
                            header: "Successfully Created Pet",
                            message: "You have successfully created your pet companion. Please login to view your pets."
                        };

                        scroll.scrollToTop();
                        this.setState({ petCreationSuccess: true, newPet: res.data });
                        dismissLoading();
                    }


                });
            } else {
                dismissLoading();
                let messageObject = {
                    header: "Error with Pet Creation",
                    message: response.message
                };
                showMessage(messageObject);
            }
        });
    }

    resetButtons() {
        changeFacebookRegistration(this.state.isRegistration, false);
        this.setState({
            btnText: (this.state.isRegistration ? "Register as Owner" : "Login as Owner"),
            btnTextFB: (this.state.isRegistration ? "Register with Facebook" : "Login with Facebook"),
            disableBtn: false
        });

    }

    loginRegistrationFailureCallback() {
        changeFacebookRegistration(!this.state.isRegistration, false);
        //create pet
        this.setState({
            btnText: (this.state.isRegistration ? "Register as Owner" : "Login as Owner"),
            btnTextFB: (this.state.isRegistration ? "Register with Facebook" : "Login with Facebook"),
            disableBtn: false
        });
    }

    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }

    responseFacebook = (response) => {
        setLoading("Logging in...");
        if (this.state.isRegistration) {
            //Create owner object
            let ownerObject = {
                email: response.email,
                password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
                fullName: response.name,
                socialMediaID: response.userID,
                socialMediaType: "Facebook",
                profilePhotoUrl: response.picture.data.url
            }

            // added delay to change button text to previous
            setTimeout(
                function () {
                    // enable the button
                    this.setState({
                        disableBtn: false
                    })
                    this.resetButtons();
                }.bind(this),
                1000
            );

            //await
            let createOwnerAction = startOwnerCreation(ownerObject).then((res) => {
                if (!res.success) {
                    //show modal wrong with message
                    let messageObject = {
                        header: "Error with Registration",
                        message: res.message,
                        callbackFunc: this.loginRegistrationFailureCallback
                    };
                    showMessage(messageObject);
                    dismissLoading();
                } else {
                    ReactGA.set({
                        userId: res.data.email,
                        fullName: res.data.fullName
                    });
                    //show modal success
                    let messageObject = {
                        header: "Successfully Registered",
                        message: "You have successfully registered your account, and your pet companion is tagged to that account. Please verify your account via the email link we sent you.",
                        callbackFunc: this.registrationSuccessCallback
                    };
                    showMessage(messageObject);
                    dismissLoading();

                }
            });

        } else {
            let ownerObject = {
                socialMediaId: response.userID,
                socialMediaType: "Facebook",
                password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
            }

            let loginOwnerAction = loginOwnerSocialMedia(ownerObject).then((res) => {
                if (!res.success) {
                    //show modal wrong with message
                    let messageObject = {
                        header: "Error with Login",
                        message: res.message,
                        callbackFunc: this.loginRegistrationFailureCallback
                    };
                    showMessage(messageObject);
                    dismissLoading();
                    // this.registerFacebook(response);
                } else {
                    ReactGA.set({
                        userId: res.data.email,
                        fullName: res.data.fullName
                    });
                    //show modal success
                    let messageObject = {
                        header: "Successfully Logged In",
                        message: "You have successfully Logged into your account, and your pet companion will be tagged to that account.",
                        callbackFunc: this.loginSuccessCallback
                    };
                    showMessage(messageObject);
                    dismissLoading();

                }
            });
        }
    }

    handleSubmit(event) {

        event.preventDefault();
        if (this.state.isFacebookLogin) {
            setLoading("Logging in...");
            return;
        }

        setTimeout(
            function () {
                // enable the button
                this.setState({
                    disableBtn: false
                })
                this.resetButtons();
            }.bind(this),
            1000
        );


        if (validateEmail(this.state.email) != "") {
            showMessageFull("Login/Registration Failed", "Please enter a valid email");
            return;
        }
        if (this.state.isRegistration && this.state.password != this.state.password2) {
            showMessageFull("Login/Registration Failed", "Passwords don't match");
            return;
        }

        if (this.state.password.length < 8) {
            showMessageFull("Login/Registration Failed", "Passwords must me at least 8 characters long");
            return;
        }

        // disable the button
        this.setState({
            disableBtn: true
        });
        if (this.state.isRegistration) {



            //Create owner object
            let ownerObject = {
                email: this.state.email,
                password: sha256(process.env.REACT_APP_PASSWORD_SALT + this.state.password).toString(),
                fullName: this.state.ownerName
            }

            // added delay to change button text to previous


            //await
            let createOwnerAction = startOwnerCreation(ownerObject).then((res) => {
                if (!res.success) {
                    //show modal wrong with message
                    let messageObject = {
                        header: "Error with Registration",
                        message: res.message,
                        callbackFunc: this.loginRegistrationFailureCallback
                    };
                    showMessage(messageObject);
                } else {
                    ReactGA.set({
                        userId: res.data.email,
                        fullName: res.data.fullName
                    });
                    //show modal success
                    let messageObject = {
                        header: "Successfully Registered",
                        message: "You have successfully registered your account, and your pet companion is tagged to that account. Please verify your account via the email link we sent you.",
                        callbackFunc: this.registrationSuccessCallback
                    };
                    showMessage(messageObject);
                }
            });

        } else {
            let ownerObject = {
                email: this.state.email,
                password: sha256(process.env.REACT_APP_PASSWORD_SALT + this.state.password).toString(),
            }

            let loginOwnerAction = startOwnerLogin(ownerObject).then((res) => {
                if (!res.success) {
                    //show modal wrong with message
                    let messageObject = {
                        header: "Error with Login",
                        message: res.message,
                        callbackFunc: this.loginRegistrationFailureCallback
                    };
                    showMessage(messageObject);
                } else {
                    ReactGA.set({
                        userId: res.data.email,
                        fullName: res.data.fullName
                    });
                    //show modal success
                    let messageObject = {
                        header: "Successfully Logged In",
                        message: "You have successfully Logged into your account, and your pet companion will be tagged to that account.",
                        callbackFunc: this.loginSuccessCallback
                    };
                    showMessage(messageObject);
                }
            });
        }
    }

    render() {
        return (
            <React.Fragment >

                < div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 offset-md-6 col-lg-6 offset-lg-6 text-center">
                            <h4 style={{ color: "#f78459" }}>Your candle has been lit.</h4>
                            <h4 style={{ color: "#f78459" }}>Login or Sign-up to Finalize your Companion's Candle.</h4>
                        </div>
                    </div>

                    <div className="row">
                        {/*<div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                <img src="img/placeholder/CandleFinal.jpg" className="rounded text-center" maxWidth="100%" />
                </div>*/}
                        <div className="col-sm-12 col-md-6 col-lg-6 text-center my-auto">
                            <img src="img/main/pet/pet_candle.png" className="rounded text-center" width="70%" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 text-center my-auto">
                            <div className="row text-center justify-content-center align-items-center" >

                                <section className="contact-us-section ptb-25">
                                    <div className="container">
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="section-heading mb-4">
                                                    <p className="lead">
                                                        By logging in / signing up, we can attach the pet to your owner's account.
                                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-md-12">
                                                <form
                                                    method="POST"
                                                    id="contactForm1"
                                                    className="contact-us-form"
                                                    noValidate="novalidate"
                                                    onSubmit={this.handleSubmit}
                                                >
                                                    {this.state.isRegistration &&
                                                        <div className="row">
                                                            <div className="col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <input
                                                                        value={this.state.ownerName}
                                                                        onChange={e => this.handleFormValueChange("ownerName", e)}
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="ownerName"
                                                                        placeholder="Enter name"
                                                                        required="required"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="row">
                                                        <div className="col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <input
                                                                    value={this.state.email}
                                                                    onChange={e => this.handleFormValueChange("email", e)}
                                                                    type="email"
                                                                    className="form-control"
                                                                    name="email"
                                                                    placeholder="Enter email"
                                                                    required="required"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <input
                                                                    value={this.state.password}
                                                                    onChange={e => this.handleFormValueChange("password", e)}
                                                                    type="password"
                                                                    className="form-control"
                                                                    name="password"
                                                                    placeholder="Enter password"
                                                                    required="required"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {this.state.isRegistration &&
                                                        <div className="row">
                                                            <div className="col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <input
                                                                        value={this.state.password2}
                                                                        onChange={e => this.handleFormValueChange("password2", e)}
                                                                        type="password"
                                                                        className="form-control"
                                                                        name="password2"
                                                                        placeholder="Re-enter password"
                                                                        required="required"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="row" style={{ marginBottom: "5px" }}>
                                                        <div className="col-sm-12">
                                                            <a onClick={() => this.changeRegistration()} style={{ marginBottom: "5px", cursor: "pointer" }}>
                                                                <u> {this.state.isRegistration && "Already have an account? Click here?"}
                                                                    {!this.state.isRegistration && "Don't have an account? Click here to register."}
                                                                </u>
                                                            </a>
                                                            <br />
                                                            <a href="resetpassword" style={{ marginBottom: "5px", cursor: "pointer" }}>
                                                                {!this.state.isRegistration && "Forget Password? Click here to reset password."}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-25">
                                                        <div className="col-sm-6">
                                                            <Button
                                                                className="btn primary-solid-btn"
                                                                style={{ backgroundColor: "#28a745", borderColor: "#28a745", width: "80%" }}
                                                                id="btnContactUs"
                                                                type="submit"
                                                                disabled={this.state.disableBtn}
                                                                variant="primary"
                                                                style={{ backgroundColor: "#f78459" }}
                                                                onClick={() => {
                                                                    this.changeBtnText("Loading...");
                                                                }}
                                                            >
                                                                {
                                                                    this.state.disableBtn && <Spinner
                                                                        as="span"
                                                                        animation="grow"
                                                                        size="sm"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                        style={{ marginRight: "5px" }}
                                                                    />
                                                                }
                                                                {this.state.btnText}
                                                            </Button>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <FacebookLogin
                                                                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                                                fields="name,email,picture"
                                                                callback={this.responseFacebook}
                                                                onClick={() => { changeFacebookRegistration(this.state.isRegistration, true); }}
                                                                disableMobileRedirect={true}
                                                                autoLoad={false}
                                                                render={renderProps => (
                                                                    <button
                                                                        style={{ width: "80%" }}
                                                                        className="btn primary-solid-btn" onClick={renderProps.onClick}>{this.state.btnTextFB}</button>
                                                                )} />
                                                        </div>


                                                    </div>
                                                </form>
                                                <p className="form-message"></p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>

                    </div>

                </div>

                {this.state.petCreationSuccess &&
                    <BurialModal burialCert={this.state.burialCert} callbackFunc={this.petBurialDismiss} petID={this.state.newPet.petID} />
                }
            </React.Fragment>
        );
    }
}

export default withRouter(PetCreationJourneyStep7);