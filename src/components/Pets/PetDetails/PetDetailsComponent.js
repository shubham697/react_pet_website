import React from "react";
import petStore from "../../../stores/petStore";
import ownerStore from "../../../stores/ownerStore";
import { loadCurrentPet } from "../../../actions/petActions";
import { setLoading, dismissLoading } from "../../../actions/loadingActions";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CommentsComponent from "./CommentsComponent";
import ReactGA from 'react-ga';
import BurialModal from '../../Modals/DeathCertModal';
import {
    BrowserView,
    MobileView,
    isMobile
} from "react-device-detect";
import { withRouter } from 'react-router-dom';

class PetDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            petId: props.petId,
            pet: {},
            showBurialModal: false
        };

        this.onChange = this.onChange.bind(this);
        this.dismissLoadingOverlay = this.dismissLoadingOverlay.bind(this);
        this.petBurialDismiss = this.petBurialDismiss.bind(this);
        this.showPetBurialCert = this.showPetBurialCert.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "user_visited_pet_details",
            action: "User visited pets - " + this.state.petId,
        });
        /**
         * Your ajax will goes here to get data then call setState
         */
        setLoading("Loading Pet Details...");
        petStore.addChangeListener(this.onChange);
        loadCurrentPet(this.state.petId);

        setTimeout(function () {
            this.dismissChat();
        }.bind(this), 500);



    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            pet: petStore.getSelectedPet()
        })
        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);

        //console.log(petStore.getSelectedPet())
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

    dismissLoadingOverlay() {
        dismissLoading();
        console.log(this.state.pet);
    }

    petBurialDismiss() {
        this.setState({ showBurialModal: false });
    }

    showPetBurialCert() {
        this.setState({ showBurialModal: true });
    }

    editPet(petID) {
        this.props.history.push('/owner/editpet/' + petID);
    }

    onBack() {
        if (ownerStore.getOwnerObject().jwt != null) {
            this.props.history.goBack();
        } else {
            this.props.history.goBack();
        }
    }

    render() {
        return (
            <React.Fragment>
                <BrowserView>
                    <div class="candle-container right-50">
                        {this.state.pet != null && this.state.pet.petID != null &&
                            < div className="candle-detail rounded text-center animated fadeIn">
                                <h5 style={{ fontFamily: "myCambria", fontWeight: "50" }}>This candle was lit on  {this.state.pet.createdAtParsed}</h5>
                                <h5 style={{ color: "#989898" }}> to remember</h5>
                                <h2 style={{ fontFamily: "myRightland", color: "#f78459" }}> {this.state.pet.petName}</h2>
                                <img src="../../img/main/pet/pet_candle.png" style={{ height: "85%" }} />
                                <div className="certificate-button-wrap">
                                    <div className="certificate-button" onClick={() => this.showPetBurialCert()}>View Burial Certificate</div>
                                </div>
                            </div>
                        }
                    </div>

                    <div class="details-container pet-details-background left-40">
                        {this.state.pet != null && this.state.pet.petID != null &&
                            < div className="single-detail rounded text-center">
                                < div className="single-detail-inner animated fadeIn">
                                    <h5><u>{this.state.pet.petName}</u> the {this.state.pet.petBreed}</h5>
                                    <p>Date of Departure: {this.state.pet.dateOfDepartureParsed}</p>

                                    <OwlCarousel
                                        loop
                                        items={1}
                                        dots
                                        center
                                        autoplayTimeout={5000}
                                        autoplay
                                    >
                                        {(this.state.pet.allMedia || []).map(
                                            (media, index) => {
                                                return (
                                                    <div className="mb-5">
                                                        <img
                                                            src={media}
                                                            className="rounded text-center"
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}

                                    </OwlCarousel>

                                    <h5>What makes <u>{this.state.pet.petName}</u> so special?</h5>
                                    <br />
                                    <p>{this.state.pet.description[0]}</p>
                                    <br />
                                    <h5>Best memory of <u>{this.state.pet.petName}</u>?</h5>
                                    <br />
                                    <p>{this.state.pet.description[1]}</p>

                                </div>
                            </div>

                        }
                        <button style={{ 
                        display : ownerStore.getOwnerObject().ownerID == this.state.pet.createdBy ? 'inherit' : 'none',
                        cursor: "pointer", 
                        // zIndex: 100, 
                        position: "absolute", 
                        width: "auto",
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: "black",
                        backgroundColor: "white",
                        borderColor: "white",
                        boxShadow: "0 4px 4px 0 rgba(1, 1, 1, 0.5)",
                        left: "68%",
                        top: "13%",
                        fontFamily: "myCorbel",
                      }} onClick={() => this.editPet(this.state.pet.petID)} className="btn btn-info">
                                            Edit
                    </button> 
                    </div>




                </BrowserView>
                <MobileView>
                    <div className="row text-center align-items-center justify-content-center mt-100 mb-100">
                        <div className="col-sm-10 offset-sm-1 single-details-mobile mt-50">


                            <OwlCarousel
                                loop
                                items={1}
                                dots
                                center
                                autoplayTimeout={5000}
                                autoplay
                                style={{ width: "80%", marginLeft: "10%", marginBottom: "0", }}
                            >
                                {(this.state.pet.allMedia || []).map(
                                    (media, index) => {
                                        return (
                                            <div className="mb-5" style={{ borderStyle: "solid" }}>
                                                <img
                                                    src={media}
                                                    className="rounded text-center"

                                                />
                                            </div>
                                        );
                                    }
                                )}

                            </OwlCarousel>

                            <h3 style={{ color: "#f78459", fontFamily: "myRightland", fontSize: "28px" }}>{this.state.pet.petName}</h3>
                            <h5>the {this.state.pet.petBreed}</h5>
                            <p>Date of Departure: {this.state.pet.dateOfDepartureParsed}</p>
                            <button className="certicate-button-mobile" onClick={() => this.showPetBurialCert()}>View Certificate / Share</button>
                            <div className="single-details-mobile-half mt-25">
                                <h5 style={{ fontSize: "15px" }}>What makes <u>{this.state.pet.petName}</u> so special to me?</h5>
                                <br />
                                <p>{this.state.pet.description == null ? "" : this.state.pet.description[0]}</p>
                                <br />
                                <h5 style={{ fontSize: "15px" }}>Best memory of <u>{this.state.pet.petName}</u>?</h5>
                                <br />
                                <p>{this.state.pet.description == null ? "" : this.state.pet.description[1]}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => this.onBack()}>
                        <div className="floating-back-button"></div>
                    </button>
                    <button style={{ 
                        display : ownerStore.getOwnerObject().ownerID == this.state.pet.createdBy ? 'inherit' : 'none',
                        cursor: "pointer", 
                        zIndex: 100, 
                        position: "fixed", 
                        width: "auto",
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: "black",
                        backgroundColor: "white",
                        borderColor: "white",
                        boxShadow: "0 4px 4px 0 rgba(1, 1, 1, 0.5)",
                        left: "68%",
                        top: "13%",
                        fontFamily: "myCorbel",
                      }} onClick={() => this.editPet(this.state.pet.petID)} className="btn btn-info">
                                            Edit
                    </button>                    
                    <div className="top-mobile-background"></div>

                </MobileView>
                {
                    this.state.pet.petName != null &&
                    <CommentsComponent petId={this.state.petId} petName={this.state.pet.petName} />
                }

                {
                    this.state.showBurialModal &&
                    <BurialModal burialCert={this.state.pet.deathCert} callbackFunc={this.petBurialDismiss} petID={this.state.pet.petID} owner={false} />
                }
            </React.Fragment >
        );
    }
}

export default withRouter(PetDetails);
