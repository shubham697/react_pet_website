import React, { Component } from "react";
import ownerStore from "../../stores/ownerStore";
import noteStore from "../../stores/notificationStore";
import { loadOwnerNotifications, setAllNotificationsRead } from "../../actions/notificationActions";

import { dismissLoading, setLoading } from "../../actions/loadingActions";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';

class OwnerNotificationsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBtn: false,
            owner: ownerStore.getOwnerObject(),
            fullName: "",
            email: "",
            oldPassword: "",
            changePassword: "",
            changePassword2: "",
            notificationList: [],
            page: 1,
            totalNote: 0,
            notePerPage: 5
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.dismissLoadingOverlay = this.dismissLoadingOverlay.bind(this);
        this.loadNotificationsWrapper = this.loadNotificationsWrapper.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "user_visited_notifications_page",
            action: "User Visited Notification Page",
        });
        ownerStore.addChangeListener(this.onChange);
        noteStore.addChangeListener(this.onChangeNote);
        this.loadNotificationsWrapper(this.state.page);
    }

    componentWillUnmount() {
        ownerStore.removeChangeListener(this.onChange);
        noteStore.removeChangeListener(this.onChangeNote);
    }

    onChange() {
        this.setState({
            owner: this.state.owner.getOwnerObject()
        })
    }

    onChangeNote() {
        this.setState({
            notificationList: noteStore.getNotificationList(),
            totalNote: noteStore.getTotalNotificationCount()
        })
        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);
    }

    loadNotificationsWrapper(page) {
        setLoading("Loading Notifications, please wait...");
        loadOwnerNotifications((page - 1) * this.state.notePerPage, this.state.notePerPage);
        setAllNotificationsRead();
    }

    prevPage() {
        ReactGA.event({
            category: "notifications_prev_page",
            action: "User clicked previous page on comments",
        });
        //check if final page is hit
        let prevPage = this.state.page - 1;
        let maxPage = prevPage == Math.ceil(this.state.totalNote / this.state.notePerPage);
        this.setState({ page: prevPage, prevBtnDisable: prevPage == 1, nextBtnDisable: maxPage });
        this.loadNotificationsWrapper(prevPage);
    }

    nextPage() {
        ReactGA.event({
            category: "notifications_next_page",
            action: "User clicked next page on comments",
        });
        //check if final page is hit

        let nextPage = this.state.page + 1;
        let maxPage = nextPage == Math.ceil(this.state.totalNote / this.state.notePerPage);
        this.setState({ page: nextPage, nextBtnDisable: maxPage, prevBtnDisable: nextPage == 1 });
        this.loadNotificationsWrapper(nextPage);
    }

    dismissLoadingOverlay() {
        dismissLoading();
    }

    render() {
        return (
            <React.Fragment >

                {
                    <div className="container mt-100 animated fadeIn ">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 text-center">
                                <h4>Viewing Notifications</h4>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto text-center my-auto" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                <table class="table">
                                    <thead>
                                        <tr>

                                            <th scope="col">#</th>
                                            <th scope="col">Created</th>
                                            <th scope="col">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(this.state.notificationList || []).map((note, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{note.createdAtParsed}</td>
                                                    <td>{note.message}</td>
                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </table>

                            </div>
                            <div className="col-sm-12 col-12" >
                                <h6>Viewing Page {this.state.page} of {Math.ceil(this.state.totalNote / this.state.notePerPage)}</h6>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-6">
                                    <button className="btn btn-info" onClick={() => this.prevPage()} disabled={this.state.prevBtnDisable}>Prev Page</button>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-info" onClick={() => this.nextPage()} disabled={this.state.nextBtnDisable}>Next Page</button>
                                </div>
                            </div>

                        </div>



                    </div>

                }
            </React.Fragment>
        );
    }
}

export default withRouter(OwnerNotificationsComponent);
