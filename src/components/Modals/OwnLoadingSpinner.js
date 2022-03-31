import React, { Component, useCallback } from "react";
import loadingStore from "../../stores/loadingStore"
import ClipLoader from "react-spinners/ClipLoader";

class OwnLoadingSpinner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingObject: loadingStore.getLoading()
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        loadingStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        loadingStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            isActive: (loadingStore.getLoading().message != null)
        });
    }

    render() {
        return (


            <React.Fragment >
                <div className="overlay-spinner text-center">
                    <ClipLoader
                        size={80}
                        color={"#ffffff"}
                        loading={true}
                    />
                    <br/>
                    <h5 style={{ color: "#ffffff" }}>{this.state.loadingObject.message}</h5>
                </div>

            </React.Fragment>

        );
    }
}

export default OwnLoadingSpinner;