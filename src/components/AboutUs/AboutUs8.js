import React from "react";
import _data from "../../data";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      aboutUs: _data.aboutUsMain
    });
  }

  render() {
    return (
      <React.Fragment>
        <section
          id="about"
          className="imageblock-section switchable switchable-content gray-light-bg"
        >
          <div className="imageblock-section-img col-lg-5 col-md-4">
            <div
              className="background-image-holder"
              style={{
                background: `url(${this.state.aboutUs.image})`,
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
              <div className="col-lg-6 col-md-7">
                <div className="about-content ptb-100">
                  <p className="color-secondary">
                    <strong>About Us</strong>
                  </p>
                  <h2>{this.state.aboutUs.title}</h2>
                  <p>{this.state.aboutUs.description}</p>
                  <div className="row mt-3">
                    {(this.state.aboutUs.items || []).map((item, index) => {
                      return (
                        <div className="col single-feature mb-4" key={index}>
                          <div className="d-flex align-items-center mb-2">
                            <span className={item.icon}></span>
                            <h5 className="mb-0">{item.title}</h5>
                          </div>
                          <p>{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                  <a href="/#" className="btn solid-btn">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default About;
