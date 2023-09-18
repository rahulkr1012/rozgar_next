
import React from 'react'
import swal from "sweetalert";
import FilteredHeader from 'components/Filtered_Header'
import { capFirstLetterInSentence } from 'utils'
import { useRouter, withRouter } from 'next/router'
import { getResumeData , UpdateResume, WriteResume  } from '@/action/CandidateAction'
import bg4r from 'src/assets/images/bg-resume.jpg'
import constant from 'constant';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'
 
let ResumeForm1  =  dynamic(()=> import('components/ResumeForm1') , {
      ssr:false ,
      loading:()=> <Loader /> 
   })   
 
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
          this.setState({ detail: res.result });
        }
      }) 
      .catch((err) => {
        alert(err);
      });      
  };


   
  addResumeMaking = (model) => {
     
    this.setState({ showLoader: true })
    WriteResume(model).then((res) => {
      this.setState({ showLoader: false })
      if (res.status) {
        this.setState({ showLoader: false })
        swal({
          icon: 'success',
          text: 'Resume created successfully',
          timer: 3000,
        })
          this.props.router.push(constant.component.ResumeChooseTemplate.url)
        }
       
      else {
        this.setState({ showLoader: false })
        swal({
          icon: 'error',
          text: res.error,
          timer: 2000,
        })
      }
      
    }).catch((err) => {
      console.log(err)
    })
  }


  updateResumeMaking = (model) => {
    
    this.setState({ showLoader: true });
    UpdateResume(model)
      .then((res) => {
        this.setState({ showLoader: false });
        if (res.status) {
          this.setState({ showLoader: false });
          swal({
            icon: "success",
            text: "",
            timer: 3000,
          });
          this.props.router.push(constant.component.ResumeChooseTemplate.url);
        } else {
          this.setState({ showLoader: false });
          swal({
            icon: "error",
            text: res.error,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



  render() {

  return (<React.Fragment>
       <section className="blog-area">
       <div className="container-fluid">
         <div className="row">
           <div className="col-12 col-md-4">
           
             <div className="cv-prev bg-white cv-prev-right-bx p-4" 
             data-bg-image={bg4r} 
             style={{
               background: `#ffffff url('${bg4r}')` ,
               backgroundPosition: 'bottom 10px right 10px',
               backgroundSize: '50%',
               backgroundRepeat: 'no-repeat'
             }}>
             
              
               <div className="left-had-sec"><h1>Create Your Resume</h1></div>
               <div className="blog_thumbnail resume-making-tab-box navigation" id="mainNav">

                 {/* <img src={resume02} className="temp-img" alt="" /> */}

                 <ul className="right-bar">
                   <li>
                     <a className="navigation__link" href='#1'> Personal Info</a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#2'>Add Educations </a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#3'>Add Experiences</a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#4'>Add Projects</a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#5'> Add Skills</a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#6'>Add Languages</a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#7'>Add Social Links </a>
                   </li>
                   <li>
                     <a className="navigation__link" href='#8'>Add Interests  </a>
                   </li>

                 </ul>
               </div>
             </div>
           </div>
           <div className="col-12 col-md-8">
             <div className="container">

              
             
                  {
                    this.state.candidateID.toString().length == 0 && 
                      <ResumeForm1
                        details={this.state.detail}
                        onSubmit={(model) => this.updateResumeMaking(model)}
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
    </React.Fragment>
   )
  } 
}


export default withRouter(Index) 
 





