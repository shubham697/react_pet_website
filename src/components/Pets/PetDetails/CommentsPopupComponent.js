import React from "react";
import ownerStore from "../../../stores/ownerStore";
import petStore from "../../../stores/petStore";
import { postPetComment, setPetDisplay, loadPetComments, postPetCommentGuest } from "../../../actions/petActions";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { setLoading, dismissLoading } from "../../../actions/loadingActions";
import { showMessageFull } from "../../../actions/messageActions";
import ImageUploader from 'react-images-upload';
import ReactGA from 'react-ga';
import {
    BrowserView,
    MobileView,
    isMobile,
    isBrowser
} from "react-device-detect";

class CommentsPopup extends React.Component {
    constructor(props) {
        super(props);
        petStore.resetPetComments();
        this.state = {
            petId: props.petId,
            petName: props.petName,
            comments: [],
            page: 1,
            currentComment: "",
            name: "",
            email: "",
            disableBtn: false,
            btnText: "Submit",
            totalCommentCount: 0,
            prevBtnDisable: true,
            nextBtnDisable: false,
            owner: ownerStore.getOwnerObject(),
            mediaImage: [],
            guestArea: (ownerStore.getOwnerObject().jwt == null ? "comments-area-guest" : "comments-area")
        };
        this.onChange = this.onChange.bind(this);
        this.showComments = this.showComments.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleFormValueChange = this.handleFormValueChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetButton = this.resetButton.bind(this);
        this.onDropImage = this.onDropImage.bind(this);
        this.cleanComments = this.cleanComments.bind(this);
    }

