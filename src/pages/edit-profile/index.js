import Loader from "components/Loader";
import dynamic from "next/dynamic";
import constant from "constant";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { withRouter } from "next/router";
import React, { Component } from "react";
import HeaderLoader from "components/common/HeaderLoader";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from "components/Filtered_Header";

let EditProfile = dynamic(() => import("components/Edit_Profile/EditProfile"), {  
  ssr: false,
  loading: () => <Loader />,
});
 

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd))
        : {},
      auth: getCookie(constant.keys.ctoken),
      loginData: getCookie(constant.keys.loginData),
      addUpdate: getCookie(constant.keys.addAndUpdate),
      data: getCookie('saveJobId')
    };
  }
  componentDidMount() {
    // document.title = constant.title.EditProfile
    window.scrollTo(0, 0);
    // const { JOB_ID } = this.state.addUpdate ? this.state.addUpdate : ''
    // if(JOB_ID && this.state.detail){
    //   this.props.history.push(constant.component.recommendedJobs.url)
    // }
    if (!this.state.detail) {
      this.props.history.push(constant.component.signin.url);
    }
    // if(this.state.data && this.state.detail){
    //   this.props.history.push(constant.component.savedJobs.url)
    // }
  }
  render() {
    const { ud } = this.props;
    return (
      <React.Fragment>
        <Head>
          {/* <title title={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}>{ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}</title> */}
          <title> Edit Profile , rozgar.com </title>
          <meta name="HandheldFriendly" content="True" />
         
          <meta
            name="description"
            content={
              " Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"
            }
          />
          <link rel="canonical" href={"http://rozgar.com/edit-profile"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        
        <FilteredHeader ud={ud} />

        <EditProfile history={this.props.router} />
      </React.Fragment>
    );
  }
}

export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req);

  if (ud == null) {
    return {
      redirect: {
        destination: "/?alert=true",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ud: ud,
    },
  };
}





export default withRouter(index);
