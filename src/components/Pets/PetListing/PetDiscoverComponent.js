import React from "react";
import petStore from "../../../stores/petStore";
import ownerStore from "../../../stores/ownerStore";
import { updateDiscoveryPets } from "../../../actions/petActions";
import { setLoading, dismissLoading } from "../../../actions/loadingActions";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import {
    isMobile,
    isBrowser
} from "react-device-detect";

class PetDiscoverListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwner: (ownerStore.getOwnerObject().jwt != null),
            petList: petStore.getDiscoveryPets(),
            featuredPet: {},
            trustedCompany: [],
            firstLoad: true,
            loadingNext: false
        };
        this.onChange = this.onChange.bind(this);
        this.viewPet = this.viewPet.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.isBottom = this.isBottom.bind(this);
        this.loadNext = this.loadNext.bind(this);

    }

    componentDidMount() {
        /**
         * Your ajax will goes here to get data then call setState
         */

        ReactGA.event({
            category: "visit_pet_discovery",
            action: "User visited pet discovery",
        });

        setLoading("Loading Pets...");
        petStore.addChangeListener(this.onChange);
        if (this.state.isOwner) {
            //get list get api

            //call the list
            updateDiscoveryPets(0, 9);

        } else {

            //call the list
            updateDiscoveryPets(0, 9);

        }

    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
        document.removeEventListener('scroll', this.trackScrolling);
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
        updateDiscoveryPets(this.state.petList.length, 8);

    }

    isBottom(el) {
        if (isBrowser) {
            return el.getBoundingClientRect().bottom <= window.innerHeight + 50;
        } else {
            return el.getBoundingClientRect().bottom <= window.innerHeight + 600;
        }
    }

    viewPet(petID) {
        ReactGA.event({
            category: "user_viewed_pet_on_discovery",
            action: "User View Pet on Discovery - " + petID,
        });
        this.props.history.push('/viewpet/' + petID);
    }

    onChange() {

        this.setState({
            petList: petStore.getDiscoveryPets(),
            firstLoad: false,
            loadingNext: false,
            featuredPet: petStore.getDiscoveryPets()[0]
        })

        document.addEventListener('scroll', this.trackScrolling);
        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);


    }

    dismissLoadingOverlay() {
        dismissLoading();
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    <div className="container">
                        <div className="row equal align-items-center justify-content-center" >
                            {isBrowser &&
                                <div className="col-sm-12 col-md-4 col-lg-4 animated fadeIn " style={{ marginTop: "8%" }}>
                                    <div className="text-center" style={{ paddingLeft: "10%" }}>
                                        <h3 style={{ "color": "#f78459" }}>{this.state.featuredPet.petName}</h3>
                                        <h5>the {this.state.featuredPet.petBreed}</h5>
                                        <h6>Departed on: {this.state.featuredPet.dateOfDepartureParsed}</h6>
                                        {/*<h6 className="mt-10">Owner: {this.state.featuredPet.ownerName}</h6> <br />*/}
                                    </div>
                                </div>
                            }
                            <div style={{ cursor: "pointer" }} onClick={() => this.viewPet(this.state.featuredPet.petID)} style={{ height: "100%" }} className="col-sm-12 col-md-3 col-lg-3 text-center animated fadeIn">
                                <h3>Latest's Featured</h3>
                                <div className="mb-5">
                                    <img className="rounded simage-big simage-hover" src={this.state.featuredPet.profilePhoto} />
                                </div>
                                <img className="single-list-big single-list-hover" src="../../img/main/pet/pet_thumbnail_featured.png" />


                            </div>

                            {isMobile &&
                                <div className="col-sm-12 col-md-4 col-lg-4 animated fadeIn ">
                                    <div className="text-center">
                                        <h4 style={{ "color": "#f78459" }}>{this.state.featuredPet.petName}</h4>
                                        <h5>the {this.state.featuredPet.petBreed}</h5>
                                        <h6>Departed on: {this.state.featuredPet.dateOfDepartureParsed}</h6>
                                        {/*<h6 className="mt-10">Owner: {this.state.featuredPet.ownerName}</h6> <br />*/}

                                    </div>
                                </div>
                            }
                            {isBrowser &&
                                <div className="col-sm-12 col-md-5 col-lg-5 text-center animated fadeIn" style={{ marginTop: "8%", paddingLeft: "5%" }}>
                                    <h5>Best Memory?</h5>
                                    <p>{this.state.featuredPet.description != null ? this.state.featuredPet.description[1] : ""}</p>
                                </div>
                            }
                            {isMobile &&
                                <h3 style={{ "color": "#f78459", marginTop: "8%" }}>- All Pets -</h3>
                            }
                        </div>
                        <div className="row equal">
                            {(this.state.petList || []).map((pet, index) => {
                                if (index == 0) {
                                    return false;
                                }
                                return (

                                    <div style={{ cursor: "pointer" }} onClick={() => this.viewPet(pet.petID)} className="col-sm-12 col-md-4 col-lg-3 text-center animated fadeIn" key={pet.petID}>
                                        <div style={{ textAlign: "left", marginLeft: "24%" }}>
                                            <h5 style={{ "color": "#f78459" }}>{pet.petName}</h5>
                                            <h9>added on <b>{pet.createdAtParsed}</b></h9>
                                        </div>
                                        <div>
                                            <img className="rounded simage simage-hover" src={pet.profilePhoto} />
                                        </div>
                                        {isBrowser &&
                                            <img className="single-list-disc single-list-hover mb-5" src="../../img/main/pet/pet_thumbnail_test.png" />
                                        }
                                        {isMobile &&
                                            <img className="single-list-disc single-list-hover mb-5" src="../../img/main/pet/pet_thumbnail_test_mobile.png" />
                                        }

                                    </div>

                                );
                            })}
                        </div>
                    </div>

                </section>
            </React.Fragment >
        );
    }
}

export default withRouter(PetDiscoverListing);
