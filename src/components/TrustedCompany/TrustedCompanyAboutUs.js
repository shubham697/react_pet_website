import React from "react";
import _data from "../../data";

class TrustedCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trustedCompany: []
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */

    this.setState({
      trustedCompany: _data.trustedCompanyAboutUs
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="client-section ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="section-heading text-center mb-5">
                  <h2>{this.state.trustedCompany.title}</h2>
                  <p className="lead">
                    {this.state.trustedCompany.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="owl-carousel owl-theme clients-carousel dot-indicator">
                  {(this.state.trustedCompany.companies || []).map(
                    (company, index) => {
                      return (
                        <div className="item single-client" key={index}>
                          <img
                            src={company}
                            alt="client logo"
                            className="client-img"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default TrustedCompany;
