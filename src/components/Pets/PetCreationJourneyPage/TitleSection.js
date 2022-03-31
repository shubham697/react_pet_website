import React from "react";
import _data from "../../../data";
import PetCreationJourneyModal from "../Modals/PetCreationJourneyModal";
import { customStyles } from "../../../constants/styles";
import petStore from "../../../stores/petStore";
import { startPetCreation } from "../../../actions/petActions";

class HeroSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero: {},
            cStyle: customStyles,
            bgImage: 'img/placeholder/TitleSection.jpg'
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        /**
         * Your ajax will goes here to get data then call setState
         */

        this.setState({
            hero: _data.heroMain
        });

        petStore.addChangeListener(this.onChange);


    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ open_pet_creation: petStore.getPetCreationStatus() });
    }


    render() {
        return (
            <React.Fragment>
                <section className="background-img"
                    style={{
                        background: `url(${this.state.bgImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "200px"
                    }}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="hero-content-left text-white text-center ptb-100">
                                    <h1 className="text-white">We are sorry for your loss.</h1>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>
            </React.Fragment>
        );
    }
}

export default HeroSection;
