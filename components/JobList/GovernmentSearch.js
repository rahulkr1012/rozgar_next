import { SeoUrl, ToSeoUrl, toSeoUrl, validateField } from '@/utils'
import constant from 'constant'
import { getCookie, setCookie } from 'cookies-next'
import { withRouter } from 'next/router'
import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { makeTitle, onChange } from 'utils'
import bgImage from 'src/assets/images/gov-bg.jpg'

class GovernmentSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      KEYWORD: {
        name: 'KEYWORD',
        value: props.url ? props.url:'',
        options: [],
        error: '',
        isRequired: true
      },

    }
  }
  onSubmit = (e) => {
    const { KEYWORD } = this.state
    e.preventDefault()
    if (validateField(this)) {
      let url = ''
      if (KEYWORD.value.length) {
        url = constant.component.GovernmentSearchJob.url.replace(':keyword', "keyword=" + (this.state.KEYWORD.value).replaceAll('/', '-'))
      }
      if (this.props.onSearch != undefined) {
        this.props.router.push(url)
        this.props.onSearch((this.state.KEYWORD.value.replaceAll('/', '-')), URL)
      } else {
        this.props.router.push(url)
      }

    }
  }

  onKeywordChange = (e) => {
    const val = e.target.value
    if(val.length==0){
      const url=constant.component.governmentJobs.url
      this.props.router.push(url)
    }
    onChange(this, this.state.KEYWORD.name, val)

  }
  render() {
    const { KEYWORD } = this.state
    const joburl = this.props.joburl
    const JobList = this.props.JobList

    let rozgar_job_loc_search = {

      backgroundImage: JobList == undefined ? `url('${bgImage.src}')` : JobList.HEADER_IMAGE == null ? `url('${bgImage.src}')` : `url('https://s3rozgar.s3.ap-south-1.amazonaws.com/state_images/${JobList.HEADER_IMAGE}')`

    }




    const GovtJobSJobTITLE = this.props.GovtJobSJobTITLE
    
    return (
      <React.Fragment>
        <div className={`gov-jobs-serach-bx rozgar-govsearchbg`} style={
          rozgar_job_loc_search
        }
        >
          <div className="container">
            <div className='row'>
              <div className='col-md-12'>
                <div className='hd-title-gov'>
                  <h4>{
                   joburl == null ||  joburl == undefined?'Government Jobs':joburl=="Central Government Jobs"?"Central Government Jobs":
                      joburl + ' Government  Jobs' }</h4>

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-1">
                <form className="rozgar-jobbylocsearchbox">
                  <div className="rozgar-formbox">
                    <div className="rozgar-jobbylocsearchcontent">
                      <div className="form-group ">
                        <i className="lnr lnr-magnifier" />
                        <div
                          className="rbt form-control hdh"
                          tabIndex={-1}
                          style={{ outline: "none", position: "relative" }}
                        >
                          <div
                            className="rbt-input-multi form-control rbt-input"
                            tabIndex={-1}
                          >
                            <div className="rbt-input-wrapper">
                              <div style={{
                                display: "flex", flex: "1 1 0%", height: "100%", position: "relative"
                              }}>
                                <input

                                  placeholder=" Search Government Jobs by Job Title, Description, Department..."
                                  type="text"

                                  name={KEYWORD.name}
                                  value={KEYWORD.value}
                                  onChange={(e) => this.onKeywordChange(e)}

                                  className="rbt-input-main"

                                  style={{
                                    backgroundColor: "transparent",
                                    border: 0,
                                    boxShadow: "none",
                                    cursor: "inherit",
                                    outline: "none",
                                    padding: 0,
                                    width: "100%",
                                    zIndex: 1
                                  }}
                                />

                                {/* placeholder="Search Government Jobs by Job Title, Description, Department... " */}
                                {/* <input
                                    aria-hidden="true"
                                    className="rbt-input-hint"
                                    readOnly=""
                                    tabIndex={-1}
                                    defaultValue=""
                                    style={{
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      boxShadow: "none",
                                      color: "rgba(0, 0, 0, 0.54)",
                                      left: 0,
                                      pointerEvents: "none",
                                      position: "absolute",
                                      top: 0,
                                      width: "100%",
                                      borderStyle: "none",
                                      borderWidth: 0,
                                      fontSize: 14,
                                      fontWeight: 400,
                                      height: 18,
                                      lineHeight: 18,
                                      margin: 0,
                                      padding: 0
                                    }}
                                  /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rozgar-jobbylocsearchbtn">
                     <button type="submit" onClick={(e) => this.onSubmit(e)} className="rg-btn rg-active btn-primary float-right"> <i className="lnr lnr-magnifier" /></button>
                    </div>
                  </div>
                  {KEYWORD.error.length > 0 && <span style={{ marginLeft: '50px' }} className='text-danger'>Please enter keywords</span>}

                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default withRouter(GovernmentSearch)