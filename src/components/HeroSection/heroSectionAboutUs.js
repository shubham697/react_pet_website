import React from "react";
import _data from "../../data";

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      hero: _data.heroAboutUs
    });
  }

  render() {
    return (
      <React.Fragment>
        <section
          className="hero-section background-img ptb-100"
          style={{
            background: "url('img/animals-background.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "center / cover",
            backgroundColor:"white"
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-7">
                <div className="page-header-content text-white text-center pt-5">
                  <h1 className="text-white mb-1">{ this.props.title ? this.props.title : this.state.hero.title }</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default HeroSection;
