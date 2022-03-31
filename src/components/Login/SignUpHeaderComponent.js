import React, {
    Component
} from "react";
import {
    connect
} from "react-redux";
import {
    submitContact,
    loginManually
} from "../../actions/index";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }

};

class SignUpHeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            disableContactBtn: false,
            contactBtnText: "Sign Up",
            modalIsOpen: false,
            type: "Sign Up",
            switchText: "Have an account? Click here to login."
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    switchType = switchType => {
        if (this.state.type == "Sign Up") {
            this.setState({ type: "Login" });
            this.setState({ contactBtnText: "Login" });
            this.setState({ switchText: "Don't have an account? Click here to register." });
        } else {
            this.setState({ type: "Sign Up" });
            this.setState({ contactBtnText: "Sign Up" });
            this.setState({ switchText: "Have an account? Click here to login." });
        }
    }

    changeBtnText = contactBtnText => {
        this.setState({
            contactBtnText
        });
    };

    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] =
            event.target.type === "checkbox" ?
                event.target.checked :
                event.target.value;
        this.setState(stateValue);
    }

    handleSubmit(event) {
        event.preventDefault();

        // disable the button
        this.setState({
            disableContactBtn: true
        });

        // get action
        const loginAction = loginManually(this.state);

        // Dispatch the contact from data
        this.props.dispatch(loginAction);

        // added delay to change button text to previous
        setTimeout(
            function () {
                // enable the button
                this.setState({
                    disableContactBtn: false
                });

                // change to button name
                this.changeBtnText("Login");

                // get action again to update state
                const loginAction = loginManually(this.state);

                // Dispatch the contact from data
                this.props.dispatch(loginAction);

                // clear form data
                this.setState({
                    email: "",
                    password: ""
                });
            }.bind(this),
            3000
        );
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <React.Fragment >
                <li className="nav-item" >
                    <a style={{ color: "black", cursor: "pointer" }} onClick={
                        this.openModal
                    } >
                        Sign Up
            </a>

                </li>

                <Modal isOpen={
                    this.state.modalIsOpen
                }
                    onAfterOpen={
                        this.afterOpenModal
                    }
                    onRequestClose={
                        this.closeModal
                    }
                    style={
                        customStyles
                    }
                    contentLabel="Example Modal" >
                    <div className="container animated fadeIn" >
                        <section className="contact-us-section ptb-50" >
                            <div className="container" >
                                <div className="row justify-content-center align-items-center" >
                                    <div className="col-md-12 col-lg-12" >
                                        <div className="section-heading mb-4" >
                                            {
                                                this.state.type === "Login" &&
                                                <div>
                                                    <h2 > Login Here </h2>
                                                    <p className="lead" >
                                                        By logging in , you can manage your pets more efficiently. </p>
                                                </div>
                                            }

                                            {
                                                this.state.type === "Sign Up" &&
                                                <div>
                                                    <h2 > Register Here </h2>
                                                    <p className="lead" >
                                                        By registering, you can manage your pets more efficiently. </p>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div >
                                <div className="row justify-content-center align-items-center" >
                                    <div className="col-md-12" >
                                        <form method="POST"
                                            id="contactForm1"
                                            className="contact-us-form"
                                            noValidate="novalidate"
                                            onSubmit={
                                                this.handleSubmit
                                            } >
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={
                                                            this.state.email
                                                        }
                                                            onChange={
                                                                e => this.handleFormValueChange("email", e)
                                                            }
                                                            type="email"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="Enter email"
                                                            required="required" /
                                                        >
                                                    </div> </div > </div>
                                            <div className="row" >
                                                <div className="col-sm-12 col-12" >
                                                    <div className="form-group" >
                                                        <input value={
                                                            this.state.password
                                                        }
                                                            onChange={
                                                                e => this.handleFormValueChange("password", e)
                                                            }
                                                            type="password"
                                                            className="form-control"
                                                            name="password"
                                                            placeholder="Enter password"
                                                            required="required" /
                                                        >
                                                    </div> </div > </div>
                                            <div className="row" >
                                                <div className="col-sm-12" >
                                                    <a style={{ cursor: "pointer", marginBottom: "10px" }}
                                                        onClick={
                                                            this.switchType
                                                        } > {
                                                            this.state.switchText
                                                        } </a>

                                                </div>

                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12" >
                                                    <button type="submit"
                                                        className="btn primary-solid-btn btn-block"
                                                        style={
                                                            {
                                                                marginBottom: "10px"
                                                            }
                                                        }
                                                        id="btnContactUs"
                                                        disabled={
                                                            this.state.disableContactBtn
                                                        }
                                                        onClick={
                                                            () => {
                                                                this.changeBtnText("Sending...");
                                                            }
                                                        } > {
                                                            this.state.contactBtnText
                                                        } </button>

                                                </div>

                                            </div> <div className="row" >
                                                <div className="col-sm-12" >
                                                    <button className="btn primary-solid-btn btn-block"
                                                        onClick={
                                                            this.closeModal
                                                        }> close </button> </div> </div> </form > <p className="form-message" > </p> </div > </div> </div > </section> </div > </Modal>

            </React.Fragment>
        );
    }
}

export default connect(state => ({
    state
}))(SignUpHeaderComponent);