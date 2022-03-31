import React from "react";
import { connect } from "react-redux";
import _data from "../../data";

class PromoSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promo: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      promo: _data.promoMain
    });

    /**
     * import { postPromo } from "../../actions/index";
     *
     * After any action we can dispatch our data
     * // get action
     * const promoAction = postPromo(this.state);
     *
     * // Dispatch the promo data
     * this.props.dispatch(promoAction);
     *
     */
  }

  render() {
    return (
      <React.Fragment>
        {/* start promo section */}
        <section className="promo-section ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="section-heading text-center mb-5">
                  <h2>{this.state.promo.title}</h2>
                  <p className="lead">{this.state.promo.description}</p>
                </div>
              </div>
            </div>
            <div className="row equal">
              {(this.state.promo.items || []).map(item => {
                return (
                  <div className="col-md-4 col-lg-4" key={item.title}>
                    <div className="single-promo single-promo-hover text-center gray-light-bg h-100">
                      <div>
                        <img
                          src={item.bgImage}
                          alt="promo"
                          className="img-fluid img-full-box"
                        />
                      </div>
                      <div className="p-4">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* end promo section */}
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  state
}))(PromoSection);
