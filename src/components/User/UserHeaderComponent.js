import React, { Component } from "react";
import ownerStore from "../../stores/ownerStore";
import noteStore from "../../stores/notificationStore";
import { loadOwnerNotifications } from "../../actions/notificationActions";
import { withRouter } from 'react-router-dom';;

class UserHeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: ownerStore.getOwnerObject(),
            notificationCount: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onNotChange = this.onNotChange.bind(this);
        this.loadNotificationsLocal = this.loadNotificationsLocal.bind(this);
    }

    componentDidMount() {
        ownerStore.addChangeListener(this.onChange);
        noteStore.addChangeListener(this.onNotChange);
        if (ownerStore.getOwnerObject().jwt != null && this.props.location.pathname != "/owner/notifications") {

            this.loadNotificationsLocal();
        }
    }

    loadNotificationsLocal() {
        loadOwnerNotifications(0, 1);
        setTimeout(this.loadNotificationsLocal,
            5000); //every 5 seconds checks
    }

    componentWillUnmount() {
        ownerStore.removeChangeListener(this.onChange);
        noteStore.removeChangeListener(this.onNotChange);
    }

    onChange() {
        this.setState({ owner: ownerStore.getOwnerObject() });
        //load notifications
    }

    onNotChange() {
        this.setState({ notificationCount: noteStore.getNewNotificationCount() });
    }

    render() {
        return (
            <React.Fragment >
                <li className="nav-item dropdown">
                    <a
                        className="nav-link page-scroll dropdown-toggle"
                        href="/#"
                        id="navbarDropdownHome"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Welcome, {this.state.owner.fullName} ({this.state.notificationCount})
                    </a>
                    <div
                        className="dropdown-menu submenu"
                        aria-labelledby="navbarDropdownHome"
                    >
                        <a className="dropdown-item" href="/owner/profile/view">
                            Profile
                      </a>
                        <a className="dropdown-item" href="/owner/pets">
                            Pets
                      </a>
                        <a className="dropdown-item" href="/owner/notifications">
                            Notifications ({this.state.notificationCount})
                      </a>
                        <a className="dropdown-item" href="/owner/logout">
                            Logout
                      </a>
                    </div>
                </li>

            </React.Fragment >
        );
    }
}

export default withRouter(UserHeaderComponent);
