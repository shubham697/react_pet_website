import React, { Component, useCallback } from "react";
import Modal from 'react-modal';
import { smallStyles } from "../../constants/styles";
import messageStore from "../../stores/messageStore"
import { dismissMessage } from "../../actions/messageActions"

class NotificationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cStyle: smallStyles,
            showMode: (messageStore.getMessage().message != null),
            message: messageStore.getMessage(),
            callbackFunc: props.callback
        };

        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        messageStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        messageStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            message: messageStore.getMessage(),
            showMode: (messageStore.getMessage().message != null)
        });
    }

    closeModal() {
        if (this.state.message.callbackFunc) {
            this.state.message.callbackFunc();
        }
        dismissMessage();
    }


    render() {
        return (
            <React.Fragment >
                <div className="container animated fadeIn">
                    <Modal isOpen={this.state.showMode}
                        onRequestClose={this.closeModal}
                        style={this.state.cStyle}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Notification">
                        <div className="container animated fadeIn">
                            <div className="col-md-12  text-center my-auto">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>{this.state.message.header}</h3>
                                    </div>
                                </div>
                                <br />
                                <div className="row ">
                                    <div className="col-md-12">
                                        <p>{this.state.message.message}</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="btn btn-info" onClick={() => this.closeModal()}>Dismiss</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

export default NotificationModal;