import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";
import ImageUploader from 'react-images-upload';
import ReactGA from 'react-ga';

class PetCreationJourneyStep4 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            worldSelection: [
                {
                    name: "Deepavali Candle",
                    description: "This is a deepavali candle that your pet would love if he/she is immersed in the indian culture.",
                    img: "img/placeholder/zone1.jpg",
                    imgSelected: "img/placeholder/zone1Selected.jpg"
                },
                {
                    name: "Ancient Candle",
                    description: "This candle is an ancient candle that your pet would love if he/she is very old and very slow.",
                    img: "img/placeholder/zone2.jpg",
                    imgSelected: "img/placeholder/zone2Selected.jpg"
                },
                {
                    name: "Chinese Latern",
                    description: "This is a chinese latern that your pet would love if he/she is immersed in the chinese culture.",
                    img: "img/placeholder/zone3.jpg",
                    imgSelected: "img/placeholder/zone3Selected.jpg"
                }
            ],
            selectedWorld: 0
        };

        this.createCandleDisplay = this.createCandleDisplay.bind(this);
        this.changeselectedWorld = this.changeselectedWorld.bind(this);

        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "pet_creation_step_5",
            action: "User entered step 5 of pet creation",
        });
        petStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
    }

    changeselectedWorld(index) {
        this.setState({ selectedWorld: index });
    }

    closeModal() {
        resetPetFunction();
    }

    nextStep() {
        //post the name object to update pet creation object
        let pet2 = this.state.pet;
        pet2.selectedWorld = this.state.selectedWorld;

        updatePetCreation(pet2);
        incrementPetCreationStep();
    }

    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }

    createCandleDisplay() {
        let candleSel = this.state.worldSelection;
        console.log(candleSel);
        return (
            <div className="container-fluid">
                {
                    candleSel.map((value, index) => {

                        return (<div className="row justify-content-center" key={value.name}>

                            <div className="col-sm-12 col-lg-12 col-md-12">
                                {this.state.selectedWorld !== index && <img src={value.img} style={{ cursor: "pointer", maxWidth: "90%" }} onClick={() => this.changeselectedWorld(index)} />}
                                {this.state.selectedWorld === index && <img src={value.imgSelected} style={{ cursor: "pointer", maxWidth: "90%" }} onClick={() => this.changeselectedWorld(index)} />}
                            </div>
                        </div >)

                    })
                }
            </div>
        )
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
                                <h2>Almost there... please choose a burial zone that represents</h2>
                                <h3><b><u>{this.state.pet.name}</u></b></h3>
                                <br />
                                <div className="row justify-content-center align-items-center" >
                                    {this.createCandleDisplay()}
                                </div>
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

export default PetCreationJourneyStep4;