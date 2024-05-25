import React from "react";
import Webcam from "react-webcam";
import { Button } from "react-bootstrap";
import "./webCam.scss";
import Cropper from "../common/cropper/Cropper.jsx";
import { Link } from "react-router-dom";
class WebCam extends React.Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  };
  state = {
    imageSrc: "",
    hasMedia: false,
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc });
  };
  clear = () => {
    this.setState({ imageSrc: "" });
  };
  handleMedia = () => {
    const currentStatus = this.webcam.stream.active;
    this.setState({ hasMedia: currentStatus });
  };
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };
    return (
      <div>
        <div className="row">
          <div className="col-lg-8">
            <Link to="/">
              <Button className="btn btn-primary back-button border-radius">
                Back
              </Button>
            </Link>
            <Webcam
              audio={true}
              height={480}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={640}
              videoConstraints={videoConstraints}
              draggable={true}
              screenshotQuality={1}
              screenshotWidth={550}
              mirrored={false}
              className="video-container"
              onUserMedia={this.handleMedia}
            />
            <div className="capture-button">
              {this.state.hasMedia && (
                <Button
                  onClick={this.capture}
                  className="btn btn-success border-radius"
                >
                  Capture photo
                </Button>
              )}

              {this.state.imageSrc && (
                <Button
                  onClick={this.clear}
                  className="btn btn-danger ml-3  border-radius"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            {this.state.imageSrc && (
              <>
                <Cropper image={this.state.imageSrc} />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default WebCam;
