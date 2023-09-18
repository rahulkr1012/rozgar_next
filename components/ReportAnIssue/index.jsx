import React, { Component } from "react";
import { uploadIssueScreenShot } from "@/action/dashboard";
import { clearForm, onChange, onClear, validateForm } from "../../utils";
// import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import swal from "sweetalert";
import Image from 'next/image'
import SupportImage from "/src/assets/images/supportimg.jpg"

export default class reportIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SCREENSHOT_ERROR: false,
      RAISED_BY_NAME: {
        name: "RAISED_BY_NAME",
        value: "",
        error: "",
        isRequired: true,
      },
      RAISED_BY_EMAIL: {
        name: "RAISED_BY_EMAIL",
        value: "",
        error: "",
        isRequired: true,
      },
      RAISED_BY_CONTACT_NUMBER: {
        name: "RAISED_BY_CONTACT_NUMBER",
        value: "",
        error: "",
        isRequired: true,
      },
      ISSUE_TYPE: {
        name: "ISSUE_TYPE",
        value: "",
        error: "",
        isRequired: true,
      },
      SUBJECT: { name: "SUBJECT", value: "", error: "", isRequired: true },
      DESCRIPTION: {
        name: "DESCRIPTION",
        value: "",
        error: "",
        isRequired: true,
      },
      SCREENSHOT: {
        name: "SCREENSHOT",
        value: "",
        error: "",
        isRequired: false,
      },
      showError: false,
    };
  }
  onChange = (e) => {
    const { name, value } = e.target;
    onChange(this, name, value);
  };

  uploadScreenShot = (e) => {
    e.preventDefault();
    this.setState({ SCREENSHOT_ERROR: false });
    let model = new FormData();
    model.append("file", e.target.files[0]);

    let isValid = true;

    if (!e.target.files[0].name.match(/\.(pdf|png|jpg)$/)) {
      swal({
        icon: "error",
        text: "Please select PDF/PNG/JPG file",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      isValid = false;
      this.setState({ SCREENSHOT_ERROR: true });
    }
    if (isValid) {
      uploadIssueScreenShot(model)
        .then((res) => {
          if (res.status) {
            onChange(this, this.state.SCREENSHOT.name, res.result.fileName);
          } else {
            Swal.fire({
              icon: "error",
              text: res.error,
              timer: 1500,
              showCancelButton: false,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: err,
            timer: 1500,
            showCancelButton: false,
            showConfirmButton: false,
          });
        });
    }
  };

  onSubmit = (e) => {
    this.setState({ showError: true });
    e.preventDefault();
    if (validateForm(this) && !this.state.SCREENSHOT_ERROR) {
      const {
        RAISED_BY_NAME,
        RAISED_BY_EMAIL,
        RAISED_BY_CONTACT_NUMBER,
        ISSUE_TYPE,
        SUBJECT,
        DESCRIPTION,
        SCREENSHOT,
      } = this.state;
      const model = {
        RAISED_BY_NAME: RAISED_BY_NAME.value,
        RAISED_BY_EMAIL: RAISED_BY_EMAIL.value,
        RAISED_BY_CONTACT_NUMBER: RAISED_BY_CONTACT_NUMBER.value,
        ISSUE_TYPE: ISSUE_TYPE.value,
        SUBJECT: SUBJECT.value,
        DESCRIPTION: DESCRIPTION.value,
        SCREENSHOT: SCREENSHOT.value,
      };
      this.setState({ showError: false });
      this.props.onSubmit(model);
      onClear(this, RAISED_BY_NAME.name);
      onClear(this, RAISED_BY_EMAIL.name);
      onClear(this, RAISED_BY_CONTACT_NUMBER.name);
      onClear(this, ISSUE_TYPE.name);
      onClear(this, SUBJECT.name);
      onClear(this, DESCRIPTION.name);
      onClear(this, SCREENSHOT.name);
    }
  };

  render() {
    const {
      RAISED_BY_NAME,
      RAISED_BY_EMAIL,
      RAISED_BY_CONTACT_NUMBER,
      ISSUE_TYPE,
      SUBJECT,
      DESCRIPTION,
    } = this.state;
    return (
      <React.Fragment>
        <div id="rg-innerbannervtwo" class="rg-innerbannervtworep"></div>
        <main id="rg-main" className="rg-main rg-haslayout">
          <div className="rg-haslayout rg-sectionspace">
            <div className="container">
              <div className="row">
                <div className="rg-candidatesdetails">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="rg-jobapplycenter rg-jobapplycentervthree">
                      <div className="rg-companycontent">
                        <h3>Report A Problem</h3>
                        <p>
                          Our Help section will provide answers to Frequently
                          Asked Questions (FAQs). If you wish to know more about
                          our services or if you need our help in any matter,
                          please fill in the form below and we will revert to
                          the specified email address in 48 hours.
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-7 col-lg-7">
                          <form
                            onSubmit={this.onSubmit}
                            className="rg-formtheme repostproblembox"
                          >
                            <fieldset>
                              <div className="form-group rg-reportIssue">
                                <i className="lnr lnr-users"></i>
                                <input
                                  className="form-control"
                                  type="text"
                                  name={RAISED_BY_NAME.name}
                                  value={RAISED_BY_NAME.value}
                                  onChange={this.onChange}
                                  placeholder="Your Name"
                                />
                                {this.state.showError &&
                                RAISED_BY_NAME.error.length > 0 &&
                                !RAISED_BY_NAME.value ? (
                                  <span className="text-danger ">
                                    {" "}
                                    Enter your name{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="form-group rg-reportIssue">
                                <i className="lnr lnr-envelope"></i>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email Address"
                                  name={RAISED_BY_EMAIL.name}
                                  value={RAISED_BY_EMAIL.value}
                                  onChange={this.onChange}
                                />
                                {this.state.showError &&
                                RAISED_BY_EMAIL.error.length > 0 &&
                                !RAISED_BY_EMAIL.value ? (
                                  <span className="text-danger ">
                                    {" "}
                                    Enter your email{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="form-group rg-reportIssue">
                                <i className="lnr lnr-phone"></i>
                                <NumberFormat
                                  type="Phone"
                                  maxLength="12"
                                  className="form-control"
                                  placeholder="Mobile Number"
                                  name={RAISED_BY_CONTACT_NUMBER.name}
                                  value={RAISED_BY_CONTACT_NUMBER.value}
                                  onChange={this.onChange}
                                />
                                {this.state.showError &&
                                RAISED_BY_CONTACT_NUMBER.error.length > 0 &&
                                !RAISED_BY_CONTACT_NUMBER.value ? (
                                  <span className="text-danger ">
                                    {" "}
                                    Enter your number{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="form-group rg-reportIssue">
                                <i className="lnr lnr-location"></i>
                                <span className="rg-select">
                                  <select
                                    style={{ height: "44px" }}
                                    className="form-control"
                                    name={ISSUE_TYPE.name}
                                    value={ISSUE_TYPE.value}
                                    onChange={this.onChange}
                                  >
                                    <option value="">
                                      Select Any Available Option
                                    </option>
                                    <option value="How to update your resume">
                                      How to update your resume
                                    </option>
                                    <option value="Forgot username and password">
                                      Forgot username and password
                                    </option>
                                    <option value="Forgot username and password">
                                      Forgot username and password
                                    </option>
                                    <option value="How To Create and Edit Job messenger">
                                      How To Create and Edit Job messenger
                                    </option>
                                    <option value="How To Create Cover Letter">
                                      How To Create Cover Letter
                                    </option>
                                    <option value="How to create edit and delete search agents">
                                      How to create edit and delete search
                                      agents
                                    </option>
                                    <option value="How to change password">
                                      How to change password
                                    </option>
                                    <option value="How to register as a fresher">
                                      How to register as a fresher
                                    </option>
                                    <option value="How to mark your CV as not searchable">
                                      How to mark your CV as not searchable
                                    </option>
                                    <option value="How to search and apply">
                                      How to search and apply
                                    </option>
                                    <option value="Unable to Login">
                                      Unable to Login
                                    </option>
                                    <option value="How to create new profile">
                                      How to create new profile
                                    </option>
                                    <option value="Problem in Recruiters Preview">
                                      Problem in Recruiters Preview
                                    </option>
                                    <option value="Unable to attach resume">
                                      Unable to attach resume
                                    </option>
                                    <option value="Getting run time/java script error">
                                      Getting run time/java script error
                                    </option>
                                    <option value="Suggestions">
                                      Suggestions
                                    </option>
                                    <option value="How to delete my account">
                                      How to delete my account
                                    </option>
                                    <option value="Not getting job alerts">
                                      Not getting job alerts
                                    </option>
                                    <option value="Mobile/email verification">
                                      Mobile/email verification
                                    </option>
                                    <option value="Others">Others</option>
                                  </select>
                                </span>
                                {this.state.showError &&
                                ISSUE_TYPE.error.length > 0 &&
                                !ISSUE_TYPE.value ? (
                                  <span className="text-danger ">
                                    Select option{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="form-group rg-reportIssue">
                                <i className="ti-file"></i>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=" Subject"
                                  name={SUBJECT.name}
                                  value={SUBJECT.value}
                                  onChange={this.onChange}
                                />
                                {this.state.showError &&
                                SUBJECT.error.length > 0 &&
                                !SUBJECT.value ? (
                                  <span className="text-danger ">
                                    Enter Subject{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="form-group rg-reportIssue">
                                <i className="lnr lnr-bubble"></i>
                                <textarea
                                  className="form-control"
                                  placeholder="Description"
                                  style={{ height: "100px" }}
                                  name={DESCRIPTION.name}
                                  value={DESCRIPTION.value}
                                  onChange={this.onChange}
                                ></textarea>
                                {this.state.showError &&
                                DESCRIPTION.error.length > 0 &&
                                !DESCRIPTION.value ? (
                                  <span className="text-danger ">
                                    {" "}
                                    Enter your message{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="form-group">
                                <div className="rg-inputtypefile">
                                  <div className="rg-inputtyfile">
                                    <label for="rg-uploadimg text-center">
                                      <input
                                        type="file"
                                        name="uploadimg"
                                        id="rg-uploadimg"
                                        accept=".jpg,.png,.pdf"
                                        onChange={this.uploadScreenShot}
                                      />
                                      <span className="pt-2">
                                        Attach Screenshot or{" "}
                                        <a href="javascript:void(0);">Browse</a>
                                      </span>
                                      <em>
                                        Please upload a PDF, png, jpg only and
                                        ensure that the file is not in use.
                                      </em>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="rg-btnarea text-right">
                                <button class="rg-btn" type="submit">
                                  SUBMIT
                                </button>
                              </div>
                            </fieldset>
                          </form>
                        </div>
                        <div className="col-12 col-sm-6 col-md-5 col-lg-5">
                          <div className="reporproblem">
                            <h3>
                              <span>Call us toll free at </span> +91-8800277577
                            </h3>
                          </div>
                          <Image src={SupportImage}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
