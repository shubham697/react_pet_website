import React from "react";
import petStore from "../../../stores/petStore";
import { setPetDisplay, loadPetComments } from "../../../actions/petActions";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CommentsPopupComponent from './CommentsPopupComponent';
import {
    BrowserView,
    MobileView
} from "react-device-detect";

class PetDetails extends React.Component {
    constructor(props) {
        super(props);
        petStore.resetPetComments();
        this.state = {
            petId: props.petId,
            petName: props.petName,
            comments: [],
            showComments: false
        };

        this.onChange = this.onChange.bind(this);
        this.showComments = this.showComments.bind(this);
    }

    componentDidMount() {
        /**
         * Your ajax will goes here to get data then call setState
         */
        petStore.addChangeListener(this.onChange);
        loadPetComments(0, 2, this.state.petId);

    }

    componentWillUnmount() {
        petStore.removeChangeListener(this.onChange);
    }

    showComments() {
        setPetDisplay(true);
    }

    onChange() {
        //get first two comments
        let commentsPetStore = petStore.getPetComments();
        let commentsPetStoreTrimed = [];
        if (commentsPetStore.length > 2) {
            let interval = 0;
            for (let comment of commentsPetStore) {
                if (interval == 2) break;
                commentsPetStoreTrimed.push(comment);
                interval = interval + 1;
            }
        } else {
            commentsPetStoreTrimed = commentsPetStore;
        }
        this.setState({
            comments: commentsPetStore,
            showComments: petStore.getPetCommentsDisplay()
        })
    }



    render() {
        return (
            <React.Fragment>
                <BrowserView>
                    <div className="container" style={{
                        maxWidth: "40%",
                        top: "80%",
                        left: "10%",
                        position: "absolute"
                    }}>
                        <div className="row" style={{ fontFamily: "myCorbel" }}>
                            {this.state.comments.length == 0 &&
                                <h5>No Public Comments</h5>
                            }
                            {this.state.comments.length > 0 &&
                                <h5>Public Comments</h5>
                            }
                        </div>
                        {this.state.comments.length == 0 &&
                            <h6 className="mb-10">Be the first to leave a comment!</h6>
                        }
                        {(this.state.comments || []).map((comment, index) => {
                            return (
                                <div className="row mb-10" style={{ fontFamily: "myCorbel" }} key={comment._id}>
                                    "{comment.message}" - {comment.postedBy.ownerName}
                                </div>
                            );
                        })}
                        <div className="row">
                            <button className="btn btn-info" onClick={() => this.showComments()}>{this.state.comments.length == 0 ? "Add Comment" : "See All"}</button>
                        </div>
                    </div>
                </BrowserView>
                <MobileView>
                    <button onClick={() => this.showComments()}>
                        <div className="floating-comments-button"></div>
                        <div className="floating-comments-button-text"></div>
                    </button>
                </MobileView>
                {this.state.showComments &&
                    <CommentsPopupComponent petId={this.state.petId} petName={this.state.petName} />}
            </React.Fragment >
        );
    }
}

export default PetDetails;
