import React from "react";
import { connect } from "react-redux";
import LoginHeaderComponent from "../Login/LoginHeaderComponent";
import UserHeaderComponent from "../User/UserHeaderComponent";
import ownerStore from "../../stores/ownerStore";
import { Link } from 'react-router-dom'

class Header extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      owner: ownerStore.getOwnerObject()
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ownerStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ownerStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({ owner: ownerStore.getOwnerObject() });
  }

  render() {
    return (
      <React.Fragment>
        {/* start header section */}
        <header className="header" styles={{ zIndex: "20" }}>
          <nav className="navbar navbar-expand-lg fixed-top">
            {this.state.owner.jwt == null &&
              <div className="container">
                <a className="navbar-brand logo-placement" href="/" style={{ marginTop: "15px" }}>
                  <img
                    src="https://res.cloudinary.com/jjsinc/image/upload/v1584729588/constants-project-pets/company_logo_tpb_u3fxg1.png"
                    width="170"
                    alt="logo"
                    className="img-fluid"
                  />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="ti-menu"></span>
                </button>

                <div
                  className="collapse navbar-collapse main-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link page-scroll" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link page-scroll" href="/discover">Discover</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link page-scroll" href="/feedback">Feedback</a>
                    </li> */}
                    {this.state.owner.jwt == null && <LoginHeaderComponent />}
                  </ul>
                </div>
              </div>
            }
            {this.state.owner.jwt != null &&
              <div className="container">
                <a className="navbar-brand" href="/" style={{ marginTop: "15px" }}>
                  <img
                    src="https://res.cloudinary.com/jjsinc/image/upload/v1584729588/constants-project-pets/company_logo_tpb_u3fxg1.png"
                    width="175"
                    alt="logo"
                    className="img-fluid"
                  />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="ti-menu"></span>
                </button>

                <div
                  className="collapse navbar-collapse main-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto">

                    {this.state.owner.jwt != null &&
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link page-scroll"
                          href="/owner/pets"
                        >
                          My Pets
                  </a>

                      </li>
                    }
                    {/*
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link page-scroll"
                        href="/home"
                      >
                        Home
                    </a>

                    </li>
                  */}
                    <li className="nav-item">
                      <Link className="page-scroll"
                        to="/discover"
                        activeClassName="active">
                        Discover
                    </Link>
                    </li>
                    {this.state.owner.jwt == null &&
                      <li className="nav-item">
                        <a
                          className="nav-link page-scroll"
                          href="/about-us">
                          About
                      </a>
                      </li>
                    }
                    {/*<li className="nav-item">
                      <a className="nav-link page-scroll" href="/contact">
                        Contact Us
                    </a>
                  </li>*/}
                    {/*<li className="nav-item">
                    <a className="nav-link page-scroll" href="/login">
                      Login
                    </a>
    </li>*/}
                    {this.state.owner.jwt == null && <LoginHeaderComponent />}
                    {this.state.owner.jwt != null && <UserHeaderComponent />}

                  </ul>
                </div>
              </div>
            }
          </nav>
        </header>
        {/* end header section */}
      </React.Fragment>
    );
  }
}

export default connect(state => ({}))(Header);
