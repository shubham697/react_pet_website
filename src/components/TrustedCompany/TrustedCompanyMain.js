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
      trustedCompany: _data.trustedCompany
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="pb-100">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-12">
                <div className="client-section-wrap d-flex flex-row align-items-center">
                  <h6 className="lead mr-5 mb-0">Trusted by companies like:</h6>
                  <ul className="list-inline justify-content-between">
                    {(this.state.trustedCompany || []).map((company, index) => {
                      return (
                        <li className="list-inline-item" key={index}>
                          <img
                            src={company}
                            width="85"
                            alt="client"
                            className="img-fluid"
                          />
                        </li>
                      );
                    })}
                  </ul>
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
