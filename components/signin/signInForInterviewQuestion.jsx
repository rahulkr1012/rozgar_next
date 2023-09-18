import React, { Component } from 'react'
import Signin from '../../components/signin/signinForModal'
import constant from 'constant';
import { getsessionStorage, getStorage } from '../../utils';
import swal from 'sweetalert'
import { candidateLogin, googleLoginAuth } from '@/action/CandidateAction'
import { withRouter } from 'next/router';
import { getCookie } from 'cookies-next';

 class SignInForSaveUnsave extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loginDatas:null,
          showLoader:false,
          detail: getCookie(constant.keys.cd)
          ? JSON.parse(getCookie(constant.keys.cd))
          : {},
        auth: getCookie(constant.keys.ctoken),
          data:getCookie('saveJobId')
        }
    }
    componentDidMount() {
        document.title = constant.title.Signin
        window.scrollTo(0, 0)
    }

    onSubmit = (model) => {
      const saveJobId = typeof(getsessionStorage('saveJobId'))=='string' ? JSON.parse(getsessionStorage('saveJobId')) : getsessionStorage('saveJobId')
      this.setState({showLoader:true})
      candidateLogin(model).then((res) => {
          if (res.status) {
            let auth = getsessionStorage(constant.keys.ctoken)
            this.setState({showLoader:false})
            //have to check this on other cases
            this.props.onCloseModal()
             //have to check this on other cases
            if(saveJobId && auth){
                // this.props.history.push(constant.component.savedJobs.url)
            }
            else{
                // this.props.history.push(constant.component.editProfile.url)
            }
          } else {
            this.setState({showLoader:false})
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

  googleLoginHandler=(googleData)=>{
    const saveJobId = typeof(getsessionStorage('saveJobId'))=='string' ? JSON.parse(getsessionStorage('saveJobId')) : getsessionStorage('saveJobId')
    googleLoginAuth(googleData).then((res) => {
      if (res.status) {
        let auth = getsessionStorage(constant.keys.ctoken)
        this.setState({
          loginDatas:res
        })
         //have to check this on other cases
         this.props.onCloseModal()
         //have to check this on other cases
         if(saveJobId && auth){
            // this.props.history.push(constant.component.savedJobs.url)
      }
      else{
        //  this.props.history.push(constant.component.editProfile.url)
      }
      }else {
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

export default withRouter(SignInForSaveUnsave);
