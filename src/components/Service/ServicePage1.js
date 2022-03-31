import React from "react";
import _data from "../../data";

class ServicePage extends React.Component {
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
      service: _data.serviceAboutUs
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="imageblock-section switchable gray-light-bg">
          <div className="imageblock-section-img col-lg-5 col-md-4">
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
              <div className="col-lg-6 col-md-7">
                <div className="about-content ptb-100">
                  <h2>Beautifully handcrafted templates for your website</h2>
                  <p className="lead">
                    Energistically underwhelm viral niche markets via low-risk
                    high-yield partnerships. Distinctively transition
                    backward-compatible functionalities with client-focused
                    expertise. Appropriately enable covalent.{" "}
                  </p>
                  <div className="mt-4">
                    <ul className="feature-list">
                      <li>
                        Beautiful and easy to understand UI, professional
                        animations
                      </li>
                      <li>
                        Theme advantages are pixel perfect design &amp; clear
                        code delivered
                      </li>
                      <li>
                        Present your services with flexible, convenient and
                        multipurpose
                      </li>
                      <li>Find more creative ideas for your projects </li>
                      <li>Unlimited power and customization possibilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ServicePage;
