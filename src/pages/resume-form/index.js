import { getLoggedInUserData } from 'nextCookie'
import React from 'react'
import swal from "sweetalert";
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'
import { capFirstLetterInSentence } from 'utils'
import { useRouter } from 'next/router'
import { getResumeData , UpdateResume, WriteResume  } from '@/action/CandidateAction'
import bg4r from 'src/assets/images/bg-resume.jpg'
import constant from 'constant';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'
import {withRouter} from 'next/router';
import Spinner from 'components/spinner'
import { connect } from 'react-redux';
import { resumeData } from 'Redux/reducer/user_data';
import actions from './../../../Redux/actions'
import { ToastContainer ,toast } from 'react-toastify';
import ResumeFormShimmer from 'components/common/ReumeFormShimmer'
let LeftSideBar = dynamic(()=> import('components/leftside_bar') , {ssr:false })

// let ResumeHome = dynamic(()=> import('components/ResumeHome')   , {
//   ssr:false ,
//   loading:()=> <Loader /> 
// } )
 
let ResumeForm1  =  dynamic(()=> import('components/ResumeForm1') , {
      ssr:false ,
      loading:()=>  <ResumeFormShimmer /> 
   })   
 


   let resume_job_loc_search ={ 
    backgroundImage: `url('${bg4r.src}')`,
    }



class Index extends React.Component { 


  constructor(props) {
    super(props);     
    this.state = {
      showShimmer: false,
      showLoader: false,
      detail:  undefined,
      footer_style: {
        style: "marginTop:400px"
      },
      candidateID: this.props.ud!=null?JSON.parse(this.props.ud[constant.keys.cd])  :"",
         ud:this.props.ud ,
    };

  }


  componentDidMount() {
    // document.title = constant.title.TemplateUpdate02
    const CANDIDATEID = this.state.candidateID.CANDIDATE_ID;
     this.ResumeDetail(CANDIDATEID);  
    } 
   

  ResumeDetail = (CANDIDATEID) => {
 
    this.setState({ showShimmer: true });
    getResumeData(CANDIDATEID)
      .then((res) => {
      
        this.setState({ showShimmer: false });
        
        if (res.status) {
          this.setState({ showShimmer: false });
           if(res.result.PROFILE_SUMMARY==null){
            res.result.PROFILE_SUMMARY=""
           }
          this.setState( { detail: res.result } 
          
          
          );
        
         }
          
      }) 
      .catch((err) => {
        alert(err);
      });      
  };


   

  getFormData(model) {
    const formDataObj = {};
    model.forEach((value, key) => (formDataObj[key] = value));
    return formDataObj 
  }


