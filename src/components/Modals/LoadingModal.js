import React, { Component, useCallback } from "react";
import loadingStore from "../../stores/loadingStore"
import OwnLoadingSpinner from './OwnLoadingSpinner';


class LoadingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: (loadingStore.getLoading().message != null),
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
            loadingObject: loadingStore.getLoading(),
            isActive: (loadingStore.getLoading().message != null)
        });
    }

    render() {
        return (


            <React.Fragment >
                {this.state.isActive &&
                    <div>
                        <div className="overlay">



                        </div>
                        <OwnLoadingSpinner />

                    </div>
                }

            </React.Fragment>

        );
    }
}

export default LoadingModal;