import React, { Component, useCallback } from "react";
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { toBase64, dataURLtoFile } from '../../utils/fileFormatConvertor';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { dismissLoading, setLoading } from "../../actions/loadingActions";
import {
    isMobile
} from "react-device-detect";

class PhotoCropperModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crop: { x: 0, y: 0 },
            rotation: 0,
            zoom: 1,
            croppedAreaPixels: null,
            croppedImage: null,
            croppingImage: props.cImg,
            cropCallback: props.callbackFunc,
            parentObject: props.parent
        };

        //props.cImg
        //"https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
        this.closeDisplay = this.closeDisplay.bind(this);
        this.onCropCompleted = this.onCropCompleted.bind(this);
        this.setCrop = this.setCrop.bind(this);
        this.setZoom = this.setZoom.bind(this);
        this.sliderChanged = this.sliderChanged.bind(this);
    }

    sliderChanged(value) {
        this.setState({ zoom: value });
    }

    componentDidMount() {
        this.loadImageBytes();
    }

    async loadImageBytes() {
        let image = await toBase64(this.state.croppingImage);
        this.setState({ croppingImage: image });
    }

    onCropCompleted(croppedArea, _croppedAreaPixels) {
        this.setState({ croppedAreaPixels: _croppedAreaPixels });
    }

    setCrop(value) {
        this.setState({ crop: value });
    }

    setRotation(value) {

    }

    setZoom(value) {
        this.setState({ zoom: value });
    }



    async showCroppedImage() {
        setLoading("Cropping Image, Please Wait...");
        try {
            const _croppedImage = await getCroppedImg(
                this.state.croppingImage,
                this.state.croppedAreaPixels,
                0
            )
            let fileImage = dataURLtoFile(_croppedImage, "croppedImage.png");
            dismissLoading();
            this.state.cropCallback(fileImage, this.state.parentObject);
        } catch (e) {
            console.error(e);
        }
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


                <div className="crop-container">
                    <div className="row text-center justify-content-center">
                        <h5>Crop Image</h5>
                    </div>
                    <div className="crop-inner-container mb-10">
                        <Cropper
                            image={this.state.croppingImage}
                            crop={this.state.crop}
                            rotation={0}
                            zoom={this.state.zoom}
                            aspect={1 / 1}
                            onCropChange={this.setCrop}
                            onRotationChange={this.setRotation}
                            onCropComplete={this.onCropCompleted}
                            onZoomChange={this.setZoom}
                        />
                    </div>

                    <div className="row text-center justify-content-center" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                        <div style={{ width: "100%", height: "50" }}>
                            <h5>Zoom ({isMobile ? "Pinch to zoom in and out" : "User your mouse wheel to zoom in or out"})</h5>
                            <Slider className="mb-10" min={1} max={10} onChange={this.sliderChanged} value={this.state.zoom} />
                        </div>
                        <button className="btn btn-success" style={{ marginRight: "20px" }} onClick={() => this.showCroppedImage()}>Save</button>
                        <button className="btn btn-success" style={{ marginLeft: "20px" }} onClick={() => this.showCroppedImage()}>Cancel</button>
                    </div>
                </div>


            </React.Fragment >
        );
    }
}

export default PhotoCropperModal;