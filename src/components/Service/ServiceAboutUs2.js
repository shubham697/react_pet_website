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
    this.setState({
      service: _data.serviceAboutUs2
    });
  }

  render() {
    return (
      <React.Fragment>
        <section id="services" className="our-services-section ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-7">
                <div className="section-heading text-center mb-5">
                  <h2>{this.state.service.title}</h2>
                  <p className="lead">{this.state.service.description}</p>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              {(this.state.service.items || []).map((item, index) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 col-sm-6 col-12"
                    key={index}
                  >
                    <div className="single-services single-feature-hover gray-light-bg single-feature text-center p-5 h-100">
                      <span className={item.icon}></span>
                      <div className="feature-content">
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
