import React, { Component } from "react";
import _data from "../../data";

class Testimonial extends Component {
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
      <div>
        <section className={"testimonial ptb-100 " + (this.props.bgColor && this.props.bgColor === 'gray' ? 'gray-light-bg' : '')}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="section-heading text-center mb-5">
                  <h2>{this.state.testimonial.title}</h2>
                  <p className="lead">{this.state.testimonial.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="owl-carousel owl-theme owl-loaded owl-drag client-testimonial dot-indicator">
                {(this.state.testimonial.comments || []).map(
                  (comment, index) => {
                    return (
                      <div className="item" key={index}>
                        <div className={"testimonial-wrap " + (this.props.bgColor && this.props.bgColor === 'gray' ? 'white-bg' : '')}>
                          <blockquote className="mb-4 mt-4 lead">
                            {comment.comment}
                          </blockquote>
                          <div className="media author-info">
                            <div className="author-img mr-3">
                              <img
                                src={comment.image}
                                alt="client"
                                className="img-fluid rounded-circle"
                              />
                            </div>
                            <div className="media-body">
                              <h5 className="mb-0">{comment.name}</h5>
                              <span>{comment.company}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Testimonial;
