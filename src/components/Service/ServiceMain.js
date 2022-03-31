import React from "react";
import _data from "../../data";

class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */

    const tempService = {};
    tempService.title = _data.serviceTemp.title;
    tempService.description = _data.serviceTemp.description;
    tempService.items = _data.serviceTemp.items;
    this.setState({
      service: tempService
    });
  }

  render() {
    return (
      <React.Fragment>
        <section id="services" className="our-services-section ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-7">
                <div className="section-heading text-center text-center">
                  <p className="color-secondary"><strong>Our Services</strong></p>
                  <h2>{this.state.service.title}</h2>
                  <p className="lead">{this.state.service.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              {(this.state.service.items || []).map((item, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <div className="single-services text-center mt-3 p-3">
                      <div className="about-content">
                          <img src={item.image} alt="service" className="img-fluid" />
                      </div>
                      <div className="feature-content pt-3">
                        <h5 className="mb-2">{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Service;
