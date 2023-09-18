import React, { Component } from 'react'
import NumericFormat from 'react-number-format';
import { getCourseSpeczListForJobs, getEducationCourseType, getEduQualificationTypeListsForJobs, getGrading, getQualificationTypeListsForJobs } from '@/action/CandidateAction';
import constant from 'constant';
import { getCookie } from 'cookies-next';

export default class EditEducationModal extends Component {
  constructor(props) {
    super(props);
    const educationDetails = this.props.educationDetails
    this.state = {
      details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
      educationList: [],
      education: educationDetails ? educationDetails.QUALIFICATION_ID : [],
      courseList: [],
      course: educationDetails ? educationDetails.EDUCATION_QUALIFICATION_ID : [],
      specializationList: [],
      specialization: educationDetails ? educationDetails.SPECIALIZATION_ID : [],
      courseTypeList: [],
      courseType: educationDetails ? educationDetails.COURSE_TYPE_ID : [],
      universityInstitute: educationDetails ? educationDetails.UNIVERSITY_INSTITUTE : '',
      passingOutYear: educationDetails && educationDetails.PASSING_OUT_YEAR ? educationDetails.PASSING_OUT_YEAR : '',
      gradingList: [],
      gradingSystem: educationDetails ? educationDetails.GRADING_SYSTEM_ID : '',
      marks: educationDetails ? educationDetails.MARKS : '',
      CANDIDATE_EDUCATION_ID: educationDetails ? educationDetails.CANDIDATE_EDUCATION_ID : '',
      CurrentAnnualSalaryLac: '',
      CurrentAnnualSalaryThousands: '',
    }
  }


  componentDidMount() {
    this.getQualificationTypeListForJob()
    this.getGradingSystemList()
    this.getCourseType()
    if (this.props?.educationDetails?.QUALIFICATION_ID) {
      getEduQualificationTypeListsForJobs({ QUALIFICATION_ID: this.props?.educationDetails?.QUALIFICATION_ID }).then((res) => {
        if (res.status) {
          let d = res.result.map((data, index) => {
            return {
              COURSE_STREAM: data.COURSE_STREAM,
              COURSE_STREAM_DETAILS: data.COURSE_STREAM_DETAILS,
              CREATED_BY: data.CREATED_BY,
              CREATED_ON: data.CREATED_ON,
              EDUCATION_QUALIFICATION_ID: data.EDUCATION_QUALIFICATION_ID,
              MODIFIED_BY: data.MODIFIED_BY,
              MODIFIED_ON: data.MODIFIED_ON,
              QUALIFICATION_ID: data.QUALIFICATION_ID,
              SORT_NUMBER: data.SORT_NUMBER,
              STATUS: data.STATUS,
              label: data.COURSE_STREAM,
            };
          });
          this.setState({
            courseList: d
          })
        }
      });
    }
    if (this.props?.educationDetails?.EDUCATION_QUALIFICATION_ID) {
      getCourseSpeczListForJobs({ EDUCATION_QUALIFICATION_ID: this.props?.educationDetails?.EDUCATION_QUALIFICATION_ID }).then((res) => {
        if (res.status) {
          let d = res.result.map((data, index) => {
            return {
              CREATED_BY: data.CREATED_BY,
              CREATED_ON: data.CREATED_ON,
              EDUCATION_QUALIFICATION_ID: data.EDUCATION_QUALIFICATION_ID,
              MODIFIED_BY: data.MODIFIED_BY,
              MODIFIED_ON: data.MODIFIED_ON,
              QUALIFICATION_ID: data.QUALIFICATION_ID,
              SORT_NUMBER: data.SORT_NUMBER,
              SPECIALIZATION: data.SPECIALIZATION,
              SPECIALIZATION_DETAILS: data.SPECIALIZATION_DETAILS,
              SPECIALIZATION_ID: data.SPECIALIZATION_ID,
              STATUS: data.STATUS,
              label: data.SPECIALIZATION,
            };
          });
          this.setState({
            specializationList: d
          })
        }
      });
    }
  }