    componentDidMount() {
        ReactGA.event({
            category: "visit_comment_popup",
            action: "User visited comment popup",
        });
        /**
         * Your ajax will goes here to get data then call setState
         */
        petStore.addChangeListener(this.onChange);
        loadPetComments(0, 5 * this.state.page, this.state.petId);
        setLoading("Loading new comments");
    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    onDropImage(picture) {
        this.setState({
            mediaImage: picture
        });
    }

    showComments() {
        this.setState({ showComments: true });
    }

    prevPage() {
        ReactGA.event({
            category: "comment_prev_page",
            action: "User clicked previous page on comments",
        });
        //check if final page is hit
        let prevPage = this.state.page - 1;
        let maxPage = prevPage == Math.ceil(this.state.totalCommentCount / 5);
        this.setState({ page: this.state.page - 1, prevBtnDisable: prevPage == 1, nextBtnDisable: maxPage });
        loadPetComments(5 * (prevPage - 1), 5, this.state.petId);
        setLoading("Loading new comments");
    }

    nextPage() {
        ReactGA.event({
            category: "comment_next_page",
            action: "User clicked next page on comments",
        });
        //check if final page is hit

        let nextPage = this.state.page + 1;
        let maxPage = nextPage == Math.ceil(this.state.totalCommentCount / 5);
        this.setState({ page: this.state.page + 1, nextBtnDisable: maxPage, prevBtnDisable: nextPage == 1 });
        loadPetComments(5 * (nextPage - 1), 5, this.state.petId);
        setLoading("Loading new comments");
    }

    closeDisplay() {
        setPetDisplay(false);
    }

    onChange() {

        this.setState({
            comments: petStore.getPetComments(),
            totalCommentCount: petStore.getPetCommentCount()
        })

        if (petStore.getPetCommentCount() <= 5) {
            this.setState({ nextBtnDisable: true });
        } else {
            this.setState({ nextBtnDisable: false });
        }

        setTimeout(function () {
            this.dismissLoadingOverlay();
        }.bind(this), 500);
    }

    dismissLoadingOverlay() {
        dismissLoading();
    }

    cleanComments() {
        this.setState({
            name: "",
            email: "",
            currentComment: "",
            mediaImage: []
        })
    }

    resetButton() {
        this.setState({
            disableBtn: false,
            btnText: "Submit"
        });
    }

    submitForm(event) {
        event.preventDefault();



        setLoading("Posting comments... Please wait...");

        // disable the button
        this.setState({
            disableBtn: true,
            btnText: "Submitting"
        });

        let commentObject = {
            petID: this.state.petId,
            media: this.state.mediaImage,
            parentID: 0,
            message: this.state.currentComment
        }

        if (ownerStore.getOwnerObject().jwt == null) {
            let commentObjectGuest = {
                petID: this.state.petId,
                media: this.state.mediaImage,
                parentID: 0,
                message: this.state.currentComment,
                fullName: this.state.name,
                email: this.state.email
            }
            postPetCommentGuest(commentObjectGuest).then(response => {
                if (response.success) {
                    ReactGA.event({
                        category: "add_comment_guest",
                        action: "Guest added a comment",
                    });
                    //refresh data
                    loadPetComments(0, 5, this.state.petId);
                    this.setState({ page: 1 });
                    this.resetButton();
                } else {
                    showMessageFull("Failed to add Comment", "Failed to add comment, please check your internet connection", this.resetButton)
                }
                dismissLoading();
                this.cleanComments();
            });
        } else {

            postPetComment(commentObject).then(response => {
                if (response.success) {
                    ReactGA.event({
                        category: "add_comment_user",
                        action: "User added a comment",
                    });
                    //refresh data
                    loadPetComments(0, 5, this.state.petId);
                    this.setState({ page: 1 });
                    this.resetButton();
                } else {
                    showMessageFull("Failed to add Comment", "Failed to add comment, please check your internet connection", this.resetButton)
                }
                dismissLoading();
                this.cleanComments();
            });
        }



    }

    handleFormValueChange(inputName, event) {
        let stateValue = {};
        stateValue[inputName] = event.target.value;
        this.setState(stateValue);
    }
    render() {
        return (
            <React.Fragment>
                <BrowserView>
                    <div className="comments-popup-background">
                    </div>
                    <div className="comments-popup animated fadeIn">
                        <div className="comments-exit">
                            <button className="btn" onClick={() => this.closeDisplay()}>Close</button>
                        </div>
                        <div className="comments-header">
                            <h4 style={{ fontFamily: "myCorbel", color: "#f78459" }}>Public Comments</h4>
                        </div>
                        {this.state.comments.length == 0 &&
                            <h5>There are currently no comments for this pet companion, be the first to comment!</h5>
                        }
                        {this.state.comments.length > 0 &&
                            <div>
                                <div className={`row ${this.state.guestArea}`}>
                                    {(this.state.comments || []).map((comment, index) => {
                                        return (
                                            <div className="col-md-12">
                                                <div key={comment._id}>
                                                    <div className="row">
                                                        <h5>
                                                            <b style={{ fontWeight: "500", fontSize: "16px", fontFamily: "myCorbelBold" }}>[{comment.postedAtParsed}]</b>
                                                        </h5>
                                                    </div>

                                                    {comment.media.url != null &&
                                                        <div className="row" >
                                                            <img src={comment.media.url} style={{ height: "8em" }} />
                                                        </div>
                                                    }
                                                    <div className="row" style={{ marginTop: (comment.media.url == null ? "-15px" : "0px") }}>
                                                        <p>
                                                            "{comment.message}" - {comment.postedBy.ownerName} {comment.postedBy.ownerID == null ? " (Guest)" : ""}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-sm-4" style={{ width: "33%", padding: "0px", paddingLeft: "20px" }}>
                                        <button className="btn btn-info" onClick={() => this.prevPage()} disabled={this.state.prevBtnDisable}>Prev</button>
                                    </div>
                                    <div className="col-sm-4" style={{ color: "black", width: "33%", padding: "0px", paddingLeft: "20px" }}>
                                        <p style={{ color: "black" }}>Page {this.state.page} of {Math.ceil(this.state.totalCommentCount / 5)}</p>
                                    </div>
                                    <div className="col-sm-4" style={{ width: "33%", padding: "0px", paddingLeft: "20px", marginBottom: "20px" }}>
                                        <button className="btn btn-info" onClick={() => this.nextPage()} disabled={this.state.nextBtnDisable}>Next</button>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <h5 style={{ marginLeft: "1.5%", color: "#989898" }}>Add a comment</h5>
                            <div className="col-md-12" >
                                <form
                                    id="contactForm1"
                                    className="contact-us-form"
                                    noValidate="novalidate"
                                    onSubmit={this.submitForm}>
                                    <div className="row align-items-center justify-content-center" >
                                        <div className="col-sm-8 col-md-8" style={{ width: "60%" }} >
                                            <div className="form-group" style={{ marginBottom: "0px" }} >
                                                <textarea value={this.state.currentComment}
                                                    onChange={e => this.handleFormValueChange("currentComment", e)}
                                                    type="textarea"
                                                    className="form-control"
                                                    name="currentComment"
                                                    placeholder="Write a Comment"
                                                    required="required" /
                                                >
                                            </div>
                                        </div >
                                        <div className="col-sm-4 col-md-4" style={{ width: "35%", padding: "0px", paddingRight: "5px" }}  >
                                            <ImageUploader
                                                buttonText='Upload Image'
                                                onChange={this.onDropImage}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                                withIcon={false}
                                                fileContainerStyle={{ boxShadow: "0 0 0 0", display: "inline-block", margin: "0", padding: "0" }}
                                                buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                                label={this.state.mediaImage == null ? "No Photo Selected" : this.state.mediaImage[0] == null ? "No Photo Selected" : "Selected: " + this.state.mediaImage[0].name}
                                            />
                                        </div >
                                    </div>

                                    {this.state.owner.jwt == null &&
                                        <div className="row">


                                            <div className="col-sm-6 col-6" style={{ width: "50%" }}  >
                                                <div className="form-group" >
                                                    <input value={this.state.name}
                                                        onChange={e => this.handleFormValueChange("name", e)}
                                                        type="textarea"
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Name"
                                                        required="required" /
                                                    >
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-6" style={{ width: "50%" }}>
                                                <div className="form-group" >
                                                    <input value={this.state.email}
                                                        onChange={e => this.handleFormValueChange("email", e)}
                                                        type="test"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Email"
                                                        required="required" /
                                                    >
                                                </div>
                                            </div>

                                        </div>
                                    }
                                    {isBrowser &&
                                        <div className="col-sm-12 col-12" style={{ paddingLeft: "0px" }}>
                                            <Button
                                                type="submit"
                                                className="btn primary-solid-btn mt-10"
                                                id="btnContactUs"
                                                disabled={this.state.disableBtn}
                                                variant="primary"
                                                style={{ backgroundColor: "#17a2b8", borderColor: "#17a2b8" }}
                                            >
                                                {
                                                    this.state.disableBtn && <Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                }
                                                {this.state.btnText}
                                            </Button>
                                        </div>
                                    }
                                    {isMobile &&
                                        <div className="row text-center align-items-center justify-content-center" >
                                            <div className="col-sm-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    id="btnContactUs"
                                                    disabled={this.state.disableBtn}
                                                    variant="primary"
                                                >
                                                    {this.state.btnText}
                                                </button>
                                            </div>
                                        </div>
                                    }


                                </form >
                                <p className="form-message" ></p>
                            </div >
                        </div>
                    </div>
                </BrowserView>
                <MobileView>
                    <div className="comments-popup-background">
                    </div>
                    <div className="comments-popup-mobile">
                        <div className="comments-exit">
                            <button className="btn" onClick={() => this.closeDisplay()}>Close</button>
                        </div>
                        <div className="comments-header">
                            <h4 style={{ fontFamily: "myCorbel", color: "#f78459" }}>Public Comments for</h4>
                            <h5 style={{ fontFamily: "myCorbel", color: "#f78459" }}><u>{this.state.petName}</u></h5>
                        </div>
                        {this.state.comments.length == 0 &&
                            <h5>There are currently no comments for this pet companion, be the first to comment!</h5>
                        }
                        {this.state.comments.length > 0 &&
                            <div>
                                <div className={`row ${this.state.guestArea}`}>
                                    {(this.state.comments || []).map((comment, index) => {
                                        return (
                                            <div className="col-md-12">
                                                <div key={comment._id}>
                                                    <div className="row">
                                                        <h5>
                                                            <b style={{ fontWeight: "500", fontSize: "14px" }}>[{comment.postedAtParsed}]</b>
                                                        </h5>
                                                    </div>

                                                    {comment.media.url != null &&
                                                        <div className="row" >
                                                            <img src={comment.media.url} style={{ height: "12em" }} />
                                                        </div>
                                                    }
                                                    <div className="row" style={{ marginTop: (comment.media.url == null ? "-15px" : "0px") }}>
                                                        <p>
                                                            "{comment.message}" - {comment.postedBy.ownerName} {comment.postedBy.ownerID == null ? " (Guest)" : ""}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-sm-4" style={{ width: "33%", padding: "0px", paddingLeft: "20px" }}>
                                        <button className="btn btn-info" onClick={() => this.prevPage()} disabled={this.state.prevBtnDisable}>Prev</button>
                                    </div>
                                    <div className="col-sm-4" style={{ color: "black", width: "33%", padding: "0px", paddingLeft: "20px" }}>
                                        Page {this.state.page} of {Math.ceil(this.state.totalCommentCount / 5)}
                                    </div>
                                    <div className="col-sm-4" style={{ width: "33%", padding: "0px", paddingLeft: "20px", marginBottom: "20px" }}>
                                        <button className="btn btn-info" onClick={() => this.nextPage()} disabled={this.state.nextBtnDisable}>Next</button>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <h5 className="comments-header">Add a comment</h5>
                            <div className="col-md-12" >
                                <form
                                    id="contactForm1"
                                    className="contact-us-form"
                                    noValidate="novalidate"
                                    onSubmit={this.submitForm}>
                                    <div className="row align-items-center justify-content-center" >
                                        <div className="col-sm-8 col-md-8" style={{ width: "60%" }} >
                                            <div className="form-group" style={{ marginBottom: "0px" }} >
                                                <textarea value={this.state.currentComment}
                                                    onChange={e => this.handleFormValueChange("currentComment", e)}
                                                    type="textarea"
                                                    className="form-control"
                                                    name="currentComment"
                                                    placeholder="Write a Comment"
                                                    required="required" /
                                                >
                                            </div>
                                        </div >
                                        <div className="col-sm-4 col-md-4" style={{ width: "35%", padding: "0px", paddingRight: "5px" }}  >
                                            <ImageUploader
                                                buttonText='Upload Image'
                                                onChange={this.onDropImage}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                                withIcon={false}
                                                withLabel={false}
                                                fileContainerStyle={{ fontSize: "8px", boxShadow: "0 0 0 0", display: "inline-block", margin: "0", padding: "0", color: "black" }}
                                                buttonStyles={{ background: "#989898", borderRadius: "10px", top: "0", bottom: "0", margin: "auto" }}
                                                label={this.state.mediaImage == null ? "No Photo Selected" : this.state.mediaImage[0] == null ? "No Photo Selected" : "Selected: " + this.state.mediaImage[0].name}
                                                buttonText={this.state.mediaImage == null ? "Select Photo" : this.state.mediaImage[0] == null ? "Select Photo" : "Change Photo"}
                                            />
                                        </div >
                                    </div>

                                    {this.state.owner.jwt == null &&
                                        <div className="row" style={{ marginLeft: "3%", marginRight: "3%" }}>


                                            <div style={{ width: "50%" }}  >
                                                <div className="form-group" >
                                                    <input value={this.state.name}
                                                        onChange={e => this.handleFormValueChange("name", e)}
                                                        type="textarea"
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Name"
                                                        required="required" /
                                                    >
                                                </div>
                                            </div>
                                            <div style={{ width: "50%" }}>
                                                <div className="form-group" >
                                                    <input value={this.state.email}
                                                        onChange={e => this.handleFormValueChange("email", e)}
                                                        type="test"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Email"
                                                        required="required" /
                                                    >
                                                </div>
                                            </div>

                                        </div>
                                    }
                                    {isBrowser &&
                                        <div className="col-sm-12 col-12" >
                                            <Button
                                                type="submit"
                                                className="btn primary-solid-btn"
                                                id="btnContactUs"
                                                disabled={this.state.disableBtn}
                                                variant="primary"
                                            >
                                                {
                                                    this.state.disableBtn && <Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                }
                                                {this.state.btnText}
                                            </Button>
                                        </div>
                                    }
                                    {isMobile &&
                                        <div className="row text-center align-items-center justify-content-center" >
                                            <div className="col-sm-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    id="btnContactUs"
                                                    disabled={this.state.disableBtn}
                                                    variant="primary"
                                                >
                                                    {this.state.btnText}
                                                </button>
                                            </div>
                                        </div>
                                    }


                                </form >
                                <p className="form-message" ></p>
                            </div >
                        </div>
                    </div>
                </MobileView>
            </React.Fragment >
        );
    }
}

export default CommentsPopup;
