import React, { Component, useEffect, useState } from "react";
import constant from "constant";
import swal from "sweetalert";
// import { getsessionStorage, getStorage, setsessionStorage } from '../../utils';
import { useRouter, withRouter } from "next/router";
import Head from "next/head";
import {
  candidateRegister,
  googleLoginAuth,
  phoneVerification,
  reMobSendOTP,
} from "@/action/CandidateAction";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

const Register = dynamic(() => import("components/register/register"), {
  loading: () => <Loader />,
  ssr: false,
});

function index(props) {
   
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [detail, setDetail] = useState({});
  const [loginDatas, setLoginDatas] = useState({});
  const [candidateId, setCandidateId] = useState("");
  const [auth, setAuth] = useState('')
  const router = useRouter();

  useEffect(() => {
    document.title = constant.title.Register;
    window.scrollTo(0, 0);
    let auth = getCookie(constant.keys.ctoken);
    let cd = getCookie(constant.keys.cd)
      ? JSON.parse(getCookie(constant.keys.cd))
      : {};
    setDetail(cd);
    setAuth(auth)
    deleteCookie("addAndUpdate");
    deleteCookie("saveJobId");
    if (auth && cd) {
      props.router.push(constant.component.editProfile.url);
    }
    let Job_Id = router.query?.JOB_ID;
    let saveJobId = router.query?.SAVE_JOB_ID
    if (Job_Id) {
      setCookie("addAndUpdate",  { JOB_ID:parseInt(Job_Id)});
    }
    if (saveJobId) {
      setCookie("saveJobId", { JOB_ID: parseInt(saveJobId) });
    }
  }, []);

  const onSubmit = (formData) => {
    setShowLoader(true);
    candidateRegister(formData).then((res) => {
      if (res.status) {
        setShowLoader(false);
        setShowModal(true);
        setCandidateId(res.result.CANDIDATE_ID);
      } else {
        setShowLoader(false);
        swal({
          icon: "error",
          text: res.error,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          width: '250px'
        });
      }
    });
  };

  const setShowModel = (showModal) => {
    setShowModal(showModal);
  };

  const phoneVerifications = (mob_otp) => {
    // const Url = state.detail
    // const saveJobId = state.data
    // const jobListByCity = getStorage("jobListByCity")
    let auth = getCookie(constant.keys.ctoken);
    let Job_Id = router.query?.JOB_ID;
    let saveJobId = router.query?.SAVE_JOB_ID
    if (Job_Id) {
      setCookie("addAndUpdate",  { JOB_ID:parseInt(Job_Id)});
    }
    if (saveJobId) {
      setCookie("saveJobId", { JOB_ID: parseInt(saveJobId) });
    }

    phoneVerification({
      CANDIDATE_ID: candidateId,
      mob_otp: mob_otp,
    }).then((res) => {
      if (res.status) {
        setShowModal(false);
        swal({
          icon: "success",
          text: res.messageCode,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        
        if (saveJobId && auth) {
          props.router.push(constant.component.savedJobs.url);
        } else if (Job_Id && auth) {
          props.router.push(constant.component.recommendedJobs.url);
        } else {
          props.router.push(constant.component.editProfile.url);
        }
      } else {
        setShowLoader(false);
        swal({
          icon: "error",
          text: "Something went wrong!!",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          width: '250px'
        });
      }
    });
  };

  const reSendOTP = () => {
    reMobSendOTP({ CANDIDATE_ID: candidateId }).then((res) => {
      if (res.status) {
        swal({
          icon: "success",
          text: "OTP has been sent to your registered Mobile number",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          width: '250px'
        });
      } else {
        swal({
          icon: "error",
          text: "Something went wrong!!",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          width: '250px'
        });
      }
    });
  };

  const googleLoginHandler = (googleData) => {
     
    let Job_Id = router.query?.JOB_ID;
    let saveJobId = router.query?.SAVE_JOB_ID
    if (Job_Id) {
      setCookie("addAndUpdate",  { JOB_ID:parseInt(Job_Id)});
    }
    if (saveJobId) {
      setCookie("saveJobId", { JOB_ID: parseInt(saveJobId) });
    }
    googleLoginAuth(googleData).then((res) => {
      if (res.status) {
        setLoginDatas(res);
        let auth = getCookie(constant.keys.ctoken);
        if (Job_Id && auth) {
          props.router.push(constant.component.recommendedJobs.url);
        } else if (saveJobId && auth) {
          props.router.push(constant.component.savedJobs.url);
        } else {
          props.router.push(constant.component.editProfile.url);
        }
      } else {
        swal({
          icon: "error",
          text: res.error,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          width: '250px'
        });
      }
    });
     

  };

  // const { Spinner } = state;
  return (
    <React.Fragment>
      <Head>
        <title>Register to Search and Apply for Jobs - Rozgar.com</title>
        <meta name="HandheldFriendly" content="True" />
        <meta
          name="description"
          content={
            "Looking for any job related to your skills or qualification? Register on Rozgar.com and get unlimited job opportunities to make your career."
          }
        />
     
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={"Register to Search and Apply for Jobs - Rozgar.com"} />
        <meta
          property="og:description"
          content={
            "Looking for any job related to your skills or qualification? Register on Rozgar.com and get unlimited job opportunities to make your career."
          }
        />
        <meta property="og:url" content={"https://rozgar.com/register"} />
        <meta
          property="og:image"
          content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
        />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Register to Search and Apply for Jobs - Rozgar.com"} />
        <meta
          name="twitter:description"
          content={
            "Looking for any job related to your skills or qualification? Register on Rozgar.com and get unlimited job opportunities to make your career."
          }
        />
        <meta name="twitter:url" content={"https://rozgar.com/register"} />
        <meta
          name="twitter:image"
          content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
        />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <link rel="canonical" href={"https://rozgar.com/register"} />
      </Head>

      <Register
        onSubmit={onSubmit}
        phoneVerification={phoneVerifications}
        reSendOTP={reSendOTP}
        showModal={showModal}
        setShowModel={setShowModel}
        googleLoginHandler={googleLoginHandler}
        loginData={props.loginDatas}
        showLoader={showLoader}
        history={props.router}
      />
       

    </React.Fragment>
  );
}

// export async function getServerSideProps(context) {
//   let { query } = context;
//   return {
//     props: { query },
//   };
// }

export default withRouter(index);
