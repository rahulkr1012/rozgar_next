import React, { Component } from 'react'
import InternationalWorkEnquryRight from 'components/workinAus/InternationalWorkEnquryRight'
import constant from '../../constant'
import workinIreland from 'src/assets/images/work-ireland.jpg'
import Image from 'next/image';

export default class WorkinIreland extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        document.title = constant.title.workinIreland
    }
  render() {
    return (
         <React.Fragment>
             <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
        <div className='breadcrumb-banner-area ireland-work-bg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text work-country'>
                            <h1 className='text-center'>Work in Ireland</h1>
                            <ol className='breadcrumb-list-bx'>
                                <li><a href={constant.component.homepage.url}>Home</a></li>
                                <li><a href={constant.component.workabroad.url}>International work Visas</a></li>
                                <li><a href=''>Work in Ireland</a></li>
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
                            <div className='asto-images-bx'><Image src={workinIreland} alt='Image' /></div>
                            <h4>Work in Ireland</h4>
                            
                            <p>Ireland is a popular destination for persons looking for work outside of their home country. Working and residing in Ireland also entitles you to free European Union membership. Another advantage is that after five years in Ireland, you can apply for citizenship.</p>
                            <h4>Work visa for Ireland</h4>
                            <p>If you want to work in Ireland, you must be aware of the visa requirements. If you are from a non-EU nation, you’ll need a work permit before you can work in Ireland. Work permits are divided into two categories:</p>
                            <h5>1.Ireland General Employment Permit</h5>
                            <h5>2.Ireland Critical Skills Employment Permit</h5>
                            <h4>Ireland Critical Skills Employment Work Permit Visa</h4>
                            <p>Critical Skills Employment Permit is issued for an initial period of two years, after which it can normally be renewed indefinitely. An initiative by department of jobs, it provides excellent opportunity for qualified professionals. Ireland Green Card is your pathway to settle in the European Union. It allows you to bring your family in as dependents.</p>

                            <h4>Eligibility</h4>
                           
                             <ul className='study-list-bx'>
                                <li>Offer Letter from employer</li>
                                <li>Occupations with a minimum annual remuneration of €30,</li>
                                <li>A relevant degree qualification or higher is required.</li>
                                <li>Job offer to be valid for 2 years</li>
                               

                             </ul>
                             <h4>IRELAND GENERAL EMPLOYMENT PERMIT</h4>
                             <p>This permit allows you to work in Ireland for a minimum of 30,000 Euros per year. Before applying for the visa, you must have a job offer. This visa is available to you or your company. At the very least, your job should endure two years. To apply for this visa, you must have a degree that is relevant to the employment for which you were chosen.</p>
                             <p>This visa is good for two years and can be extended for another three years. After five years on this work permit, you can apply for long-term residency in the country.</p>

                             <h4>Documents for application</h4>
                             <p>A certified copy of your passport.</p>
                             <p>Passport-size photo that meets Ireland’s photo criteria.</p>
                             <p>A copy of the employment contract signed by you and your employer.</p>
                             <p>If you are a resident of Ireland at the time of application, a copy of your registered immigration stamp.</p>
                             <p>A copy of the IDA/Enterprise Ireland Letter of Support, if appropriate.</p>
                             <p> Information about your job, including the company’s registration number, address, and name, as well as certificates from recognized organizations.</p>
                             <p>Job specifics such as compensation, job responsibilities, tasks, and length of employment.</p>
                           


                             <h4>Application process</h4>
                            <p>An application for an Irish work visa can be submitted by you (the overseas employee) or your firm.</p>
                            <p>Your home country employer can also file the application on your behalf if you transfer from a foreign company to its Irish branch (intra-company transfer).</p>
                            <p>You (or your employer) must submit your application for an Ireland work permit through EPOS, the Employment Permits Online System.</p>
   
                            <h4>How Rozgar Can Help?</h4>
                            <p>We can help you with document checklist, application process, assist in filling the application with the embassy and follow-ups.</p>
                         
                            <p>Treat your visa petition as an investment for the future – yours and your children. Apply for it now, watch it mature later. Avail of the benefits all your life.</p>
                         
                            <p>So, why should you sign up now, because you need to strike when the iron is hot!</p>



                           

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
