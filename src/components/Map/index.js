import React, { Component } from "react";

class Map extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="google-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.953735315922!3d-37.817323442021234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sbd!4v1571030260624!5m2!1sen!2sbd"
            height="450"
            style={{border: 0}}
            allowFullScreen=""
            title="map"
          ></iframe>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
