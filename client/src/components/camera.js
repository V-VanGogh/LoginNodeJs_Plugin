import React, {Component} from "react";
import Webcam from "react-webcam";
import {connect} from 'react-redux';
import * as actions from '../actions/index'
import {compose} from "redux";

class camera extends Component {



    state = {
        imageData: null,
        image_name: localStorage.getItem('PatientSurname'),
        saveImage: false
    };


    setRef = (Webcam) => {
        this.Webcam = Webcam;
    };

    capture = () => {
        const imageSrc = this.Webcam.getScreenshot();
        this.setState({
            imageData: imageSrc
        })
    };

    onClickRetake = (e) => {
        e.persist();
        this.setState({
            imageData: null
        })
    };

    onClickSave = (e) => {
        e.persist();
        this.setState((previousState) => {
            return {
                saveImage: !previousState.saveImage
            }
        });
    };

    handleChange = (e) => {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSaveSubmit = async (e) => {
        e.preventDefault();
        let imageObject = {
            Surname: this.state.image_name,
            Image: this.state.imageData
        };
        console.log(imageObject);
        await this.props.saveJobImage(imageObject)
    };


    saveForm = () => {
        return (
            <div>
                <form onSubmit={this.handleSaveSubmit}>
                    <p>
                        <label> Image name: </label>
                        <input
                            type="text"
                            name="image_name"
                            value={this.state.image_name}
                            onChange={this.handleChange}
                        />
                        <input type="submit" value="Save"/>
                    </p>
                </form>
            </div>
        )
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user'
        };

        return(
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                    />
                    <div className="button-container">
                    <button onClick={this.capture}>Capture photo</button>
                    </div>
                {this.state.imageData ?
                    <div>
                        <p><img src={this.state.imageData} alt="" /></p>
                        <span><button onClick={this.onClickRetake}>Retake?</button> </span>
                        <span><button onClick={this.onClickSave}>Save</button> </span>
                        {this.state.saveImage ? this.saveForm() : null}
                    </div>: null}
            </div>
        )

    }

}


function mapStateToProps(state) {
    return {
        patients: state.patientForm
    }
}


export default compose(
    connect(mapStateToProps, actions)
)(camera)


