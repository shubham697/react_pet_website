import React, {Component} from 'react'

import Header from '../components/Header/header';
import HeroSection from '../components/HeroSection/heroSectionAboutUs';
import ContactUsSection from '../components/Contact/ContactUs';
import MapSection from '../components/Map';
import Footer from '../components/footer/footer';


class ContactUs extends Component{
    render(){
        return(
            <div>
                <Header />
                <div className="main">
                    <HeroSection title="Contact Us" />
                    <ContactUsSection />
                </div>
                <Footer />
            </div>
        )
    }
}

export default ContactUs;