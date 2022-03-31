import React from "react";
import _data from "../../data";

class Promo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promo: {},
      trustedCompany: []
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */

    this.setState({
      promo: _data.promoMain
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="promo-section pb-100 mt--120">
          <div className="container">
            <div className="row equal">
              {(this.state.promo.items || []).map((item, index) => {
                return (
                  <div className="col-md-4 col-lg-4" key={index}>
                    <div className="single-promo single-promo-hover single-promo-1 rounded text-center white-bg p-5 h-100">
                      <div className="mb-5">
                        <img className="rounded" src={item.bgImage}/>
                      </div>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Promo;
