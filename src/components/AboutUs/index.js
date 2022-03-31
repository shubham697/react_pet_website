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
      aboutUs: _data.aboutUs
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* start header section */}
        <section id="about" className={"about-us ptb-100 " + (this.props.bgColor && this.props.bgColor === 'white' ? '' : 'gray-light-bg')}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="about-content-left">
                  <h2>{this.state.aboutUs.title}</h2>
                  <p className="lead">{this.state.aboutUs.description}</p>

                  <div className="row">
                    {(this.state.aboutUs.items || []).map(item => {
                      return (
                        <div
                          className="col single-feature mb-4"
                          key={item.title}
                        >
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
                    Contact with us
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="counter">
                  {(this.state.aboutUs.counts || []).map(item => {
                    return (
                      <div className={item.boxClass} key={item.title}>
                        <span className={item.icon}></span>
                        <h3>{item.count}</h3>
                        <p>{item.title}</p>
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

export default About;
