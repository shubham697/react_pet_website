import React from "react";
import _data from "../../data";

class Counter extends React.Component {
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
        <section id="counterSection" className="imageblock-section switchable">
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
                <div className="row counter ptb-100">
                  {(this.state.aboutUs.counts || []).map(item => {
                    return (
                      <div className="col-6 mb-4" key={item.title}>
                        <div className={item.boxClass5}>
                          <span className={item.icon}></span>
                          <h3>{item.count}</h3>
                          <p>{item.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Counter;
