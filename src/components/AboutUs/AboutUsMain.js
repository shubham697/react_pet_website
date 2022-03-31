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

    const tempAbout = {};
    tempAbout.title = _data.aboutUsMain.title;
    tempAbout.description = _data.aboutUsMain.description;
    tempAbout.aboutImage = _data.aboutUsMain.aboutImage;
    tempAbout.items = _data.aboutUsMain.items;
    tempAbout.items2 = _data.aboutUsMain.items;
    this.setState({
      aboutUs: tempAbout
    });
  }

  render() {
    return (
      <React.Fragment>
        <section id="about" className="about-us ptb-100 gray-light-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="about-content-left">
                  <p className="color-secondary">
                    <strong>About Us</strong>
                  </p>
                  <h2>{this.state.aboutUs.title}</h2>
                  <p>{this.state.aboutUs.description}</p>
                  <div className="row mt-5">
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
                  <div className="row">
                    {(this.state.aboutUs.items2 || []).map((item, index) => {
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
              <div className="col-md-6">
                <div className="about-content-right">
                  <img
                    src={this.state.aboutUs.aboutImage}
                    alt="about us"
                    className="img-fluid"
                  />
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
