import React from "react";
import _data from "../../data";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      video: _data.video
    });
  }

  render() {
    return (
      <React.Fragment>
        <section
          className="video-promo ptb-100 background-img"
          style={{
            background: "url('img/video-bg.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "center / cover"
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="video-promo-content mt-4 text-center">
                  <a href={this.state.video.link} className="popup-youtube video-play-icon d-inline-block">&nbsp;</a>
                  <h5 className="mt-4 text-white">Watch video overview</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Video;
