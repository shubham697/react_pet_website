import React from "react";
import _data from "../../data";

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: {},
      trustedCompany: []
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */

    this.setState({
      hero: _data.hero,
      trustedCompany: _data.trustedCompanyGray
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* start hero section */}
        <section
          className="hero-section pt-100 background-img"
          style={{
            background: `url(${this.state.hero.bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "center / cover"
          }}
        >
          <div className="container">
            <div className="row align-items-center justify-content-between pt-5 pb-5">
              <div className="col-md-6 col-lg-6">
                <div className="hero-content-left text-white">
                  <h1 className="text-white">
                    {this.state.hero.title}
                  </h1>
                  <p className="lead">
                    {this.state.hero.description}
                  </p>

                  <a href="/#" className="btn solid-btn btn-primary">
                    Contact us
                  </a>

                  <div className="client-section-wrap mt-5">
                    <p>Trusted by companies like: </p>
                    <ul className="list-inline">
                      {(this.state.trustedCompany || []).map((image, index) => {
                        if (index === 4) {
                          return ("");
                        }
                        return (
                          <li className="list-inline-item" key={index}>
                            <img
                              src={image}
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
              <div className="col-md-6 col-lg-5">
                <div className="hero-animation-img">
                  {(this.state.hero.animations || []).map((image, index) => {

                    return (
                      <img
                        className={image.className}
                        src={image.src}
                        alt="animation"
                        width={image.width}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-img">
            <img src="img/bg-wave.svg" alt="wave shape" className="img-fluid" />
          </div>
        </section>
        {/* end hero section */}
      </React.Fragment>
    );
  }
}

export default HeroSection;
