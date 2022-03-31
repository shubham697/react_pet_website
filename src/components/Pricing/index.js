import React from "react";
import _data from "../../data";

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {}
    };
  }

  componentDidMount() {
    /**
     * Your ajax will goes here to get data then call setState
     */
    this.setState({
      price: _data.price
    });
  }
  render() {
    return (
      <React.Fragment>
        <section id="pricing" className={"package-section ptb-100 " + (this.props.bgColor && this.props.bgColor === 'white' ? '' : 'gray-light-bg')}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="section-heading text-center mb-5">
                  <h2>{this.state.price.title}</h2>
                  <p className="lead">{this.state.price.description}</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {(this.state.price.packages || []).map((_package, index) => {
                return (
                    <div className="col-lg-4 col-md" key={index}>
                    <div className={"card text-center single-pricing-pack " + (_package.isFeatured ? 'primary-bg ' : '')}>
                      <div className={"card-header py-5 border-0 pricing-header " + (_package.isFeatured ? 'text-white' : '')}>
                        <div className="h1 text-center mb-0">
                          <span className="price font-weight-bolder">{_package.price}</span>
                        </div>
                        <span className={"h6 " + (_package.isFeatured ? 'text-white' : 'text-muted')}>{_package.license}</span>
                      </div>
                      <div className="card-body">
                        <ul className={"list-unstyled text-sm mb-4 pricing-feature-list " + (_package.isFeatured ? 'text-white' : '')}>
                        {(_package.features || []).map(feature => {
                            return (
                                <li key={feature}>{feature}</li>
                            )
                        })}
                        </ul>
                        <a
                          href="/#"
                          className={"btn mb-3 " + (_package.isFeatured ? 'solid-btn' : 'primary-solid-btn')}
                          target="_blank"
                        >
                          Purchase now
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 text-center">
              <p className="mb-2">
                If you need custom services or Need more?{" "}
                <a href="/#" className="color-secondary">
                  Contact us
                </a>
              </p>
            </div>
            {
              this.props.faq &&
              <div className="row pt-5">
                <div className="col-md-6">
                    <div className="single-faq">
                        <h5>How can I pay for this?</h5>
                        <p>Intrinsicly implement high standards in strategic theme areas via inexpensive solutions.
                            Assertively conceptualize prospective bandwidth whereas client-based imperatives.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-faq">
                        <h5>Is it possible to pay yearly?</h5>
                        <p>Assertively iterate user friendly innovation without open-source markets. Monotonectally extend
                            resource sucking manufactured products without high-payoff paradigms. Objectively customize
                            ubiquitous information before economically sound relationships. </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-faq">
                        <h5>Do you offer discounts on multiple items?</h5>
                        <p>Dramatically target focused testing procedures after holistic ideas. Collaboratively maximize
                            high-payoff ROI and value-added products. Distinctively deliver cooperative collaboration and
                            idea-sharing whereas customized</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-faq">
                        <h5>Is VAT included in plan prices?</h5>
                        <p>Distinctively simplify high-quality initiatives for highly efficient applications. Monotonectally
                            repurpose integrated customer service after magnetic e-services. </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-faq">
                        <h5>Will I pay more for some features?</h5>
                        <p>Enthusiastically pontificate resource-leveling supply chains whereas scalable markets.
                            Authoritatively streamline resource maximizing methods of empowerment</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-faq">
                        <h5>Why are there no limits on the number of messages?</h5>
                        <p>Assertively target turnkey ideas for market-driven portals. Appropriately e-enable world-class
                            intellectual capital whereas 2.0 mindshare.</p>
                    </div>
                </div>
              </div>
            }
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Pricing;
