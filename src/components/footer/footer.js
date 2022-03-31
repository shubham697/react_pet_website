import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer-section">
                    <div className="footer-top pt-5 pb-5">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-lg-4 mb-4 mb-lg-0">
                                    <div className="footer-nav-wrap">
                                        <img src="https://res.cloudinary.com/jjsinc/image/upload/v1584729588/constants-project-pets/company_logo_tpb_u3fxg1.png" alt="footer logo" width="200" className="img-fluid mb-3" />
                                        <p>A place of eternal rest for your pet companions. A community delivering closure. A place for real pets and real stories.</p>

                                        <ul className="list-inline">
                                            <li className="list-inline-item"><span className="ti-arrow-circle-right mr-2"></span> <a href="/#">Privacy
                                                policy</a></li>
                                            <li className="list-inline-item"><span className="ti-arrow-circle-right mr-2"></span> <a href="/#">Terms
                                                and Conditions</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 ml-auto mb-4 mb-lg-0">
                                    <div className="footer-nav-wrap">
                                        <h5 className="mb-3">Our location</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><span className="ti-arrow-circle-right mr-2"></span><strong>Address: </strong>
                                                Singapore
                                                <br />The Paradise Beyond
                                            </li>
                                            <li className="mb-2"><span className="ti-arrow-circle-right mr-2"></span><strong>Email:</strong><a
                                                href="mailto:admin@theparadisebyeond.com"> admin@theparadisebyeond.com</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="footer-nav-wrap">
                                        <h5 className="mb-3">Quick links</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><i className="ti-arrow-circle-right mr-2"></i> <a href="/login">Login</a></li>
                                            <li className="mb-2"><i className="ti-arrow-circle-right mr-2"></i> <a href="/discover">Discovery</a></li>
                                            <li className="mb-2"><i className="ti-arrow-circle-right mr-2"></i> <a href="/privacypolicy">Privacy Policy</a></li>
                                            <li className="mb-2"><i className="ti-arrow-circle-right mr-2"></i> <a href="/termsofuse">Terms of Use</a></li>
                                            {/*<li className="mb-2"><i className="ti-arrow-circle-right mr-2"></i> <a href="/contact">Contact Us</a></li>*/}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom gray-light-bg pt-4 pb-4">
                        <div className="container">
                            <div className="row text-center text-md-left align-items-center">
                                <div className="col-md-6 col-lg-5"><p className="text-md-left copyright-text pb-0 mb-0">Copyrights © 2020. All
                                    rights reserved by
                                    <a href="/#"> Pixelon Tech</a></p></div>
                                <div className="col-md-6 col-lg-7">
                                    <ul className="social-list list-inline list-unstyled text-md-right">
                                        <li className="list-inline-item"><a href="/#" target="_blank" title="Facebook"><span
                                            className="ti-facebook"></span></a></li>
                                        <li className="list-inline-item"><a href="/#" target="_blank" title="Twitter"><span
                                            className="ti-twitter"></span></a></li>
                                        <li className="list-inline-item"><a href="/#" target="_blank"
                                            title="Instagram"><span className="ti-instagram"></span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >
        )
    }
}

export default Footer;