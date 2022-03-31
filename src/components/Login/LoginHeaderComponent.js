import React, {
    Component
} from "react";
import {
    submitContact,
    loginManually
} from "../../actions/index";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }

};

class LoginHeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment >
                <li className="nav-item" >
                    <a style={{ color: "black", cursor: "pointer" }} href="/login"
                    >
                        Sign In
            </a>

                </li>

            </React.Fragment >
        );
    }
}

export default LoginHeaderComponent;