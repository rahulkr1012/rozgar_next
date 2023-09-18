import React, { Component, Fragment } from 'react'
import pic01 from 'src/assets/images/newicon.gif'
import Image from 'next/image';
import govResultimg from 'src/assets/images/gov-result-bg.jpg'
import { capFirstLetterInSentence, toSeoUrl } from '@/utils';
import constant from 'constant';
import noRecordImg from '../../public/assets/images/no-results.png'
import Link from 'next/link';
import moment from 'moment';
import { withRouter } from 'next/router';

let govResultSec = {

  backgroundImage: `url('${govResultimg.src}')`,

}

class GovernmentResult extends Component {
  render() {
    const ResultList = this.props.stateResultList
    const deptList = this.props.deptList
    const ResultLists = this.props.resultlist
    // const state =this.props.router.query.state
    const stateURLList = this.props.stateURLList
    const GovtResult=this.props.router.query.url.replace('-',' ')

    // const departmentName=this.props.router.query.url.replace(/-/g, ' ')
    // const resulturl = capFirstLetterInSentence(`${state}`)
    // const deptUrl=capFirstLetterInSentence(`${departmentName}`)

    return (
      <Fragment>
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
          <div className="rg-sectionspace rg-haslayout pt-0">
            <div className={`gov-result-sec`} style={
              govResultSec
            }

            >
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                   {ResultList&&ResultList.length>0?ResultList.map((item,index)=>{
                    
                            if(index==0){
                             return(
                               <h4>Latest {item.STATE==null?"Central":item.STATE} Government Jobs Result</h4>
                             
                             )
                            }
                           }): <h4>Latest {capFirstLetterInSentence(GovtResult)} Government Jobs Result</h4>}
                  </div>
                </div>
              </div>
            </div>
            <div className="breadcrumbs-section breadcrumbs-result-section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="breadcrumbs-bx">
                      <p d="breadcrumbs"> <span><span><a href={'/'}>Home</a> /
                        <a href={constant.component.GovernmentResultState.url}> Government Result</a> /
                        <a href={''}> {capFirstLetterInSentence(GovtResult)}</a>

                      </span></span> </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <section className='government-result-section'>

              <div className='container'>
                <div className='row'>

                  <div className='col-md-8'>
                    
                        <div className='latest-government-result'>
                          
                          {ResultList&&ResultList.map((item,index)=>{
                            if(index==0){
                             return(
                               <h4 style={{fontSize:'15px',fontWeight:'bold'}} className='main-head-title'>Latest {item.STATE==null?"Central":item.STATE} Government Result</h4>
                             
                             )
                            }
                           })}
                          {ResultList && ResultList.length > 0 ? ResultList.map((item, index) => {
                              // Get today's date
                              let today =moment( new Date()).format('DD');
                              let today1=new Date()
                              // Change the date by adding 1 to it (today + 1 = tomorrow)
                             let tomm=  today1.getDate()-1
                              // return yyyy-mm-dd format
                            let Last_date=moment(item.CREATED_ON).format('DD')
                            return (
                          <ul className='latest-government-result-list'>
                            <li><a ><h4>
                            { today==Last_date? <Image src={pic01} />:tomm==Last_date?<Image src={pic01} />:''}
                          

                              
                              {item.RESULT_TITLE}</h4></a>
                              <h5>{item.DEPARTMENT}</h5>
                              <p> {item.DESCRIPTION}</p>
                             
                              <span className='result-date'>{moment(item.CREATED_ON).format('DD MMM, YYYY')}</span><span className='result-see-btn'>
                                <a target='blank' href={item.RESULT_URL.split("//")[0]=="https:"?item.RESULT_URL:"https://" + item.RESULT_URL}>View Result</a>
                                </span></li>


                          </ul>
                          )
                        }) : <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                          <Image src={noRecordImg} />
                          <h4>We could not find jobs matching your search criteria.</h4>
                          <h6>Did you enter wrong spelling of any word?</h6>
                          <p>Only Title/Description/Department names are accepted in Search field</p>
                          <Link href={constant.component.GovernmentResultState.url} class="rg-btn rg-active btn-primary mb-20" id="showtoast"><span className='text-white'>Browse More Government Jobs</span></Link>
    
                        </div>}
                        </div>
                     
                  </div>

                  <div className='col-md-4'>
                  <div className="savejobs-aside gov-jobs-aside">
                  {ResultList.length > 0 ? ResultList && ResultList.map((item, index) => {
                    if (index == 0) {
                      return (
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}> {item.STATE == null ? "Central" : item.STATE}  Government Departments </h3>
                      )
                    }
                  }) : stateURLList && stateURLList.map((item, index) => {
                    if (index == 0) {
                      return (
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}> {item.STATE == null ? "Central" : item.STATE}  Government Departments </h3>
                      )
                    }
                  })}

                  <ul>
                    {deptList && deptList.length > 0 ? deptList.map((item) => {
                      const stateurl = item.CATEGORY == "CENTRAL" ? "central" : toSeoUrl(item.STATE)
                      return (
                        <li>

                          <a href={constant.component.GovtDeptResult.url.replace(':state/:department/:url/:id', stateurl + "/" + "department" + "/" + item.DEPARTMENT_URL + "/" + item.DEPARTMENT_ID)}>
                            <span style={{ color: 'rgb(0, 0, 0)' }}>{item.DEPARTMENT} ({item.statejobresult})</span>

                          </a>
                          <div className='visit-site'>
                            <a 
                            target='_blank' 
                            href={item.DEPARTMENT_WEBSITE.split("//")[0]=='https:'?item.DEPARTMENT_WEBSITE:"https://"+item.DEPARTMENT_WEBSITE}>Visit official website </a> <i class="fa fa-external-link" aria-hidden="true"></i> </div>

                        </li>
                      )
                    }) : stateURLList && stateURLList.map((item, index) => {
                      const stateurl = item.CATEGORY == "CENTRAL" ? "central" : toSeoUrl(item.STATE)
                      return (
                        <li>

                          <a href={constant.component.GovtDeptResult.url.replace(':state/:department/:url/:id', stateurl + "/" + "department" + "/" + item.DEPARTMENT_URL + "/" + item.DEPARTMENT_ID)}>
                            <span style={{ color: 'rgb(0, 0, 0)' }}>{item.DEPARTMENT} ({item.statejobresult})</span>

                          </a>
                          <div className='visit-site'><a target='_blank'   

                          href={item.DEPARTMENT_WEBSITE.split("//")[0]=='https:'?item.DEPARTMENT_WEBSITE:"https://"+item.DEPARTMENT_WEBSITE}>Visit official website
                           <i class="fa fa-external-link" aria-hidden="true"></i></a></div>

                        </li>
                      )
                    })}


                  </ul>
                </div>

                  </div>
                </div>
              </div>

            </section>
          </div>
        </main>
      </Fragment>
    )
  }
}
export default withRouter(GovernmentResult)