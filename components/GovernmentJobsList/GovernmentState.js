import React, { Component } from 'react'
import pic01 from '../../src/assets/images/central-government.jpg'
import pic02 from '../../src/assets/images/up-gov.jpg'
import pic03 from '../../src/assets/images/hp-gov.jpg'
import pic04 from '../../src/assets/images/chandigarh.jpg'
import pic05 from '../../src/assets/images/jammu-and-kashmir.jpg'
import pic06 from '../../src/assets/images/andaman-and-nicobar.jpg'
import pic07 from '../../src/assets/images/lakshadweep.jpg'
import pic08 from '../../src/assets/images/puducherry.jpg'
import pic09 from '../../src/assets/images/ladakh.jpg'
import pic010 from '../../src/assets/images/dddp.jpg'
import pic11 from '../../src/assets/images/delhi-gov.png'
import Image from 'next/image';
import constant from 'constant'
import searchLoader from 'components/common/HeaderLoader/index'
import Loader from 'components/common/GovtLoader/Loader'
 
import GovernmentSearch from 'components/JobList/GovernmentSearch'

export default class GovernmentState extends Component {

   constructor(props){
        super(props);
        this.state = {

        }
    }

    
  render() {
    const list =this.props
    const count=this.props.count
    return (
        <React.Fragment>
           <main id="rg-main" className="rg-main rg-haslayout pt-0">
        <div className="rg-sectionspace rg-haslayout pt-0">
        {this.props.showLoader?<searchLoader/>:
          <GovernmentSearch/>}
         
          
          <div className='breadcrumbs-section'>
          <div className='container'>
             <div className='row'>
                 <div className='col-md-12'>
                      <div className='breadcrumbs-bx'>
                      {this.props.showLoader?<div class="comment br animate"></div>:
                        <p id="breadcrumbs"><span><span><a href="">Home</a> / <strong className="breadcrumb_last " style={{color:"#e81c28", fontWeight:'500'}} aria-current="page"> Government  Jobs  </strong></span></span></p>}
                      </div>
                 </div>
             </div>
          </div>  
          </div>
          <div className="rozgar-browseJobs">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  
                    <div className="brows-by-locations-bx">
                      <div className="by-locations-head">
                        {this.props.showLoader?<div class="comment br animate"></div>:
                        <h2 className="small_title">Browse Central Government Jobs</h2>}
                      </div>
                      {/* {  list.GovermentList&&list.GovermentList.map((i)=>{
                      if(i.STATE_UT=="1"){
                        return
                       ( */}
                      <div className="hoz-location-bx hoz-gov-location-bx">
                         
                              <ul>
                                {this.props.showLoader?
                              <Loader/>:
                              <li>
                            <a href={constant.component.GovernmentStatesJobs.url.replace(':url','central-government-jobs')}>
                              <div className="images-box-location">
                                <Image src={pic01} alt="img description" />
                              </div>
                              <div className='location-bx'>
                              <h5>Central Government Jobs</h5>
                              <p>Open Jobs ({this.props.count})</p> 
                              </div>
                            
                            </a>
                          </li>}
                          {this.props.showLoader?
                              <Loader/>:
                               list.GovermentList&&list.GovermentList.map((i)=>{
                           if(i.STATE_UT=="1"){
                            return(
                              
                              <li>
                                <a href={constant.component.GovernmentStatesJobs.url.replace(':url',i.URL)}>
                                  <div className="images-box-location">
                                    <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/city_images/${i.IMAGE}`} alt="img description" />
                                  </div>
                                  <div className='location-bx'>
                                  <h5>{i.STATE} </h5>
                                  <p>Open Jobs ({i.statejobpost})</p> 
                                  </div>
                                
                                </a>
                              </li>
                               )
                              }
                             })}
                            </ul>
                           
                      
                   
                      
                   
                      </div>
                      
                    </div>
                    <div className="brows-by-locations-bx">
                      <div className="by-locations-head">
                        <h2 className="small_title">Browse States Government Jobs</h2>
                      </div>
                      <div className="hoz-location-bx hoz-gov-location-bx">
                        <ul>
                        {this.props.showLoader?
                              <Loader/>: 
                              
                              list.GovermentList&&list.GovermentList.map((i)=>{
                           if(i.STATE_UT=="0"){
                            return(
                          <li>
                            <a href={constant.component.GovernmentStatesJobs.url.replace(':url',i.URL)}>
                              <div className="images-box-location">
                              <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/city_images/${i.IMAGE}`} alt="img description" />
                              </div>
                              <div className='location-bx'>
                              <h5>{i.STATE}</h5>
                              <p>Open Jobs ({i.statejobpost})</p> 
                              </div>
                            
                            </a>
                          </li>
                           )
                          }
                         })}
                        </ul>
                   
                      </div>
                    </div>
                   
                  
                  </div>
                </div>
              </div>
            </div>

    
        </div>
      </main>
        </React.Fragment>
    
    )
  }
}
