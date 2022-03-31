import React, { Component } from "react";
import { connect } from "react-redux";
import { submitContact } from "../../actions/index";
import _data from "../../data";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      disableContactBtn: false,
      contactBtnText: "Send Message",
      contact: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

 /**
 * When we click on Send button, changeBtnText function will help to change text
 * @param contactBtnText
 */
  changeBtnText = contactBtnText => {
    this.setState({ contactBtnText });
  };

  /**
   * Get all form data and set to the state
   * @param contactBtnText
   */
  handleFormValueChange(inputName, event) {
    let stateValue = {};
    stateValue[inputName] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(stateValue);
  }

  /**
   * Submit the form and dispatch to the store
   * @param contactBtnText
   */
  handleSubmit(event) {
    event.preventDefault();

    // disable the button
    this.setState({ disableContactBtn: true });

    // get action
    const contactAction = submitContact(this.state);

    // Dispatch the contact from data
    this.props.dispatch(contactAction);

    // added delay to change button text to previous
    setTimeout(
      function() {
        // enable the button
        this.setState({ disableContactBtn: false });

        // change to button name
        this.changeBtnText("Send Message");

        // get action again to update state
        const contactAction = submitContact(this.state);

        // Dispatch the contact from data
        this.props.dispatch(contactAction);

        // clear form data
        this.setState({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: ""
        });
      }.bind(this),
      3000
    );
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      contact: _data.contact
    });
  }

  render() {
    return (
      <React.Fragment>
        <section id="contact" className={"contact-us ptb-100 " + (this.props.bgColor && this.props.bgColor === 'white' ? '':  'gray-light-bg')}>
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="section-heading">
                  <h3>{this.state.contact.title}</h3>
                  <p>{this.state.contact.description}</p>
                </div>
                <div className="footer-address">
                  <h6>
                    <strong>{this.state.contact.office}</strong>
                  </h6>
                  <p>{this.state.contact.address}</p>
                  <ul>
                    <li>
                      <span>Phone: {this.state.contact.phone}</span>
                    </li>
                    <li>
                      <span>
                        Email :{" "}
                        <a href="mailto:hello@yourdomain.com">
                          {this.state.contact.email}
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-7">
                <form
                  method="POST"
                  id="contactForm1"
                  className="contact-us-form"
                  noValidate="novalidate"
                  onSubmit={this.handleSubmit}
                >
                  <h5>Reach us quickly</h5>
                  <div className="row">
                    <div className="col-sm-6 col-12">
                      <div className="form-group">
                        <input
                          value={this.state.name}
                          onChange={e => this.handleFormValueChange("name", e)}
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Enter name"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-12">
                      <div className="form-group">
                        <input
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
                    <div className="col-sm-6 col-12">
                      <div className="form-group">
                        <input
                          value={this.state.phone}
                          onChange={e => this.handleFormValueChange("phone", e)}
                          type="text"
                          name="phone"
                          className="form-control"
                          id="phone"
                          placeholder="Your Phone"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-12">
                      <div className="form-group">
                        <input
                          value={this.state.company}
                          onChange={e =>
                            this.handleFormValueChange("company", e)
                          }
                          type="text"
                          name="company"
                          size="40"
                          className="form-control"
                          id="company"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          onChange={e =>
                            this.handleFormValueChange("message", e)
                          }
                          value={this.state.message}
                          name="message"
                          id="message"
                          className="form-control"
                          rows="7"
                          cols="25"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mt-3">
                      <button
                        type="submit"
                        className="btn primary-solid-btn"
                        id="btnContactUs"
                        disabled={this.state.disableContactBtn}
                        onClick={() => {
                          this.changeBtnText("Sending...");
                        }}
                      >
                        {this.state.contactBtnText}
                      </button>
                    </div>
                  </div>
                </form>
                <p className="form-message"></p>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  state
}))(Login);
