import React, { Component } from "react";
import _data from "../../data";

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonial: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      testimonial: _data.testimonial
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="ptb-100 gray-light-bg">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6 col-md-6">
                <div className="about-content">
                  <img src="img/placeholder/Business.jpg" alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="about-content">
                  <h2>The commmunity helps you find solace.</h2>
                  <p className="text-justify">
                    The death of a pet companion is no trivial matter.
                    It is sometimes the most pivotal moments of our lives.
                    There is little way to turn when you are experiencing this,
                    aside from sharing memories with family and friends.
                    This platform brings together all of your counterparts
                    facing the same pain and shares your pet companion's story
                    to the whole world. This way, you can find solace knowing
                    that your pet companions are still alive - albeit in a 
                    different world.{" "}
                  </p>
                  <p className="text-justify">
                    A community of solace and comfort is what you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Business;
