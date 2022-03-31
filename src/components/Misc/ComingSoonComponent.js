import React, { Component } from "react";

class ComingSoonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <section className="ptb-100 gray-light-bg">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6 col-md-6">
                <div className="about-content">
                  <img src="img/placeholder/UnderConstruction.jpg" alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="about-content">
                  <h2>This page is under construction.</h2>
                  <p className="text-justify">
                    This feature and page is under construction, please visit back in
                    at a later date.{" "}
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

export default ComingSoonPage;
