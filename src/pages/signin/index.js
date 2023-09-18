import { candidateLogin, googleLoginAuth } from '@/action/CandidateAction';
import constant from 'constant';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React, { Component } from 'react'
import swal from 'sweetalert'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Loader from 'components/Loader'
  ;

const SignIn = dynamic(
  () => import("components/signin/signIn"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

const SignInWithOtp = dynamic(
  () => import("components/signin/signInWithOtp"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'EMAIL',
      loginDatas: null,
      showLoader: false,
      detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
      data: deleteCookie('JobUrl')
    }
  }

  componentDidMount() {
    // const id = this.props.location.search.slice(1)
    // if (id) {
    //   emailClicked(id)
    // }
    document.title = constant.title.Signin
    window.scrollTo(0, 0)
    let auth = getCookie(constant.keys.ctoken)
    let cd = getCookie(constant.keys.cd)
    if (cd) {
      cd = JSON.parse(cd)
    }
    if (auth && cd) {
      this.props.router.push(constant.component.editProfile.url)
    }
  }


  onSubmit = (model) => {
    const Url = this.state.data
    this.setState({ showLoader: true })

    candidateLogin(model).then((res) => {
      if (res.status) {
        this.setState({ showLoader: false })
        swal({
          icon: "success",
          text: "You have Successfully Logged In",
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false
        });
        const qParam = this.props.router.query
        if (qParam.personalRecruiter) {
          this.props.router.push(constant.component.PersonalRecruiter.url)
        }
        else {
          this.props.router.push(constant.component.editProfile.url)

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

  changeTab = (tab) => {
    this.setState({ tab: tab })
  }

  googleLoginHandler = (googleData) => {
    googleLoginAuth(googleData).then((res) => {
      if (res.status) {
        this.setState({
          loginDatas: res
        })
        this.props.router.push(constant.component.editProfile.url)
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
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Head >

          
          <meta name="HandheldFriendly" content="True" />
          <title>Login On Rozgar.com To Explore Job Opportunities</title>
          <meta name="description" content={"Login to Rozgar.com and explore more job opportunities. The latest job vacancies are available on Rozgar.com. Apply for your jobs in India."} />
          <link rel="canonical" href={"https://rozgar.com/signin"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Login On Rozgar.com To Explore Job Opportunities"} />
          <meta property="og:description" content={"Login to Rozgar.com and explore more job opportunities. The latest job vacancies are available on Rozgar.com. Apply for your jobs in India."} />
          <meta property="og:url" content={"https://rozgar.com/signin"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Login On Rozgar.com To Explore Job Opportunities"} />
          <meta name="twitter:description" content={"Login to Rozgar.com and explore more job opportunities. The latest job vacancies are available on Rozgar.com. Apply for your jobs in India."} />
          <meta name="twitter:url" content={"https://rozgar.com/signin"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
        </Head>
        {tab === 'EMAIL' && <SignIn
          changeTab={(tab) => this.changeTab(tab)}
          leftBar={this.props.leftBar}
          onSubmit={this.onSubmit}
          googleLoginHandler={this.googleLoginHandler}
          loginData={this.props.loginDatas}
          showLoader={this.state.showLoader}
          history={this.props.router}
        />}
        {tab === 'PHONE' && <SignInWithOtp
          changeTab={(tab) => this.changeTab(tab)}
          leftBar={this.props.leftBar}
          onSubmit={this.onSubmit}
          googleLoginHandler={this.googleLoginHandler}
          loginData={this.props.loginDatas}
          showLoader={this.state.showLoader}
          history={this.props.router}
        />}

      </React.Fragment>
    )
  }

}

export default withRouter(index)