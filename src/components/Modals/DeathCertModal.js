import React, { Component, useCallback } from "react";
import {
    isMobile,
    isBrowser
} from "react-device-detect";
import { FacebookShareButton } from 'react-share';

class BurialModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: (props.owner == null ? true : false),
            burialCert: props.burialCert,
            callbackFunc: props.callbackFunc,
            url: process.env.REACT_APP_FRONTEND_API + "viewpet/" + props.petID
        };
        this.closeDisplay = this.closeDisplay.bind(this);
    }

    closeDisplay() {
        if (this.state.callbackFunc) {
            this.state.callbackFunc();
        }
    }


    render() {
        return (
            <React.Fragment >
                <div className="burial-popup-background">
                </div>
                {isBrowser &&
                <div className="burial-popup animated fadeIn">
                    <div className="row">
                        <h4 style={{ fontFamily: "myCorbel", color: "#f78459" }}>Burial Certificate</h4>
                    </div>
                    {this.state.owner &&
                        <div className="row">
                            <p style={{ fontFamily: "myCorbel" }}>Congratulations, you have successfully created a pet.</p>
                        </div>
                    }
                    <div className="row">
                        <img style={{ width: "100%", left: "0", right: "0", margin: "auto" }} src={this.state.burialCert} />
                    </div>
                    <div className="row align-items-center justify-content-center">
                            <div className="col-md-1">
                                <FacebookShareButton
                                    url={this.state.burialCert}
                                    quote={this.state.owner ? ("My pet is currently on The Paradise Beyond, please click here to view my pet. (" + this.state.url + ")") : ("A pet is currently on The Paradise Beyond, please click here to view the pet. (" + this.state.url + ")")}
                                    hashtag="#theparadisebeyond"
                                >
                                    <button className="btn btn-success">Share</button>
                                </FacebookShareButton>
                            </div>
                            <div className="col-md-1" style={{ marginLeft: "5%" }}>
                                <button className="btn btn-success" onClick={() => this.closeDisplay()}>Close</button>
                            </div>

                    </div>
                </div>
                }
                {isMobile &&
                <div className="burial-popup animated fadeIn">
                    <div className="">
                        <img style={{ width: "100%", left: "0", right: "0", margin: "auto" }} src={this.state.burialCert} />
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div style={{ width : 100 }}>
                            <FacebookShareButton
                                url={this.state.burialCert}
                                quote={this.state.owner ? ("My pet is currently on The Paradise Beyond, please click here to view my pet. (" + this.state.url + ")") : ("A pet is currently on The Paradise Beyond, please click here to view the pet. (" + this.state.url + ")")}
                                hashtag="#theparadisebeyond"
                            >
                                <button className="btn btn-success">Share</button>
                            </FacebookShareButton>
                        </div>
                        <div style={{ marginLeft: "5%", width : 100 }}>
                            <button className="btn btn-success" onClick={() => this.closeDisplay()}>Close</button>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment >
        );
    }
}

export default BurialModal;