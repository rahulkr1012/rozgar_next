import React, { Component } from 'react'
import InternationalWorkEnquryRight from 'components/workinAus/InternationalWorkEnquryRight'
import constant from '../../constant'
import workinMalaysia from 'src/assets/images/work-malaysia.jpg'
import Image from 'next/image';
export default class WorkinMalaysia extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        document.title = constant.title.workinMalaysia
    }
  render() {
    return (
      <React.Fragment>
           <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
            <div className='breadcrumb-banner-area work-in-malaysia-bg'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='breadcrumb-text work-country'>
                                <h1 className='text-center'>Work in Malaysia</h1>
                                <ol className='breadcrumb-list-bx'>
                                    <li><a href={constant.component.homepage.url}>Home</a></li>
                                    <li><a href={constant.component.workabroad.url}>International work Visas</a></li>
                                    <li><a href=''>Work in Malaysia</a></li>
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
                                <div className='asto-images-bx'><Image src={workinMalaysia} alt='Image' /></div>
                                <h4>Malaysia work permit</h4>
                            
                                <p>Malaysia is a popular location for international workers. There are many job options available, and the cost of living is reasonable. Malaysia boasts outstanding health care facilities and a large number of international schools.</p>
                                <p>Many international firms have their Asian headquarters in Malaysia. Malaysia attracts an increasing number of foreigners due to its diversified workforce and amicable integration of natives and expats. Aside from job prospects, Malaysian businesses provide competitive salaries and benefits to their employees, keeping them happy.</p>
                                <p>Before you wish to work in Malaysia as a foreign national, you must first find a Malaysian company ready to hire you. Then, on your behalf, your employer must apply for a Malaysia work permit.</p>
                                <p>After the application has been approved by the authorities in charge of awarding work permits to international employees you can begin working in Malaysia.</p>
                                <p>In order to work in Malaysia, you will need the Malaysia work permit.</p>
                                <p>International workers have access to three different types of Malaysia work visa. They are issued based on the profession and duration of work.</p>

                                <h4>Malaysia Employment Pass</h4>
                                <p>This Malaysia work permit visa is issued to highly qualified foreign nationals who are hired by a Malaysian company for technical or managerial positions.</p>
                                <p>Before you can receive this employment pass, the Malaysian employer has to get the approval of the relevant regulatory authority to hire the foreign national.</p>
                                <p>The duration of this work permit is between 1 to 5 years and can be renewed on a case-to-case basis.</p>
                                <h4>Malaysia Temporary Employment Pass</h4>
                                <p>This pass is issued for an employment duration of two years and has two categories.</p>
                            
                            
                                <ul className='study-list-bx'>
                                    <li>Foreign Worker Temporary Employment Pass- This category allows the foreign worker to work in the following industries- Manufacturing, Construction, Plantation, Agriculture and Services. Citizens of approved countries can also receive this type of Pass.</li>
                                    <li>Foreign Domestic Helper (FDH) Temporary Employment Pass- This category is issued to female workers from approved countries. The foreign worker has to work in the home of her employer who may have young children or elderly parents who need care.</li>
                                

                                </ul>

                                <h4>The Professional Visit Pass</h4>
                                <p>This pass is issued to foreign nationals who are required to come to Malaysia on temporary work (up to 12 months).</p>
                                <p>Eligibility requirements</p>
                                <p></p>
                                <p>The requirements for acquiring a Malaysia work visa vary depending on the type of work permit you are seeking.</p>
                                <p>For the Employment Pass, you must have the necessary qualifications (diplomas, certifications) as well as suitable work experience for the position you will be filling. A monthly salary of at least RM3,000 per month, and up to RM10,000 per month in some categories, is required.</p>
                                <p>Requirements for the Temporary Employment Pass (TEP) vary depending on your country and age. You must, for example, be between the ages of 18 and 45 and a citizen of one of the approved nations. You must also be a woman between the ages of 21 and 45 to work as a Foreign Domestic Helper. There are no specific qualifications required for the TEP.</p>
                                <p>You can only work in Malaysia for a limited time with a Professional Visit Pass, and you must be employed by a non-Malaysian company. As a result, international artists, film crews, religious workers, government employees, students undergoing training, guest lecturers, and volunteers are all eligible for this form of work permit. In this instance, you will require a sponsor rather than an employer in Malaysia.</p>
                                <h4>Application process</h4>
                                <p>Your employer is responsible for obtaining a Malaysia work permit on your behalf. They must file an application with Malaysia’s Immigration Department. If you are a citizen from a visa required country, you may go to Malaysia or apply for a visa with reference once the application has been approved by the Immigration Department.</p>
                                <h4>Documents required</h4>
                            
                                <ul className='study-list-bx'>
                                <li>Duly filled application form.</li>
                                    <li>Valid passport.</li>
                                    <li>Copies of certificates. Proving educational qualifications.</li>
                                    <li>Proof of previous employment.</li>
                                    <li>2 color photographs.</li>
                                    <li>Details about the work that will be performed by the applicant in Malaysia.</li>
                                    <li>Employment letter from company in Malaysia.</li>

                                </ul>

                                <h4>How can Rozgar help you?</h4>
                            
                            
                                <p>Rozgar can assist you with:</p>
                                <p>Immigration documents checklist</p>
                                <p>Guidance in application processing</p>
                                <p>Forms, documentation & application filing</p>
                                <p>Updates & follow up</p>
                                <p>Talk to us today to understand whether you are eligible for the<strong> Malaysia work visa. </strong></p>
                            

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