  getQualificationTypeListForJob = () => {
    getQualificationTypeListsForJobs().then((res) => {
      if (res.status) {
        this.setState({ educationList: res.result })
      }
    }).catch((err) => {
      alert(err);
    });
  };

  getCourse = (e) => {
    this.setState({ education: e.target.value })
    const QUALIFICATION_ID = e.target.value
    getEduQualificationTypeListsForJobs({ QUALIFICATION_ID: QUALIFICATION_ID }).then((res) => {
      if (res.status) {
        this.setState({ courseList: res.result })
      }
    }).catch((err) => {
      alert(err);
    });
  }

  getSpecializeCourse = (e) => {
    this.setState({ course: e.target.value })
    const EDUCATION_QUALIFICATION_ID = e.target.value
    getCourseSpeczListForJobs({ EDUCATION_QUALIFICATION_ID: EDUCATION_QUALIFICATION_ID }).then((res) => {
      if (res.status) {
        this.setState({ specializationList: res.result })
      }
    }).catch((err) => {
      alert(err);
    })

  }

  // getEducationQualificationTypeListForJob = (QUALIFICATION_ID) => {
  //   getEduQualificationTypeListsForJobs({ QUALIFICATION_ID: QUALIFICATION_ID }).then((res) => {
  //     if (res.status) {
  //       let d = res.result.map((data, index) => {
  //         return {
  //           COURSE_STREAM: data.COURSE_STREAM,
  //           COURSE_STREAM_DETAILS: data.COURSE_STREAM_DETAILS,
  //           CREATED_BY: data.CREATED_BY,
  //           CREATED_ON: data.CREATED_ON,
  //           EDUCATION_QUALIFICATION_ID: data.EDUCATION_QUALIFICATION_ID,
  //           MODIFIED_BY: data.MODIFIED_BY,
  //           MODIFIED_ON: data.MODIFIED_ON,
  //           QUALIFICATION_ID: data.QUALIFICATION_ID,
  //           SORT_NUMBER: data.SORT_NUMBER,
  //           STATUS: data.STATUS,
  //           label: data.COURSE_STREAM,
  //         };
  //       });
  //       this.setState({
  //         courseList: d
  //       })
  //     }
  //   })
  //     .catch((err) => {
  //       alert(err);
  //     });

  // };

