import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep, updatePetCreation } from "../../../actions/petActions";
import ImageUploader from 'react-images-upload';

class PetCreationJourneyStep4 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
            candleSelection: [
                {
                    name: "Deepavali Candle",
                    description: "This is a deepavali candle that your pet would love if he/she is immersed in the indian culture.",
                    img: "img/placeholder/candle1.jpg"
                },
                {
                    name: "Ancient Candle",
                    description: "This candle is an ancient candle that your pet would love if he/she is very old and very slow.",
                    img: "img/placeholder/candle2.jpg"
                },
                {
                    name: "Chinese Latern",
                    description: "This is a chinese latern that your pet would love if he/she is immersed in the chinese culture.",
                    img: "img/placeholder/candle3.jpg"
                }
            ],
            selectedCandle: 0
        };

        this.createCandleDisplay = this.createCandleDisplay.bind(this);
        this.changeSelectedCandle = this.changeSelectedCandle.bind(this);

        this.onChange = this.onChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        petStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ pet: petStore.getCurrentPet() });
    }

    changeSelectedCandle(index) {
        this.setState({ selectedCandle: index });
    }

    closeModal() {
        resetPetFunction();
    }

    nextStep() {
        //post the name object to update pet creation object
        let pet2 = this.state.pet;
        pet2.selectedCandle = this.state.selectedCandle;

        updatePetCreation(pet2);
        incrementPetCreationStep();
    }

    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }

    createCandleDisplay() {
        let candleSel = this.state.candleSelection;
        console.log(candleSel);
        return (
            <div className="row">
                {
                    candleSel.map((value, index) => {

                        return (<div className="col-sm-12 col-lg-4 col-md-4 text-center" key={value.name}>
                            <div className="row">
                                <div className="col-md-12">
                                    <h5>{value.name}</h5>
                                </div>
                                <div className="col-md-12">
                                    <img src={value.img} />
                                </div>
                                <div className="col-md-12">
                                    <p>{value.description}</p>
                                </div>
                                <div className="col-md-12">
                                    {this.state.selectedCandle === index && <h4>Selected Candle</h4>}
                                    {this.state.selectedCandle !== index && <button className="btn btn-success" onClick={() => this.changeSelectedCandle(index)}>Select</button>}
                                </div>
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
                                <h2>Almost there... please choose a candle that represents</h2>
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