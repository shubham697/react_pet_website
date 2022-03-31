import React from "react";
import petStore from "../../../stores/petStore";
import { updateOwnerPets } from "../../../actions/petActions";
import { setLoading, dismissLoading } from "../../../actions/loadingActions";
import { showMessage, showMessageFull } from "../../../actions/messageActions";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import {
    isMobile,
    isBrowser
} from "react-device-detect";

class PetListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwner: props.isOwner,
            petList: petStore.getPetsByOwner(),
            trustedCompany: [],
            firstLoad: true
        };
        this.onChange = this.onChange.bind(this);
        this.viewPet = this.viewPet.bind(this);
        this.editPet = this.editPet.bind(this);
        this.gotoCreate = this.gotoCreate.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.isBottom = this.isBottom.bind(this);
        this.loadNext = this.loadNext.bind(this);
    }

    componentDidMount() {
        /**
         * Your ajax will goes here to get data then call setState
         */
        ReactGA.event({
            category: "visit_own_pet_listing",
            action: "User visited their own pet listing",
        });

        setLoading("Loading Pets...");
        petStore.addChangeListener(this.onChange);
        if (this.state.isOwner) {
            //get list get api
            //call the list
            updateOwnerPets(0, 5);
        }
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
        document.removeEventListener('scroll', this.trackScrolling);
    }

    showInfoPopup = () => {
        //show Information popup 
        let messageObject = {
            header: "Notice",
            message: "Light a candle to your first pet!",
            callbackFunc: () => {
                // setLoading("Loading Pets...");
            }
        };
        showMessage(messageObject);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('root');

        if (this.isBottom(wrappedElement) && !this.state.loadingNext) {
            document.removeEventListener('scroll', this.trackScrolling);
            this.loadNext();
        }
    };

    loadNext() {
        ReactGA.event({
            category: "user_loaded_next_page_on_discovery",
            action: "User Scrolled to the bottom of Discovery Page",
        });
        this.setState({ loadingNext: true });
        if (petStore.getOwnerPetCount() > this.state.petList.length) {
            updateOwnerPets(this.state.petList.length, 6);
        }

    }

    isBottom(el) {
        if (isBrowser) {
            return el.getBoundingClientRect().bottom <= window.innerHeight + 75;
        } else {
            return el.getBoundingClientRect().bottom <= window.innerHeight + 600;
        }
    }

    viewPet(petID) {
        ReactGA.event({
            category: "user_viewed_pet_on_list",
            action: "User View Pet on List - " + petID,
        });
        this.props.history.push('/viewpet/' + petID);
    }

    editPet(petID) {
        this.props.history.push('/owner/editpet/' + petID);
    }

    gotoCreate() {
        this.props.history.push('/createpet');
    }

    onChange() {

        this.setState({
            petList: petStore.getPetsByOwner(),
            firstLoad: false,
            loadingNext: false,
        })

        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);
        document.addEventListener('scroll', this.trackScrolling);

        if(petStore.getPetsByOwner().length == 0) {
            setTimeout(function () {
                this.showInfoPopup();
            }.bind(this), 500);
            
        }
    }

    dismissLoadingOverlay() {
        dismissLoading();
    }

    render() {
        return (
            <React.Fragment>
                <section className="mt-100">
                    <div className="container">
                        <div className="row equal">
                            <div style={{ cursor: "pointer" }} onClick={() => this.gotoCreate()} className="col-sm-12 col-md-6 col-lg-4  text-center  mb-25">
                                <div className="mb-10">
                                    <h5>Click here to</h5>
                                    <h5>Light a Candle</h5>
                                </div>
                                {isBrowser &&
                                    <img className="single-list single-list-hover" src="../../img/main/pet/pet_candle.png" style={{ width: "100%", height: "80%", opacity: "0.8" }} />
                                }
                                {isMobile &&
                                    <img className="single-list single-list-hover" src="../../img/main/pet/pet_candle_mobile.png" style={{ width: "100%", height: "80%", opacity: "0.9" }} />
                                }
                            </div>
                            {(this.state.petList || []).map((pet, index) => {
                                return (

                                    <div className="col-sm-12 col-md-6 col-lg-4 text-center animated fadeIn" key={pet.petID}>
                                        <div className="mb-10">
                                            <h5 style={{ "color": "#f78459" }}>{pet.petName}</h5>
                                            <h9>added on <b>{pet.createdAtParsed}</b></h9>
                                        </div>
                                        <div style={{ cursor: "pointer" }} onClick={() => this.viewPet(pet.petID)}>
                                            <div className="">
                                                <img className="rounded simage-list simage-hover" src={pet.profilePhoto} />
                                            </div>
                                            {isBrowser &&
                                                <img className="single-list single-list-hover mb-5" src="../../img/main/pet/pet_thumbnail_test.png" />
                                            }
                                            {isMobile &&
                                                <img className="single-list single-list-hover" src="../../img/main/pet/pet_thumbnail_test_mobile.png" />
                                            }


                                        </div>
                                        <button style={{ cursor: "pointer" }} onClick={() => this.editPet(pet.petID)} className="btn btn-info floating-button">
                                            Edit
                                        </button>
                                    </div>

                                );
                            })}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default withRouter(PetListing);
