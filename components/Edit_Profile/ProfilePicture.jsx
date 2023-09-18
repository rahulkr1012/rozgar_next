import React, { Component } from "react";
import swal from "sweetalert";
import {
  deleteProfilePic,
  getProfilePic,
  uploadProfilePic,
} from "@/action/CandidateAction";
import constant from "constant";
import Pic from "@/assets/images/profilePic/secondary.jpg";
import { getCookie } from "cookies-next";
import Image from "next/image";

export default class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
        detail: getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd))
        : null,
      file: {},
      fileChange: undefined,
      getFile: undefined,
    };
  }

  componentDidMount() {
   this.state.detail && this.onGetFileChange();
  }

  onFileChange = (event) => {
    // const files = event.target.files;
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0])
    // reader.onload=(e)=>{
    //     const {CANDIDATE_ID} = this.state.detail;
    //     const formData = new FormData();
    //     formData.append('CANDIDATE_ID',CANDIDATE_ID);
    //     formData.append('file',e.target.result );
    const files = event.target.files[0];
    // const { CANDIDATE_ID } = this.state.detail;
    const formData = new FormData();
    formData.append("PROFILE_IMAGE", files);
    let model = {
      file: files,
    };
    let status = this.validateForm(model);
    if (status) {
      uploadProfilePic(formData).then((res) => {
        this.setState({ fileChange: res.result });
        this.props.closeModal();
        if (res.status) {
          swal({
            icon: "success",
            text: res.messageCode,
            timer: 1000,
            showCancelButton: false,
            showConfirmButton: false,
          });
          this.onGetFileChange();
          window.location.reload();
        } else {
          swal({
            icon: "error",
            text: "Something went wrong!!",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        }
      });
    }
  };

  //Image Cropper
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  //Image Cropper

  onGetFileChange = () => {
    // const { CANDIDATE_ID } = this.state.detail;
    getProfilePic({ CANDIDATE_ID: ''}).then((res) => {
      this.setState({ getFile: res.result });
    });
  };

  deleteProfilePic = () => {
    deleteProfilePic().then((res) => {
      this.props.closeModal();
      swal({
        icon: "success",
        text: "Profile picture deleted successfully",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      this.onGetFileChange();
      window.location.reload();
    });
  };

  validateForm = (model) => {
    let data = model;
    let error = {};
    let isValid = true;
    if (data["file"].size > 1e6) {
      swal({
        icon: "error",
        text: "Please upload a file smaller than 1 MB",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      isValid = false;
    }
    if (
      !data["file"].name.match(/\.(png|jpg|jpeg|jfif|pjpeg|pjp|svg|tiff|)$/)
    ) {
      swal({
        icon: "error",
        text: "Please select PNG/JPG/JPEG?JFIF/PJPEG/PJP/SVG/TIFF file",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      isValid = false;
    }
    if (data["file"] && data["file"].name) {
    } else {
      swal({
        icon: "error",
        text: "Please select file",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      isValid = false;
    }

    this.setState({
      error: error,
    });

    return isValid;
  };

  closeModalWindow = () => {
    this.props.closeModal();
  };

  render() {
    const { getFile } = this.state;
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ''
    return (
      <React.Fragment>
        <p
          style={{
            float: "right",
            fontSize: "1.4em",
            cursor: "pointer",
            fontWeight: "bold",
            textAlign: "right",
            paddingRight: "15px",
            paddingTop: "9px"
          }}
          onClick={this.closeModalWindow}
        >
          X
        </p>
        <div
          className=""
          style={{
            margin: "2em",
            color: "#666",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "2em", color: "#666" }}>
              Upload Profile Picture
            </p>
            <p style={{ fontWeight: "bold" }}>
              Profile with photo has higher chances of getting noticed by
              recruiters
            </p>
            <div>
              {getFile != undefined && getFile.PROFILE_IMAGE ? (
                                                                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${CANDIDATE_ID}/${getFile.PROFILE_IMAGE}`} width={100} height={70} /> 

              
              ) : (
                <Image src={Pic} width={100} height={70}/>
              )}
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <input type="file" name="file" hidden placeholder='Upload Profile Picture..' accept="image/png, image/jpeg" onChange={this.onFileChange} style={{border:'1px solid grey',width:'30%',height:'2em'}}/> */}
              {/* <button className='btn btn-primary' onChange={this.onFileChange}>Submit</button> */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  By uploading your photograph, you certify that rozgar.com has
                  the right to{" "}
                </div>
                <div>
                  display this photograph to the recruiters and that the
                  uploaded file does not violate our{" "}
                  <a
                    target="_blank"
                    href={constant.component.termsConditions.url}
                    style={{ color: "blue" }}
                  >
                    Terms of Services.
                  </a>
                </div>
              </div>
            </div>
            <div style={{ width: "auto" }}>
              <input
                type="file"
                name="file"
                id="upload"
                accept="image/png, image/jpeg"
                hidden
                onChange={this.onFileChange}
              />
              <label
                className="btncv"
                htmlFor="upload"
                style={{
                  margin: "0em 2em",
                  display: "inline-block",
                  backgroundColor: "#448ab1",
                  color: "white",
                  padding: "0.7rem 1.8rem ",
                  fontFamily: "sans-serif",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Upload file
              </label>
              {getFile != undefined && getFile.PROFILE_IMAGE ? (
                <button
                  className="btncv"
                  style={{
                    margin: "0em 2em",
                    display: "smokeWhite",
                    backgroundColor: "white",
                    border: "1px solid red",
                    color: "red",
                    padding: "0.7rem 1.8rem",
                    fontFamily: "sans-serif",
                    cursor: "pointer",
                    marginTop: "1rem",
                  }}
                  onClick={this.deleteProfilePic}
                >
                  Delete File
                </button>
              ) : (
                ""
              )}
            </div>
            <p style={{ color: "#e62e2d", marginTop: "10px" }}>
              Supported file format: png, jpg, jpeg, tiff, pjpeg, pjp, svg, jfif{" "}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
