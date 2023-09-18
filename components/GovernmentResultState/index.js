import React, { Component, Fragment } from 'react'
import Image from 'next/image';
import dynamic from 'next/dynamic' 
import govResultimg from 'src/assets/images/gov-result-bg.jpg'
import pic01 from '../../src/assets/images/central-government.jpg'
import pic02 from '../../src/assets/images/andhra-pradesh.png'
import pic03 from '../../src/assets/images/arunachal-pradesh.png'
import pic04 from '../../src/assets/images/assam.png'
import pic05 from '../../src/assets/images/bihar.png'
import pic06 from '../../src/assets/images/chandigarh.jpg'
import pic07 from '../../src/assets/images/goa.png'
import pic08 from '../../src/assets/images/gujarat.png'
import pic09 from '../../src/assets/images/haryana.png'
import constant from 'constant';
import Link from 'next/link';
import Loader from 'components/common/GovtLoader/Loader'


let govResultSec = {

  backgroundImage: `url('${govResultimg.src}')`,

}

export default class GovernmentResultState extends Component {
  render() {
    const list =this.props
    const count=this.props.count
    return (
       <Fragment>
            <main id="rg-main" className="rg-main rg-haslayout pt-0">z
               <div className="rg-sectionspace rg-haslayout pt-0">
                  <div className={`gov-result-sec`}  style={
                        govResultSec
                      }
        
                    >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Government Jobs Results</h4>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="breadcrumbs-section">
                        <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                  <div className="breadcrumbs-bx">
                                    <p id="breadcrumbs"><span><span><Link href="">Home</Link> /  <strong className="breadcrumb_last" aria-current="page"> Government Jobs Results</strong></span></span></p>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className={`rozgar-browseJobs`}>
                        <div className={`container`}>
                            <div className={`row`}>
                                <div className={`col-md-12`}>
                                  
                                    <div className={`brows-by-locations-bx`}>
                                    {this.props.showLoader?<Loader/>:
                                      <div>
                                         <div className={`by-locations-head`}>
                                            <h2 class={`small_title`}>Central Government Jobs Results</h2>
                                         </div>
                                         <div className={`hoz-location-bx hoz-gov-location-bx`}>

                                            <ul>
                                                <li>
                                                    <Link href={constant.component.GovernmentResult.url.replace(':url','central-government-result')}>
                                                        <div className={`images-box-location`}>
                                                            <Image src={pic01} />
                                                        </div>
                                                        <div className={`location-bx`}>
                                                            <h5>Central Government Jobs</h5>
                                                            <Link href={constant.component.GovernmentResult.url.replace(':url', 'central-government-result' )}>View result</Link>
                                                            
                                                        </div>
                                                    </Link>
                                                </li>

                                                { list.GovermentList&&list.GovermentList.map((i)=>{
                                                    if(i.STATE_UT=="1"){
                                                     return(
                                                       
                                                       <li>
                                                         <a href={constant.component.GovernmentResult.url.replace(':url'  , i.URL  )} >
                                                           <div className="images-box-location">
                                                             <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/city_images/${i.IMAGE}`} alt="img description" />
                                                           </div>
                                                           <div className='location-bx'>
                                                           <h5>{i.STATE} </h5>
                                                           <Link href={constant.component.GovernmentResult.url.replace(':url'  , i.URL  )}>View result</Link>
                                                           </div>
                                                         
                                                         </a>
                                                       </li>
                                                        )
                                                       }
                                                      })}

                                                
                                            </ul>
                                         </div>
                                         </div>}
                                    </div>
                                    <div className={`brows-by-locations-bx`}>
                                    {this.props.showLoader?<Loader/>:
                                        <div>
                                         <div className={`by-locations-head`}>
                                            <h2 class={`small_title`}>Latest States Government Jobs Results</h2>
                                         </div>
                                         <div className={`hoz-location-bx hoz-gov-location-bx`}>

                                            <ul>
                                                
                                                { list.GovermentList&&list.GovermentList.map((i)=>{
                                                    if(i.STATE_UT=="0"){
                                                     return(
                                                   <li>
                                                     <a href={constant.component.GovernmentResult.url.replace(':url'  , i.URL  )}>
                                                       <div className="images-box-location">
                                                       <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/city_images/${i.IMAGE}`} alt="img description" />
                                                       </div>
                                                       <div className='location-bx'>
                                                       <h5>{i.STATE}</h5>
                                                       <Link href={constant.component.GovernmentResult.url.replace(':url'  , i.URL  )}>View result</Link>
                                                       </div>
                                                     
                                                     </a>
                                                   </li>
                                                    )
                                                   }
                                                  })}
                                            </ul>
                                         </div></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

               </div>
            </main>
       </Fragment>
    )
  }
}
