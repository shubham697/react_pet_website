import React, { Component } from "react";
import { connect } from "react-redux";
import ownerStore from "../../stores/ownerStore";
import { startOwnerCreation, loginOwnerSocialMedia, logoutOwner, startOwnerLogin, changeFacebookRegistration } from "../../actions/ownerActions";
import { showMessage, showMessageFull } from "../../actions/messageActions";
import sha256 from 'crypto-js/sha256';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { setLoading, dismissLoading } from "../../actions/loadingActions";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import { FacebookProvider, LoginButton } from 'react-facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  isBrowser,
  isMobile as _isMobile
} from "react-device-detect";
import { validateEmail } from "../../utils/validation";


/*<div className="row">
                            <div className="col-sm-12">
                              <FacebookProvider appId="300016034310202">
                                <LoginButton
                                  scope="name,email,picture"
                                  onCompleted={this.responseFacebook}
                                  onError={this.responseFacebookError}
                                >
                                  <span>Login via Facebook</span>
                                </LoginButton>
                              </FacebookProvider>
                            </div>
                          </div>*/

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerName: "",
      email: "",
      password2: "",
      password: "",
      disableBtn: false,
      btnText: "Login as Owner",
      btnTextFB: "Login with Facebook",
      disableContactBtn: false,
      contactBtnText: "Login",
      isRegistration: ownerStore.getCurrentRegistrationStatus(),
      isFacebookLogin: ownerStore.getCurrentFacebookStatus()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeBtnText = this.changeBtnText.bind(this);
    this.changeRegistration = this.changeRegistration.bind(this);
    this.handleFormValueChange = this.handleFormValueChange.bind(this);
    this.registrationSuccessCallback = this.registrationSuccessCallback.bind(this);
    this.loginRegistrationFailureCallback = this.loginRegistrationFailureCallback.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.registerFacebook = this.registerFacebook.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.onOwnerChange = this.onOwnerChange.bind(this);

    this.resetButtons = this.resetButtons.bind(this);
  }

  componentDidMount() {
    ReactGA.event({
      category: "pet_creation_step_7",
      action: "User entered step 7 of pet creation",
    });
    ownerStore.addChangeListener(this.onOwnerChange);
    this.props.history.push('/login');
  }

  componentWillUnmount() {
    ownerStore.removeChangeListener(this.onOwnerChange);
  }
  onOwnerChange() {
    this.setState({
      isRegistration: ownerStore.getCurrentRegistrationStatus(),
      isFacebookLogin: ownerStore.getCurrentFacebookStatus()
    });

  }

  resetButtons() {
    changeFacebookRegistration(this.state.isRegistration, false);
    this.setState({
      btnText: (this.state.isRegistration ? "Register as Owner" : "Login as Owner"),
      btnTextFB: (this.state.isRegistration ? "Register with Facebook" : "Login with Facebook"),
      disableBtn: false,
      isFacebookLogin: false
    });
  }

  changeBtnText(text) {
    this.setState({ btnText: text, btnTextFB: text });
  };

  click() {

  }

  changeRegistration() {
    if (this.state.isRegistration) {
      changeFacebookRegistration(false, false);
      this.setState({
        btnText: "Login as Owner",
        btnTextFB: "Login with Facebook"
      })
    } else {
      changeFacebookRegistration(true, false);
      this.setState({
        btnText: "Register as Owner",
        btnTextFB: "Register with Facebook"
      })
    }
  }

  registrationSuccessCallback() {
    //go to login page
  }

  registerFacebook(response) {
    let ownerObject = {
      email: response.email,
      password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
      fullName: response.name,
      socialMediaID: response.userID,
      socialMediaType: "Facebook",
      profilePhotoUrl: response.picture.data.url
    }

    // added delay to change button text to previous
    setTimeout(
      function () {
        // enable the button
        this.setState({
          createBtn: false
        })
        this.resetButtons();
      }.bind(this),
      1000
    );

    //await
    let createOwnerAction = startOwnerCreation(ownerObject).then((res) => {
      if (!res.success) {
        //show modal wrong with message
        let messageObject = {
          header: "Error with Registration",
          message: res.message,
          callbackFunc: this.loginRegistrationFailureCallback
        };
        showMessage(messageObject);
        dismissLoading();
      } else {
        ReactGA.set({
          userId: res.data.email,
          fullName: res.data.fullName
        });
        //show modal success
        let messageObject = {
          header: "Successfully Registered",
          message: "You have successfully registered your account, and your pet companion is tagged to that account. Please verify your account via the email link we sent you.",
          callbackFunc: this.registrationSuccessCallback
        };
        showMessage(messageObject);
        dismissLoading();
        this.props.history.push('/owner/pets');
      }
    });

  }

  loginFacebook(response) {

    let ownerObject = {
      socialMediaId: response.userID,
      socialMediaType: "Facebook",
      password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
    }

    let loginOwnerAction = loginOwnerSocialMedia(ownerObject).then((res) => {
      if (!res.success) {
        this.registerFacebook(response);
      } else {
        ReactGA.set({
          userId: res.data.email,
          fullName: res.data.fullName
        });
        //show modal success
        let messageObject = {
          header: "Successfully Logged In",
          message: "You have successfully Logged into your account, and your pet companion will be tagged to that account.",
          callbackFunc: this.loginSuccessCallback
        };
        dismissLoading();
        showMessage(messageObject);

      }
    });
  }

  responseFacebook = (response) => {


    if (this.state.isRegistration) {
      setLoading("Registrating Facebook...");
      //Create owner object
      let ownerObject = {
        email: response.email,
        password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
        fullName: response.name,
        socialMediaID: response.userID,
        socialMediaType: "Facebook",
        profilePhotoUrl: response.picture.data.url
      }


      // added delay to change button text to previous
      setTimeout(
        function () {
          // enable the button
          this.setState({
            createBtn: false
          })
          this.resetButtons();
        }.bind(this),
        1000
      );

      //await
      let createOwnerAction = startOwnerCreation(ownerObject).then((res) => {
        if (!res.success) {
          //show modal wrong with message
          /*let messageObject = {
            header: "Error with Registration",
            message: res.message,
            callbackFunc: this.loginRegistrationFailureCallback
          };
          //login instead
          showMessage(messageObject);
          dismissLoading();*/
          this.loginFacebook(response);
        } else {
          ReactGA.set({
            userId: res.data.email,
            fullName: res.data.fullName
          });
          //show modal success
          let messageObject = {
            header: "Successfully Registered",
            message: "You have successfully registered your account, and your pet companion is tagged to that account. Please verify your account via the email link we sent you.",
            callbackFunc: this.registrationSuccessCallback
          };
          showMessage(messageObject);
          dismissLoading();
          this.props.history.push('/owner/pets');
        }
      });

    } else {
      setLoading("Logging in with Facebook...");
      let ownerObject = {
        socialMediaId: response.userID,
        socialMediaType: "Facebook",
        password: sha256(process.env.REACT_APP_PASSWORD_SALT + response.userID).toString(),
      }

      let loginOwnerAction = loginOwnerSocialMedia(ownerObject).then((res) => {
        if (!res.success) {
          //show modal wrong with message
          /*let messageObject = {
            header: "Error with Login",
            message: res.message,
            callbackFunc: this.loginRegistrationFailureCallback
          };*/
          //dismissLoading();
          //showMessage(messageObject);
          //Register instead
          this.registerFacebook(response);
        } else {
          ReactGA.set({
            userId: res.data.email,
            fullName: res.data.fullName
          });
          //show modal success
          let messageObject = {
            header: "Successfully Logged In",
            message: "You have successfully Logged into your account, and your pet companion will be tagged to that account.",
            callbackFunc: this.loginSuccessCallback
          };
          dismissLoading();
          showMessage(messageObject);

        }
      });
    }
  }

  loginSuccessCallback() {
    //GO TO PET PAGE*****
    this.props.history.push('/owner/pets');
  }

  loginRegistrationFailureCallback() {
    //create pet
    if (this.state.isRegistration) {
      changeFacebookRegistration(false, false);
      this.setState({
        btnText: "Login as Owner",
        btnTextFB: "Login with Facebook",
        disableBtn: false,
      })
    } else {
      changeFacebookRegistration(true, false);
      this.setState({
        btnText: ("Register as Owner"),
        btnTextFB: "Register with Facebook",
        disableBtn: false,
      });
    }
  }

  handleFormValueChange(inputName, event) {
    let stateValue = {};
    stateValue[inputName] = event.target.value;
    this.setState(stateValue);
  }

  handleSubmit(event) {

    event.preventDefault();

    setTimeout(
      function () {
        // enable the button
        this.setState({
          createBtn: false
        })
        this.resetButtons();
      }.bind(this),
      1000
    );

    if (this.state.isFacebookLogin) {
      setLoading("Logging in with Facebook...");
      return;
    }

    if (validateEmail(this.state.email) != "") {
      showMessageFull("Login/Registration Failed", "Please enter a valid email");
      return;
    }
    if (this.state.isRegistration && this.state.password != this.state.password2) {
      showMessageFull("Login/Registration Failed", "Passwords don't match");
      return;
    }

    if (this.state.password.length < 8) {
      showMessageFull("Login/Registration Failed", "Passwords must me at least 8 characters long");
      return;
    }

    // disable the button
    this.setState({
      disableBtn: true
    });
    if (this.state.isRegistration) {
      setLoading("Registering...");
      //Create owner object
      let ownerObject = {
        email: this.state.email,
        password: sha256(process.env.REACT_APP_PASSWORD_SALT + this.state.password).toString(),
        fullName: this.state.ownerName
      }

      // added delay to change button text to previous


      //await
      let createOwnerAction = startOwnerCreation(ownerObject).then((res) => {
        if (!res.success) {
          //show modal wrong with message
          let messageObject = {
            header: "Error with Registration",
            message: res.message,
            callbackFunc: this.loginRegistrationFailureCallback
          };
          showMessage(messageObject);
          dismissLoading();
        } else {
          ReactGA.set({
            userId: res.data.email,
            fullName: res.data.fullName
          });
          //show modal success
          let messageObject = {
            header: "Successfully Registered",
            message: "You have successfully registered your account, and your pet companion is tagged to that account. Please verify your account via the email link we sent you.",
            callbackFunc: this.registrationSuccessCallback
          };
          showMessage(messageObject);
          dismissLoading();
          this.props.history.push('/owner/pets');
        }
      });

    } else {
      setLoading("Logging in...");
      let ownerObject = {
        email: this.state.email,
        password: sha256(process.env.REACT_APP_PASSWORD_SALT + this.state.password).toString(),
      }

      let loginOwnerAction = startOwnerLogin(ownerObject).then((res) => {
        if (!res.success) {
          //show modal wrong with message
          let messageObject = {
            header: "Error with Login",
            message: res.message,
            callbackFunc: this.loginRegistrationFailureCallback
          };
          showMessage(messageObject);
          dismissLoading();
        } else {
          ReactGA.set({
            userId: res.data.email,
            fullName: res.data.fullName
          });
          //show modal success
          let messageObject = {
            header: "Successfully Logged In",
            message: "You have successfully Logged into your account, and your pet companion will be tagged to that account.",
            callbackFunc: this.loginSuccessCallback
          };
          showMessage(messageObject);
          dismissLoading();

        }
      });
    }
  }

  render() {
    return (
      <React.Fragment >

        < div className="container mt-100">
          <div className="row">
            <div className="col-sm-12 col-md-6 offset-md-6 col-lg-6 offset-lg-6 text-center">
              <h4 style={{ color: "#f78459" }}>Login or Sign-up to view your pets!.</h4>
            </div>
          </div>

          <div className="row">
            {/*<div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                <img src="img/placeholder/CandleFinal.jpg" className="rounded text-center" maxWidth="100%" />
                </div>*/}
            {isBrowser && <div className="col-sm-12 col-md-6 col-lg-6 text-center my-auto">
              <img src="img/main/pet/pet_candle.png" className="rounded text-center" width="70%" />
            </div>}
            <div className="col-sm-12 col-md-6 col-lg-6 text-center my-auto">
              <div className="row text-center justify-content-center align-items-center" >

                <section className="contact-us-section ptb-25">
                  <div className="container">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-md-12 col-lg-12">
                        <div className="section-heading mb-4">
                          <p className="lead">
                            By logging in / signing up, we can attach the pet to your owner's account.
                                                        </p>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                      <div className="col-md-12">
                        <form
                          method="POST"
                          id="contactForm1"
                          className="contact-us-form"
                          noValidate="novalidate"
                          onSubmit={this.handleSubmit}
                        >
                          {this.state.isRegistration &&
                            <div className="row">
                              <div className="col-sm-12 col-12">
                                <div className="form-group">
                                  <input
                                    value={this.state.ownerName}
                                    onChange={e => this.handleFormValueChange("ownerName", e)}
                                    type="text"
                                    className="form-control"
                                    name="ownerName"
                                    placeholder="Enter username"
                                    required="required"
                                    autocomplete="name"
                                  />
                                </div>
                              </div>
                            </div>
                          }
                          <div className="row">
                            <div className="col-sm-12 col-12">
                              <div className="form-group">
                                <input
                                  autocomplete="username email"
                                  value={this.state.email}
                                  onChange={e => this.handleFormValueChange("email", e)}
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Enter email"
                                  required="required"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 col-12">
                              <div className="form-group">
                                <input
                                  value={this.state.password}
                                  onChange={e => this.handleFormValueChange("password", e)}
                                  autocomplete="password"
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  placeholder="Enter password"
                                  required="required"
                                />
                              </div>
                            </div>
                          </div>
                          {this.state.isRegistration &&
                            <div className="row">
                              <div className="col-sm-12 col-12">
                                <div className="form-group">
                                  <input
                                    value={this.state.password2}
                                    onChange={e => this.handleFormValueChange("password2", e)}
                                    type="password"
                                    className="form-control"
                                    name="password2"
                                    placeholder="Re-enter password"
                                    required="required"
                                  />
                                </div>
                              </div>
                            </div>
                          }
                          <div className="row" style={{ marginBottom: "5px" }}>
                            <div className="col-sm-12">

                              <a onClick={() => this.changeRegistration()} style={{ marginBottom: "5px", cursor: "pointer" }}>
                                <u> {this.state.isRegistration && "Already have an account? Click here?"}
                                  {!this.state.isRegistration && "Don't have an account? Click here to register."}
                                </u>
                              </a>
                              <br />
                              <a href="resetpassword" style={{ marginBottom: "5px", cursor: "pointer" }}>
                                {!this.state.isRegistration && "Forget Password? Click here to reset password."}
                              </a>
                            </div>
                          </div>

                          <div className="row mt-25">
                            <div className="col-sm-6">
                              <Button
                                type="submit"
                                className="btn primary-solid-btn"
                                style={{ backgroundColor: "#28a745", borderColor: "#28a745", width: "80%" }}
                                id="btnContactUs"
                                disabled={this.state.disableBtn}
                                variant="primary"
                                onClick={() => {
                                  this.changeBtnText("Loading...");
                                }}
                              >
                                {
                                  this.state.disableBtn && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ marginRight: "5px" }}
                                  />
                                }
                                {this.state.btnText}
                              </Button>
                            </div>
                            <div className="col-sm-6">
                              <FacebookLogin
                                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                onClick={() => { changeFacebookRegistration(this.state.isRegistration, true); }}
                                disableMobileRedirect={true}
                                autoLoad={false}
                                render={renderProps => (

                                  <button className="btn primary-solid-btn"
                                    style={{ width: "80%" }}
                                    onClick={renderProps.onClick}>{this.state.btnTextFB}</button>
                                )} />
                            </div>


                          </div>
                        </form>
                        <p className="form-message"></p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

            </div>

          </div>

        </div>


      </React.Fragment>
    );
  }
}

export default withRouter(LoginComponent);
