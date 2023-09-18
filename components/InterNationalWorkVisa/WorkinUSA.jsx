import React, { Component } from 'react'
import constant from '../../constant'
import InternationalWorkEnquryRight from 'components/workinAus/InternationalWorkEnquryRight';
import workusa  from 'src/assets/images/work-usa.jpg'
import Image from 'next/image';

export default class WorkinUSA extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
      document.title = constant.title.workinUSA
    }
  render() {
    return (
         <React.Fragment>
                  <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
        <div className='breadcrumb-banner-area usa-work-bg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text work-country'>
                            <h1 className='text-center'>Work In The US As A Specialty Worker</h1>
                            <ol className='breadcrumb-list-bx'>
                                <li><a href={constant.component.homepage.url}>Home</a></li>
                                <li><a href={constant.component.workabroad.url}>International work Visas</a></li>
                                <li><a href=''>Work In The US As A Specialty Worker</a></li>
                            </ol>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className='main-section-box '>
            <div className='container'>
                <div className='row'>

                    <div className='col-md-8'>
                        <div className='content-main-box'>
                            <div className='asto-images-bx'><Image src={workusa} alt='Image' /></div>
                            <h4>Work In The US As A Specialty Worker:</h4>
                            
                            <p>The US H1B Visa is one of the most popular ways to work in the US. It is a visa that must be applied for by an employer on behalf of a specialist employee. Since the visa is granted to specialists, typically applicants hold at least a Bachelor’s degree and are from fields such as IT, finance, architecture, medicine, science etc. Rozgar helps employers with filing for H1B petitions for their employees. We also help employees from across the world get hired by companies likely to sponsor them for an H1B visa.</p>
                            <h4>US H1B Visa Details:</h4>
                            <p>The H1B Visa is one of the most competitive visas to apply for. Due to there being an annual visa cap, there is a huge demand from US employers applying for this visa. Additionally, since it is a route to a Green Card, it is one of the best visas to apply to work in the US.</p>
                            <h5>Under the H1B, successful petitioners can:</h5>
                           
                             <ul className='study-list-bx'>
                                <li>Live and work in the US</li>
                                <li>Extend the stay in the US</li>
                                <li>Change employers during H-1B status</li>
                                <li>Stay with their dependent spouse & children (aged under 21) in the US</li>
                              
                             </ul>
                             <h4>VALIDITY OF THE VISA</h4>
                            

                            <ul className='study-list-bx'>
                                <li>Visa has a validity of three years with the option to extend it up to a maximum of six years.</li>
                                <li>Once the validity is over, a foreign worker must either leave the U.S. or obtain a different visa.</li>
                                <li>If he does not comply, he can lose his legal status and can even be deported.</li>
                               

                             </ul>
                            <h4>Documents Required:</h4>
                            <p>The H1B is a point based visa system and you need a minimum of 12 points for your application to be assessed. You must have:</p>
                            <ul className='study-list-bx'>
                                <li>A Bachelors or Masters degree from the US (or an equivalent in your country)</li>
                                <li>Or 12 years work experience</li>
                                <li>Or a mix of education and work experience</li>
                               
                                <p>You are awarded points as follows:</p>
                                <li>3 points for every 1 year of college studies</li>
                                <li>1 point for every 1 year of work experience</li>
                              
                             </ul>

                            <p>Once you score a minimum of 12 points, your H1B petition can then be prepared.</p>

                            <h4>H1B visa cost: </h4>
                            <p>Standard H1B Filing Fee is currently – $460.The standard H1B filing fee is for the 1-129 petition.</p>
                            
                            <p>H1B visa base filing fee is set to increase by 21% from $460 USD to $555. The proposed fee increase will be effective from October 2nd, 2020.</p>
                            <p>The fee can either be paid electronically as a bank transfer or in cash at a specified bank that has branches across India. Next, create a profile on the US Visa Service website and select the scheduled appointment option to ensure the correct amount is paid and the appointment is scheduled in a timely manner.</p>
                            <p>On the payment confirmation screen, you will be presented with payment options and further details of how to initiate payment. The fee is good for a year from the date of payment. You must take an appointment within one year for your visa interview.</p>
                            <h4>H4 VISA:</h4>
                            <p>An H4 visa is a non-immigrant dependent visa. The visa does not grant you permanent residency, but it gives you the right to live, study, and work in the US.</p>
                            <h5>Who is eligible?</h5>
                            <ul className='study-list-bx'>
                                <li>Spouse of the H type visa holder</li>
                                <li>Children under the age of 21 whose parent is an H visa holder</li>
                               
                              
                             </ul>
                            <p>The validity of the H4 visa</p>
                            <p>The validity of the visa is dependent on the visa of the sponsor who is also called the principal applicant.</p>
                            <p>The visa is usually sponsored by the spouse or parent having the H type visa. The H4 visa becomes invalid when the visa of the sponsor expires.</p>
                            <p> Privileges of the H4 visa</p>



                            <ul className='study-list-bx'>
                                <li>You can get a driver’s license</li>
                                <li>You have opportunities to study in the US</li>
                                <li>You qualify for financial services, such as banking and an H4 visa loan</li>
                              
                             </ul>
                             <p> Work permission for the H4 visa holder </p>
                            
                             <ul className='study-list-bx'>
                                <li>The holder of the H4 visa may work part-time, full-time or not at all.</li>
                                <li>The H4 visa holder is permitted to start any form of business.</li>
                                <li>The holder of the H4 visa may continue to be eligible for EAD even if he does not seek employment. </li>
                              

                             </ul>
                             <p>Documents required for application</p>
                             <ul className='study-list-bx'>
                                <li >US visa interview appointment letter</li>
                                <li>A valid passport</li>
                                <li>Copy of the primary visa holder’s passport</li>
                                <li>Photograph of the primary visa holder and applicant together</li>
                                <li>Passport-sized photograph of the applicant</li>
                                <li>Confirmation page of the online DS-160 form</li>
                                <li>Visa fees receipt from the relevant bank</li>
                                <li>A copy of the primary visa holder’s form I-797</li>
                                <li>A letter from the primary visa holder’s employer stating the nature of the relationship between the primary visa holder and employer</li>
                                <li>Pay stubs from the primary visa holder’s current place of work</li>
                                <li>Original marriage certificate</li>
                                <li>Original birth certificates of children</li>
                              

                             </ul>



                        </div>

                    </div>
                    {<InternationalWorkEnquryRight/>}
                   
                    
                 
                </div>
            </div>
        </section>
        
    </main>
         </React.Fragment>
    )
  }
}
