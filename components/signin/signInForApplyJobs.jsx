import React, { Component } from 'react'
import constant from 'constant';
import { getsessionStorage, getStorage, setStorage } from '../../utils';
import swal from 'sweetalert'
import { candidateLogin, googleLoginAuth } from '@/action/CandidateAction'
import { getCookie } from 'cookies-next';
import Signin from './signInForModal';

export default class SignInForApplyJobs extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      loginDatas: null,
      showLoader: false,
      detail: getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd))
        : {},
      auth: getCookie(constant.keys.ctoken),
      data: getCookie('JobUrl'),
      addUpdate:getCookie(constant.keys.addAndUpdate),
      saveJobId:getCookie('saveJobId')
    }
  }
  componentDidMount() {
    document.title = constant.title.Signin    
    window.scrollTo(0, 0)
  }

  onSubmit = (model) => {
    // const Url = this.state.data  
     const {JOB_ID} =  getCookie(constant.keys.addAndUpdate)
    ? JSON.parse(getCookie(constant.keys.addAndUpdate))
    : {}
    this.setState({ showLoader: true })
    candidateLogin(model).then((res) => {
      if (res.status) {
        this.setState({ showLoader: false })
        let auth = getCookie(constant.keys.ctoken)
        swal({
          icon: "success",
          text: "You have Successfully Signed In",
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false
        });
        //have to check this on other cases
        this.props.onCloseModal()
        //have to check this on other cases

        if (JOB_ID && auth) {
          this.props.history.push(constant.component.recommendedJobs.url)
        }
        else {
          this.props.history.push(constant.component.editProfile.url)
        }
      } else {
        this.setState({ showLoader: false })
        swal({
          icon: "error",
          text: res.error,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    });
  }

  googleLoginHandler = (googleData) => {
    // const Url = this.state.data
    const auth = this.state.auth
    const {JOB_ID} =  getCookie(constant.keys.addAndUpdate)
    ? JSON.parse(getCookie(constant.keys.addAndUpdate))
    : {}
    googleLoginAuth(googleData).then((res) => {
      if (res.status) {
        let auth = getCookie(constant.keys.ctoken)
        this.setState({
          loginDatas: res
        })
        //have to check this on other cases
        this.props.onCloseModal()
        //have to check this on other cases
        if (JOB_ID && auth) {
          this.props.history.push(constant.component.recommendedJobs.url)
        }
        else {
          this.props.history.push(constant.component.editProfile.url)
        }
      } else {
        swal({
          icon: "error",
          text: res.error,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Signin
          leftBar={this.props.leftBar}
          onSubmit={this.onSubmit}
          onCloseModal={()=>this.props.onCloseModal()}
          googleLoginHandler={this.googleLoginHandler}
          loginData={this.props.loginDatas}
          showLoader={this.state.showLoader}
        />
      </React.Fragment>
    )
  }

}
