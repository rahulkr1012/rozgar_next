import React, { Component } from 'react'
import constant from '../../constant'
import InternationalWorkEnquryRight from 'components/workinAus/InternationalWorkEnquryRight';
import workUk from 'src/assets/images/work-uk.jpg'
import Image from 'next/image';



export default class WorkinUK extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        document.title = constant.title.workinUK
    }
  render() {
    return (
      <React.Fragment>
               <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
        <div className='breadcrumb-banner-area uk-work-bg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text work-country'>
                            <h1 className='text-center'>Work & Settle In The UK</h1>
                            <ol className='breadcrumb-list-bx'>
                                <li><a href={constant.component.homepage.url}>Home</a></li>
                                <li><a href={constant.component.workabroad.url}>International work Visas</a></li>
                                <li><a href=''>Work & Settle In The UK</a></li>
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
                            <div className='asto-images-bx'><Image src={workUk} alt='Image' /></div>
                            <h4>Work & Settle In The UK</h4>
                            
                            <p>In order to retain its competitive edge, the UK invites skilled professionals to work in the UK under the Tier 2 visa program. Under this program, workers whose occupations are listed on the Tier 2 Shortage Occupation List can apply to work in the UK on a long term basis. Among the popular professions on the list are IT, finance, teaching, healthcare and engineering. Rozgar can help you take advantage of this talent shortage in the UK and position yourself to gain a work permit to the UK.</p>
                            <p>If skilled workers must come to the UK, they need to have the Skilled Worker visa.(formerly the Tier 2 visa). You can apply for this visa if you have been offered a skilled job in the UK. The salary requirements for this visa is £25,600, or the specific salary requirement for the occupation or the ‘going rate’. </p>
                            <h4>Top IT skills in demand in the UK</h4>
                            <p>With the ever-changing tech world, the demand for IT and Tech skills has become invaluable to companies following the trends. Below is the list of top skills in demand in the UK. </p>
                            <h4>Programming Languages</h4>
                           
                             <ul className='study-list-bx'>
                                <li>C++</li>
                                <li>Python</li>
                                <li>JavaScript</li>
                                <li>SQL</li>
                                <li>Java</li>
                               

                             </ul>
                             <p>Java Script is used for Front End Technologies. Many businesses use these languages to streamline processes across systems.</p>
                             <h4>DevOps</h4>
                             <p>It is one of the fastest-growing In-Demand digital skill in the UK.</p>
                             <h4>Artificial Intelligence / Machine Learning</h4>
                            <p>This is also an In-Demand IT Skill in the UK. This skill includes jobs like:  </p>

                            <ul className='study-list-bx'>
                                <li>Data Architect</li>
                                <li>Data Warehouse Developer</li>
                                <li>Data Analyst</li>
                               

                             </ul>
                            <h4>Cloud Computing</h4>
                            <p>Because of the need for data storage and computing power, the cloud computing market has become a popular business solution and a fast-growing industry in recent years.</p>
                            <h4>Cybersecurity</h4>
                            <p>The rise of cybersecurity attacks in the UK in recent years has made this IT skill one of the most in-demand digital skills in the UK.</p>
                            <h4>CRM</h4>
                            <p>The 14% increase in CRM skills since last year has made up more than 7.2 million professionals globally.</p>



                            <h4>UK Skilled Worker Visa Details</h4>
                            <p>The Skilled Worker visa allows skilled professionals to build their professional career in the UK. The duration for stay as per the U.K. Skilled Worker is for a maximum period of 5 years The Skilled Worker Visa is a points-based visa and applicants must score a minimum of 70 points for their application to be considered. The points are awarded based on: </p>
                            <ul className='study-list-bx'>
                                <li>Whether you have a Certificate of Sponsorship from an employer</li>
                                <li>Whether you are receiving an appropriate salary</li>
                                <li>Your English communication skills</li>
                                <li>The maintenance funds you hold</li>
                              
                             </ul>
                             <p>If you satisfy these parameters you can then apply for the Skilled Worker Visa.</p>
                             <p>The Tier 2 visa is subdivided to allow for the following professionals: </p>
                            
                             <ul className='study-list-bx'>
                                <li>Tier 2 General Visa: For workers who have a job offer in the UK and whose profession appears on the shortage occupation list. This has been replaced by the Skilled Worker visa</li>
                                <li>Tier 2 Intra-Company Transfer Visa: For workers of corporations transferring to the UK </li>
                                <li>Tier 2 Minister of Religion Visa: For ministers of religions within a religious organisation </li>
                                <li>Tier 2 Sportsperson Visa: For coaches and sportspersons </li>
                              

                             </ul>
                             <p>If you have successfully received a Skilled Worker visa you can: </p>
                             <ul className='study-list-bx'>
                                <li>Study in the UK</li>
                                <li>Bring family members to the UK</li>
                                <li>Travel to and from the UK</li>
                              

                             </ul>


                             <h4>Processing time</h4>
                             <p>You can apply for this visa three months before you begin working in the UK. The starting date will be mentioned in the certificate of sponsorship you will receive from your UK employer.</p>
                             <p>You will get the decision on your visa within three weeks of your application. With the UK government including more occupations in the Shortage Occupation List, the processing time is expected to be reduced for many applicants.</p>
                             <h4>HOW LONG CAN ONE STAY ON SKILLED WORKER VISA?</h4>



                             <p>You can stay for a maximum of 5 years on this visa. </p>
                             <p>The duration of work visa depends on the length of your job contract. If you have not exceeded the maximum duration for your visa type, you can extend your stay. You will need to apply for an extension, either online or at a premium service center for UK visas.</p>
                             <p>You can stay for a maximum of 5 years and 14 days on the Tier 2 visa or the duration mentioned on your certificate of sponsorship (plus 1 month) whichever duration is shorter.</p>
                             <h4>Documents Required</h4>
                             <p>The documentation required for the UK Tier 2 Visa includes:</p>
                             <ul className='study-list-bx'>
                                <li>Having a valid Certificate of Sponsorship from an employer</li>
                                <li>Salary and financial details</li>
                                <li>Current passport and travel history</li>
                                <li>Certifications proving your English skills</li>
                                <li>Criminal record certificate</li>
                                <li>Other supporting documents</li>
                              
                               

                             </ul>
                            <h5>SKILLED WORKER DEPENDENT VISA</h5>
                            
                            <p>The Skilled Worker dependent visa is for children and partners of those who have come to the country on a Skilled Worker visa or have applied for one. </p>
                            <h5>The following persons qualify for a Skilled Worker dependent visa: </h5>
                            <ul className='international-list-bx'>
                                <li>Spouse </li>
                                <li>Unmarried or same-sex partner </li>
                                <li>Children under the age of 18 at the time of application </li>
                                <li>Children over the age of 18 who are dependents </li>
                                <li>The partnership between spouses and partners should be genuine and they should plan to live together for the duration of stay in the country. </li>
                                <li>Maintenance funds: </li>
                                <li>Skilled Worker dependents have no recourse to public funds  as such, in their application they must prove access to adequate financial means for the period of stay in the UK and if there are dependents, they must demonstrate an additional £ 630 available for each dependent. </li>
                                <li>Age: </li>
                                <li>The principal applicant and dependent must be at least 18 on the date of arrival in the United Kingdom, or when the visa is issued. </li>
                                <li>Other requirements: </li>
                                <li>You must not be a previous holder of a UK visa for students, short-term study visa on or after April 2015 or have been given leave on or after April 2015 as a parent of a Tier 4 student (child). </li>
                                <li>Furthermore, you will have to qualify the general grounds for admission. You must have a clear history of immigration, with no case of overstaying. When your spouse or relative’s visa expires, you must have no intention to stay in the UK. </li>
                                <li>Application process: </li>
                                <li>Skilled Worker dependent visa applications may be made with the main Skilled Worker visa application either simultaneously or later. </li>
                                <li>Regardless of when the applications are submitted, successful applicants will be given leave in accordance with the time of leave of the principal visa applicant. </li>
                                <li>The approval process can vary according to where the approval for a Tier 2 based visa is made. </li>
                                <li>As a holder of Skilled Worker dependent visas, you can: </li>
                                <li>Remain in the UK for the same period as the main Skilled Worker visa holder </li>
                                <li>Work, with limited exceptions </li>
                                <li>Study or take a postgraduate course, under certain conditions </li>
                                <li>Apply to extend your visa in compliance with the principal applicant, provided that you continue to meet the eligibility conditions. When the key visa holder has left the UK, you will not be eligible to apply for an extension. </li>
                                <li>You cannot access public funds, or work as a doctor in training, or as a dentist, or as a sports instructor for professionals </li>
                                <li>Tier 2 visa applications are evaluated on the basis of the UK’s point-based system. One must have at least 70 points to qualify for the visa. You can score 30 points with a job offer with an employer sponsorship certificate. You can score another 30 points if your occupation finds a place in the Skills Shortage list. With these 60 points it will be relatively easy to get the remaining points to qualify.</li>
                                <li>Finding a UK employer who can sponsor a Tier 2 visa</li>
                                <li>It will be easy to find one in the ‘Register of Sponsors Licensed Under the Points-based System’ which is available to the public. This contains a list of all the employers who have the permission to sponsor international employees.</li>
                               
                                
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
