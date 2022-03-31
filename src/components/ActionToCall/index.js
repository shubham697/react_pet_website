import React from 'react'

const About = () => {
    return (
        <div>
            {/* start header section */}
            <section className="call-to-action ptb-100 background-img"
             style={{background: "url('img/animals-background.jpg')", backgroundRepeat:"no-repeat", backgroundPosition: "center", backgroundSize: "center / cover", backgroundAttachment: "fixed"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11 mb-3">
                            <div className="call-to-action-content text-center text-white">
                                <h2 className="text-white">Discover Pet Heaven. Receive Closure.</h2>
                                <p>Send your pet off to a better place in the digital landscape. Take heart that your companion is happilly ever after.</p>
                            </div>
                        </div>
                        <div className="col-11">
                            <div className="call-to-action-btn text-center">
                                <a href="/#" target="_blank" className="btn solid-btn"> Join Pet Heaven <span>Free</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end header section */}
        </div>
    )
}


export default About;