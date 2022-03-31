import React from "react";
import _data from "../../data";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';

class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        /**
         * Your ajax will goes here to get data then call setState
         */

        this.setState({
            hero: _data.heroMain
        });

        this.createPet = this.createPet.bind(this);
        this.discoverPets = this.discoverPets.bind(this);

        /*const script = document.createElement('script');
        script.type = "text/javascript";
        script.innerHTML = "window.purechatApi = { l: [], t: [], on: function () { this.l.push(arguments); } }; (function () { var done = false; var script = document.createElement('script'); script.async = true; script.type = 'text/javascript'; script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript'; document.getElementsByTagName('HEAD').item(0).appendChild(script); script.onreadystatechange = script.onload = function (e) { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { var w = new PCWidget({ c: '53730c05-701b-42d9-a15c-28e57599f3fe', f: true }); done = true; } }; })();";
        script.async = false;
        document.body.appendChild(script);*/
    }

    createPet() {
        ReactGA.event({
            category: "user_create_pet_from_home",
            action: "User Create Pet from Home",
        });
        this.props.history.push('/createpet');
    }

    discoverPets() {
        ReactGA.event({
            category: "user_discovery_from_home",
            action: "User Navigate to Discover from Home",
        });
        this.props.history.push('/discover');
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <React.Fragment>

                <section>
                    <div className="container-home mt-100">
                        <div className="row text-center align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-5 col-lg-5">
                                {/*<h3 style={{ color: "#f78459", fontFamily: "myCambria" }}>"  a place to preserve the memories of your pets for eternity  "</h3>*/}
                                <img src="img/main/landing_header_words.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="row text-center align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-3 col-lg-3">
                                <h4>Your pets deserve more</h4>
                                <p>Your pet companions have been with you by your side through your ups and downs. Through this platform, we promise to deliver them to paradise and beyond.</p>
                            </div>
                            <div className="col-sm-12 col-md-5 col-lg-5 p-30 home--margin">
                                <img src="img/main/landing_page_SMALL.png" alt="" className="img-fluid" />
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-3 home--margin">
                                <button onClick={() => this.createPet()} className="btn button-reflection" style={{ width: "100%", paddingLeft: "2em", paddingRight: "2em", paddingTop: "0.7em", paddingBottom: "0.7em" }}>
                                    <p style={{ fontSize: "18px" }}>Light a candle for your Pet</p>
                                </button>
                                <p className="terms-style-normal">By clicking, your agree to our <a href="/termsofuse">Terms</a>.</p>
                                <p className="terms-style-normal">or</p>
                                <button onClick={() => this.discoverPets()} className="btn btn-danger button-no-reflection" style={{ width: "100%", paddingTop: "0.7em", paddingBottom: "0.7em" }}>
                                    <p style={{
                                        color: "#ffffff",
                                        fontFamily: "myCorbelBold",
                                        fontSize: "18px",
                                        marginBottom: "0"
                                    }}>Discover other Pet Companions</p>
                                </button>
                            </div>
                        </div>

                        <div className="row text-center align-items-center justify-content-center social-media-wrapper">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <a style={{ cursor: "pointer" }} href="https://www.facebook.com/The-Paradise-Beyond-109518893979170" target="_blank" ><img src="img/main/icon/facebook.png" alt="" className="img-fluid" style={{ width: "30px", height: "30px", marginRight: "15px" }} /></a>
                                <a style={{ cursor: "pointer" }} href="https://www.instagram.com/theparadisebeyond_/" target="_blank" ><img src="img/main/icon/instagram-sketched.png" alt="" className="img-fluid" style={{ width: "30px", height: "30px", marginRight: "15px" }} /></a>
                                <a style={{ cursor: "pointer" }} href="https://twitter.com/_paradisebeyond" target="_blank" ><img src="img/main/icon/twitter.png" alt="" className="img-fluid" style={{ width: "30px", height: "30px" }} /></a>
                            </div>
                        </div>

                    </div>

                </section>
            </React.Fragment>
        );
    }
}

export default withRouter(HomePageComponent);
