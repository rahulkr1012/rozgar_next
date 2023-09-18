import React, { Component } from 'react'
import constant from '../../constant'

export default class InternationalWorkEnquryRight extends Component {
  render() {
    return (
         <React.Fragment>
            <div className='col-md-4'>
                                <div className='quik-right-contact-bx'>
                                    <h4>Get in touch</h4>
                                    <form>
                                    <div className='row'>   
                                    <div className='form-group col-md-12 '>
                                        
                                            <input className='form-control' type='text' placeholder='First Name' />
                                      </div>
                                      <div className='form-group col-md-12 '>
                                      
                                            <input className='form-control' type='text' placeholder='Last Name' />
                                      </div>
                                     </div>
                                     <div className='row'>   
                                    <div className='form-group col-md-12 '>
                                        
                                            <input className='form-control' type='text' placeholder='Enter Your Contact Number' />
                                      </div>
                                      <div className='form-group col-md-12 '>
                                      
                                            <input className='form-control' type='text' placeholder='Enter Your Email' />
                                      </div>
                                     </div>
                                     <div className='row'> 
                                   
                                      <div className='form-group col-md-12 '>
                                              
                                                <select>
                                                   <option>Preferred Work Destination</option>
                                                   <option value='Australia'>Australia</option>
                                                   <option value='Austria'>Austria</option>
                                                   <option value='The USA'>The USA</option>
                                                   <option value='The UK'>The UK</option>
                                                   <option value='Canada'>Canada</option>
                                                   <option value='Malaysia'>Malaysia</option>
                                                   <option value='Hong Kong'>Hong Kong</option>
                                                   <option value='Ireland'>Ireland</option>
                                                   <option value='South Africa'>South Africa</option>
                                                   <option value='UAE'>UAE</option>
                                                   <option value='JAPAN'>JAPAN</option>
                                                   <option value='Belgium'>Belgium</option>
                                                   <option value='Switzerland'>Switzerland</option>
                                                   <option value='Finland'>Finland</option>
                                                   <option value='Germany'>Germany</option>
                                                   <option value='New Zealand'>New Zealand</option>
                                                </select>
                                            </div>
                                           </div>
                                          
                                           <div className='row'>
                                            <div className='form-group col-md-12'>
                                                    <button type='submit'>Submit</button>
                                            </div>

                                           </div>
                                         
                                            
                                          
                                           
                                            
                                 </form>

                                </div>
                                <div className='what-we-offer'>
                            <h3>Top Work Favourite  Destination</h3>
                            <ul id='style-3' className='list-sidebar-right'>
                                <li><a href={constant.component.workinAustralia.url}><i className='fa fa-angle-double-right'></i> Work in Australia</a></li>
                                <li><a href={constant.component.workinCanada.url}><i className='fa fa-angle-double-right'></i> Work in Canada</a> </li>
                                <li><a href={constant.component.workinUK.url}><i className='fa fa-angle-double-right'></i> Work in UK</a></li>
                                <li><a href={constant.component.workinUSA.url}><i className='fa fa-angle-double-right'></i> Work in USA</a></li>
                                <li><a href={constant.component.workinMalaysia.url}><i className='fa fa-angle-double-right'></i> Work in Malaysia</a></li>
                                <li><a href={constant.component.workinIreland.url}><i className='fa fa-angle-double-right'></i> Work in Ireland</a></li>
                                <li><a href={constant.component.workinNewZealand.url}><i className='fa fa-angle-double-right'></i> Work in New Zealand</a></li>
                                <li><a href={constant.component.workinSingapore.url}><i className='fa fa-angle-double-right'></i> Work in Singapore </a></li>
                               
                                
                            </ul>

                        </div>

                    </div>
         </React.Fragment>
    )
  }
}
