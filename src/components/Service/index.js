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
      service: _data.service
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* start header section */}
        <section id="services" className="imageblock-section switchable">
          <div className="imageblock-section-img col-lg-6 col-md-5">
            <div
              className="background-image-holder"
              style={{
                background: "url('img/hero-bg-5.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "center / cover",
                opacity: 1
              }}
            >
              {" "}
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="about-content ptb-100">
                  <h2>{this.state.service.title}</h2>
                  <p>{this.state.service.description}</p>

                  {(this.state.service.items || []).map(item => {
                    return (
                      <div className="single-feature mb-4" key={item.title}>
                        <div className="d-flex align-items-center mb-2">
                          <span className={item.icon}></span>
                          <h5 className="mb-0">{item.title}</h5>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end header section */}
      </React.Fragment>
    );
  }
}

export default Service;
