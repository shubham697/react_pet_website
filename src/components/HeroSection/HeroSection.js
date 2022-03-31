import React from "react";
import _data from "../../data";
import PetCreationJourneyModal from "../Pets/Modals/PetCreationJourneyModal";
import { customStyles } from "../../constants/styles";
import petStore from "../../stores/petStore";
import { startPetCreation } from "../../actions/petActions";

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: {},
      open_pet_creation: false,
      cStyle: customStyles
    };

    this.openPetCreation = this.openPetCreation.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  closeModal() {
    this.setState({
      open_pet_creation: false
    });
  }

  openPetCreation() {
    this.setState({
      open_pet_creation: true
    });
    startPetCreation();
  }

  render() {
    return (
      <React.Fragment>
        <section className="hero-section ptb-100 background-img"
          style={{
            background: `url(${this.state.hero.bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-sm-9 col-md-10 col-lg-7">
                <div className="hero-content-left text-white text-center ptb-100">
                  <h1 className="text-white">{this.state.hero.title}</h1>
                  <p className="lead">{this.state.hero.description}</p>
                  <a href="/#" className="btn solid-btn" style={{ marginBottom: "12px" }} href="/createpet">Light a <b>candle</b> for your Pet</a><br />
                  <a href="/discover" className="btn solid-btn">Discover other Pet Companions</a>
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
