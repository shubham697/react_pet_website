import React, { Component } from "react";
import petStore from "../../../stores/petStore";
import { resetPetFunction, incrementPetCreationStep } from "../../../actions/petActions";

class PetCreationJourneyStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            pet: petStore.getCurrentPet(),
        };

        this.onChange = this.onChange.bind(this);
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

    closeModal() {
        resetPetFunction();
    }

    nextStep() {
        incrementPetCreationStep();
    }

    /*handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] =
            event.target.type === "checkbox" ?
                event.target.checked :
                event.target.value;
        this.setState(stateValue);
    }*/

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
                                <h2>Real Pet, Real Stories Commitment</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 text-center">
                                <img src="img/placeholder/UnderConstruction.jpg" className="rounded text-center" width="100%" />
                            </div>
                            <div className="col-md-6 col-lg-6 text-center">
                                <br />
                                <p style={{ fontSize: "18px", textAlign: "justify" }}>We are sorry for your lost and we are glad that you are taking this first step towards recovery. After all, our pet companions are like family to us.</p>
                                <br />
                                <p style={{ fontSize: "18px", textAlign: "justify" }}>Pets Haven features real stories of real pets who have passed on.We welcome you to this community of pet owners who help one another get over grief of the loss of a faithful companion.</p>
                                <div className="row text-center" style={{ marginBottom: "10px" }}>
                                    <div className="col-md-12">
                                        <a className="btn btn-success" href="/createpet">I Understand and want to proceed</a>
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

export default PetCreationJourneyStep1;