  // getCourseSpeczTypeListForJob = (EDUCATION_QUALIFICATION_ID) => {
  //   getCourseSpeczListForJobs({
  //     EDUCATION_QUALIFICATION_ID: EDUCATION_QUALIFICATION_ID,
  //   })
  //     .then((res) => {
  //       if (res.status) {
  //         let d = res.result.map((data, index) => {
  //           return {
  //             CREATED_BY: data.CREATED_BY,
  //             CREATED_ON: data.CREATED_ON,
  //             EDUCATION_QUALIFICATION_ID: data.EDUCATION_QUALIFICATION_ID,
  //             MODIFIED_BY: data.MODIFIED_BY,
  //             MODIFIED_ON: data.MODIFIED_ON,
  //             QUALIFICATION_ID: data.QUALIFICATION_ID,
  //             SORT_NUMBER: data.SORT_NUMBER,
  //             SPECIALIZATION: data.SPECIALIZATION,
  //             SPECIALIZATION_DETAILS: data.SPECIALIZATION_DETAILS,
  //             SPECIALIZATION_ID: data.SPECIALIZATION_ID,
  //             STATUS: data.STATUS,
  //             label: data.SPECIALIZATION,
  //           };
  //         });
  //         this.setState({
  //           specializationList: d
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  getGradingSystemList = () => {
    getGrading()
      .then((res) => {
        if (res.status) {
          let d = res.result.map((data, index) => {
            return {
              GRADING_SYSTEM_ID: data.GRADING_SYSTEM_ID,
              GRADING_SYSTEM_TYPE: data.GRADING_SYSTEM_TYPE,
              label: data.GRADING_SYSTEM_TYPE,
            };
          });
          this.setState({
            gradingList: d
          })
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  getCourseType = () => {
    getEducationCourseType()
      .then((res) => {
        if (res.status) {
          let d = res.result.map((data, index) => {
            return {
              COURSE_TYPE_ID: data.COURSE_TYPE_ID,
              COURSE_TYPE: data.COURSE_TYPE,
              label: data.COURSE_TYPE,
            };
          })
          this.setState({
            courseTypeList: d
          })
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  onSubmit = (e) => {
    e.preventDefault()
    const { CANDIDATE_ID } = this.state.details
    const { educationList, education, courseList, courseTypeList, specializationList, specialization, marks, gradingList, gradingSystem, courseType, course, universityInstitute, CANDIDATE_EDUCATION_ID, passingOutYear } = this.state

    if (this.props.type == "ADD") {
      let model = {
        CANDIDATE_ID: CANDIDATE_ID,
        Course: course || '',
        Education: education || '',
        Specialization: specialization || '',
        // Course: course && course.length > 0 ? course[0].EDUCATION_QUALIFICATION_ID : [],
        // Education: education && education.length > 0 ? education[0].QUALIFICATION_ID : [],
        // Specialization: specialization && specialization.length > 0 ? specialization[0].SPECIALIZATION_ID : [],
        UniversityInstitute: universityInstitute,
        CourseType: courseType || '',
        PassingOutYear: passingOutYear,
        GradingSystem: gradingSystem || '',
        marks: marks,
        type: 'ADD'
      }
      this.props.onSubmit(model)
    } else {
      let model = {
        CANDIDATE_ID: CANDIDATE_ID,
        Course: course || '',
        Education: education || '',
        Specialization: specialization || '',
        // Course: course && course.length > 0 ? course[0].EDUCATION_QUALIFICATION_ID : course,
        // Education: education && education.length > 0 ? education[0].QUALIFICATION_ID : education,
        // Specialization: specialization && specialization.length > 0 ? specialization[0].SPECIALIZATION_ID : specialization,
        UniversityInstitute: universityInstitute,
        CourseType: courseType || '',
        PassingOutYear: passingOutYear,
        GradingSystem: gradingSystem || '',
        marks: marks,
        CANDIDATE_EDUCATION_ID: CANDIDATE_EDUCATION_ID,
        type: "UPDATE"
      }
      this.props.onSubmit(model)
    }

  }

  onCancel = () => {
    this.props.onCancel()
  }

  render() {
    const { educationList, education, courseList, courseTypeList, specializationList, specialization, marks, gradingList, gradingSystem, courseType, course, universityInstitute, passingOutYear } = this.state
    return (
      <React.Fragment>
        <form className='edit-profile-form'>
          <div className='row'>
            <div class="col-12">
              <div className='form-group'>
                <label>Education <span className='text-danger'>*</span></label>
                <select className="form-control"
                  value={this.state.education}
                  onChange={this.getCourse}>
                  <option value="" > Select education</option>
                  {
                    educationList && educationList.map((data, index) => {
                      return <option value={data.QUALIFICATION_ID}>{data.QUALIFICATION_NAME}</option>
                    })
                  }
                </select>
                {
                  this.props.error.Education && !education.length && <span className="text-danger ml-1">{this.props.error.Education}</span>
                }
              </div>
            </div>
            <div class="col-12">
              <div className='form-group'>
                <label>Course <span className='text-danger'>*</span></label>
                <select className="form-control"
                  name='course'
                  value={this.state.course}
                  onChange={this.getSpecializeCourse}
                >
                  <option value="" > Select course</option>
                  {
                    courseList && courseList.map((data, index) => {
                      return <option value={data.EDUCATION_QUALIFICATION_ID}>{data.COURSE_STREAM}</option>
                    })
                  }
                </select>
                {
                  this.props.error.Course && !course.length && <span className="text-danger ml-1">{this.props.error.Course}</span>
                }
              </div>
            </div>
            <div class="col-12">
              <div className='form-group'>
                <label>Specialization</label>
                <select className="form-control"
                  value={this.state.specialization}
                  onChange={(e) => {
                    this.setState({ specialization: e.target.value })
                  }}
                >
                  <option value="" > Select specialization</option>
                  {
                    specializationList && specializationList.map((data, index) => {
                      return <option value={data.SPECIALIZATION_ID}>{data.SPECIALIZATION}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div class="col-12">
              <div className='form-group'>
                <label>University/Institute <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={universityInstitute}
                  onChange={(e) => { this.setState({ universityInstitute: e.target.value }) }}
                  placeholder="Your University/Institute"
                  name="university"
                />
                {
                  this.props.error && !universityInstitute && <span className="text-danger ml-1">{this.props.error.UniversityInstitute}</span>
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div class="col-12">
              <div className='form-group'>
                <label>Course Type <span className='text-danger'>*</span></label>
                <select className="form-control"
                  value={this.state.courseType}
                  onChange={(e) => {
                    this.setState({
                      courseType: e.target.value
                    })
                  }}>
                  <option value="" > Choose a course type...</option>
                  {
                    courseTypeList && courseTypeList.map((data, index) => {
                      return <option value={data.COURSE_TYPE_ID}>{data.COURSE_TYPE}</option>
                    })
                  }
                </select>
                {
                  this.props.error.CourseType && !courseType.length && <span className="text-danger ml-1">{this.props.error.CourseType}</span>
                }
              </div>
            </div>
          </div>

          <div className='row radio-btn-box'>
            <div class="col-12">
              <div className='form-group'>
                <label>Passing Out Year </label>
                <select
                  className="form-control"
                  value={this.state.passingOutYear}
                  onChange={(e) => { this.setState({ passingOutYear: e.target.value }) }}
                >
                  <option value=""> Please Select Passing Out Year</option>
                  {
                    Array.from({ length: 50 }, (_, i) => <option value={(new Date().getFullYear()) - i}>{ (new Date().getFullYear()) - i}</option>)
                  }
                </select>
                {
                  this.props.error && !this.state.passingOutYear && <span className="text-danger ml-1">{this.props.error.PassingOutYear}</span>
                }
              </div>
            </div>
            <div class="col-12">
              <div className='form-group'>
                <label>Grading System <span className='text-danger'>*</span></label>
                <select className="form-control"
                  id="Grading System"
                  value={this.state.gradingSystem}
                  onChange={(e) => {
                    this.setState({
                      gradingSystem: e.target.value
                    })
                  }}>
                  <option value=""> Choose a grading system...</option>
                  {
                    gradingList && gradingList.map((data, index) => {
                      return <option value={data.GRADING_SYSTEM_ID}>{data.GRADING_SYSTEM_TYPE}</option>
                    })
                  }
                </select>
                {
                  this.props.error.GradingSystem && !gradingSystem.length && <span className="text-danger ml-1">{this.props.error.GradingSystem}</span>
                }
              </div>
            </div>
            {
              this.state.gradingSystem
              &&
              <div class="col-12">
                <div className='form-group'>
                  <label>Marks <span className='text-danger'>*</span></label>
                  <NumericFormat type="text"
                    maxLength={5}
                    className="form-control"
                    id="name"
                    value={this.state.marks}
                    onChange={(e) => { this.setState({ marks: e.target.value }) }}
                    placeholder="Your Marks" name="name" />
                  {
                    this.props.error && <span className="text-danger ml-1">{this.props.error.marks}</span>
                  }
                </div>
              </div>
            }

          </div>

          <div className='row'>
            <div class="col-12 text-right pb-3 pt-3">
              <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel}>CANCEL</button>
              <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={(e) => this.onSubmit(e)} >SAVE</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}
