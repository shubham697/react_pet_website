import React from "react";
import _data from "../../data";

class TrustedCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero2: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      hero2: _data.hero2
    });
  }


  render() {
    return (
      <React.Fragment>
        {/* start hero section */}
        <section
          className="hero-section pt-100 background-img"
          style={{
            background: "url('img/hero-bg-1.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "center / cover"
          }}
        >
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6 col-lg-6">
                <div className="hero-content-left text-white mt-5">
                  <h1 className="text-white">
                    {this.state.hero2.title}
                  </h1>
                  <p className="lead">
                  {this.state.hero2.description}
                  </p>

                  <a href="/#" className="btn solid-btn btn-primary">
                    Get Start Now
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-5">
                <div className="hero-animation-img">
                  <img
                    className="img-fluid d-block animation-one"
                    src="img/hero-app_development_02.svg"
                    alt="animation"
                  />
                  <img
                    className="img-fluid d-none d-lg-block animation-two"
                    src="img/hero-app_development_01.svg"
                    alt="animation"
                    width="120"
                  />
                  <img
                    className="img-fluid d-none d-lg-block animation-four animation-new"
                    src="img/hero-app_development_03.svg"
                    alt="animation"
                    width="100"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <ul className="list-inline counter-wrap">
              {(this.state.hero2.counters || []).map((item, index) => {
                    return (
                      <li className="list-inline-item" key={index}>
                      <div className="single-counter text-center">
                        <span>{item.count}</span>
                        <h6>{item.name}</h6>
                      </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>
        {/* end hero section */}
      </React.Fragment>
    );
  }
}

export default TrustedCompany;