  addResumeMaking = (model) => {
    this.setState({ showLoader: true })
    WriteResume(model).then((res) => {
      this.setState({ showLoader: false })
      if (res.status) {
        this.setState({ showLoader: false })
        toast.success('Resume created successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

        this.props.saveResumeDataToRedux({type:actions.RESUME_DATA,payload:{
          data:this.getFormData(model)} } )
         this.props.router.push(constant.component.ResumeChooseTemplate.url)  
         }

       
      else {
        this.setState({ showLoader: false })
    
        toast.error(res.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
   
    }).catch((err) => {
      console.log(err)
     })    
  }

   
  updateResumeMaking = (model) => {
    
    this.setState({ showLoader: true });
   
    this.props.saveResumeDataToRedux({type:actions.RESUME_DATA,payload:{
      data:this.getFormData(model)} } )
       
      this.props.router.push(constant.component.ResumeChooseTemplate.url);

      // UpdateResume(model)
    //   .then((res) => {
    //     this.setState({ showLoader: false });
    //     if (res.status) {
    //       this.setState({ showLoader: false });
    //       swal({
    //         icon: "success",
    //         text: "",
    //         timer: 3000,
    //       });
    //       this.props.router.push(constant.component.ResumeChooseTemplate.url);
    //     } else {
    //       this.setState({ showLoader: false });
    //       swal({
    //         icon: "error",
    //         text: res.error,
    //         timer: 2000,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  render() {

  return (<React.Fragment>

      <Head>
        <title
      title={
        " Create Free CV - " +
        capFirstLetterInSentence(
          this.props.router.asPath
            .replace("/", "")
            .split("/")
            .pop()
            .split("-")
            .join(" ")
        ) +
        "-Rozgar.com"
      }
    >
      {" Create Free CV - " +
        capFirstLetterInSentence(
          this.props.router.asPath
            .replace("/", "")
            .split("/")
            .pop()
            .split("-")
            .join(" ")
        ) +
        "-Rozgar.com"}
    </title>
    <meta name="HandheldFriendly" content="True" />
    <meta
      name="description"
      content={
        " CFill out your resume form with your necessary details like qualifications, experience, and skills, and make your resume with attractive resume templates."
      }
    />
     {/*   <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} /> */ } 
    <meta name="referrer" content="no-referrer-when-downgrade" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* og meta tag */}
    <meta property="og:site_name" content="Rozgar.com" />
    <meta
      property="og:title"
      content={capFirstLetterInSentence(
        this.props.router.asPath
          .replace("/", "")
          .split("/")
          .pop()
          .split("-")
          .join(" ")
      )}
    />
    <meta
      property="og:description"
      content={
        "Fill out your resume form with your necessary details like qualifications, experience, and skills, and make your resume with attractive resume templates."
      }
    />
    <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
    <meta
      property="og:image"
      content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
    />
    <meta property="og:image:width" content="4000" />
    <meta property="og:image:height" content="6000" />

    {/* Twitter Meta Tag */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content={capFirstLetterInSentence(
        this.props.router.asPath
          .replace("/", "")
          .split("/")
          .pop()
          .split("-")
          .join(" ")
      )}
    />
    <meta
      name="twitter:description"
      content={
        " Fill out your resume form with your necessary details like qualifications, experience, and skills, and make your resume with attractive resume templates."
      }
    />
    <meta name="twitter:url" content={"https://rozgar.com"+this.props.router.asPath} />
    <meta
      name="twitter:image"
      content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
    />
    <meta name="twitter:label1" content="Written by" />
    <meta name="twitter:data1" content="Smita Nag" />
    <meta name="twitter:label2" content="Filed under" />
    <meta name="twitter:data2" content="Career Advice, Career Insights" />
    <meta name="twitter:site" content="@rozgar_india" />
    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
      
      </Head> 
       
      <FilteredHeader ud={this.state.ud} />
      
      {this.state.showLoader && <Spinner /> }

 

       <section className="blog-area section-resume">
       <div className="container">
         <div className="row">

           <div className="col-12 col-md-4">
             <div className="cv-prev bg-white  cv-prev-right-bx p-4" style={
             resume_job_loc_search}>

               <div className="left-had-sec"><h1>Create Your Resume </h1></div>
               <div className="blog_thumbnail resume-making-tab-box navigation" id="mainNav">

                 {/* <img src={resume02} className="temp-img" alt="" /> */}

                   <LeftSideBar />


               </div>
             </div>
           </div>




           <div className="col-12 col-md-8 mob-pad1">
             <div className="container mob-pad2">

             
                  {
                    this.state.candidateID.toString().length == 0 && 
                      <ResumeForm1
                        // details={this.state.detail}
                        onSubmit={(model) => this.addResumeMaking(model)}
                        showLoader={this.state.showLoader}
                        showShimmer={this.state.showShimmer}
                        />
                     }


                {
                  this.state.detail && (
                   <ResumeForm1
                     details={this.state.detail}
                     onSubmit={(model) => this.updateResumeMaking(model)}
                     showLoader={this.state.showLoader}
                     showShimmer={this.state.showShimmer}
                  />)    }


             </div>

           </div>
         </div>
       </div>
     </section>



        <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />









       { /* <ResumeHome  ud={this.state.ud} /> */}     
       
      
    </React.Fragment>
   )
  } 
}





let mapStateToProps = (state) => {
  
  return {
    propName: state.user,
  };
};



let mapDispatchToProps = (dispatch) => {
  return {
    saveResumeDataToRedux: (data) => dispatch(data),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))
 

export async function getServerSideProps(context) {
    let {req} = context
    let ud =  getLoggedInUserData(req)
    
    return {
         props:{
             ud
         }
    }

}




