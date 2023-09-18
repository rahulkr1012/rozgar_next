import React, { Component } from 'react'
import constant from '../../constant'
import InternationalWorkEnquryRight from './InternationalWorkEnquryRight';
import workAus from 'src/assets/images/work-australia.jpg'
import Image from 'next/image';

export default class workinAustralia extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        document.title = constant.title.workinAustralia
    }
    render() {
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
                    <div className='breadcrumb-banner-area australia-work-bg'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='breadcrumb-text work-country'>
                                        <h1 className='text-center'>Work in Australia</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.workabroad.url}>International work Visas</a></li>
                                            <li><a href=''>Work in Australia</a></li>
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
                                        <div className='asto-images-bx'>
                                            <Image src={workAus} alt='Image' /></div>
                                        <h4>Change Your Life With An Australian Work Visa:</h4>

                                        <p>As one of the world’s most dynamic countries, Australia has an immense requirement for skilled talent. Make the most of this opportunity by applying for an Australian Work Visa. Having years of experience in Australian immigration processes, Rozgar.com is the perfect consultant to launch your career in Australia.</p>
                                        <h4>Why Work In Australia?</h4>
                                        <ul className='study-list-bx'>
                                            <li>Stable economy growing at 2.5% every year on average</li>
                                            <li>Job opportunities in multiple sectors</li>
                                            <li>High minimum wage & great savings opportunity</li>
                                            <li>Exceptional social benefits like free healthcare</li>
                                            <li>Beautiful cities with vibrant multicultural life</li>


                                        </ul>
                                        <p>When you work in Australia, you will enjoy basic rights and the same workplace protection rule as other local employees. All of this makes Australia an attractive destination to make a career.</p>
                                        <h4>Types of work visas:</h4>
                                        <p>The Australian government devised the General Skilled Migration program (Skillselect) in 2013 to replace the Australia skilled worker visas.</p>
                                        <p>The Skillselect is designed to assess the skills of applicants under a point-based system so that immigrants with the right skills can be selected. The applicants are given points under the following criteria:</p>
                                        <ul className='international-list-bx'>
                                            <li><span>Age:</span> Those between the ages of 25 and 32 score the most points while those above 45 do not gain any points.</li>
                                            <li><span>English language proficiency:</span> Applicants are required to take the IELTS test.  If they score 8 bands or more, you get 20 points.</li>
                                            <li><span>Skilled employment:</span> If you have experience in an occupation that is listed in the Skilled Occupations List you will get points based on the years of experience. 20 is the maximum points you can gain.</li>
                                            <li><span>Educational qualification:</span> To get points under this category, your qualification must be related to your nominated occupation. 20 points is the maximum you can score if you have a doctorate while a bachelor’s or master’s degree will give you 15 points.</li>
                                            <li><span>Australian qualifications:</span> You can get five points if you have an Australian qualification from an Australian educational institute.</li>
                                            <li>Regional study: You can gain an additional 5 points if you have lived and studied in regional Australia.</li>
                                            <li><span>Community language skills:</span> You will gain another 5 points if you have translator/ interpreter level skills in one of the country’s communities languages.</li>
                                            <li><span>Spouse/partner skills and qualifications:</span> If you have included your spouse/partner in the application and he/she is not an Australian resident/citizen, then their skills are eligible to be counted towards your total points. You will gain an additional five points if your spouse/partner must meet the basic requirements of the Australian General Skilled Migration</li>
                                            <li><span>Professional year:</span> You will stand to gain another 5 points if you have completed a Professional Year in Australia for a period of at least 12 months in the last four years from either ACS/CPA/CAANZ/IPA/Engineers Australia.  You must score a minimum of 65 points to qualify for a visa under the General Skilled Migrant Program</li>
                                            <li><span>Skilled Independent Visa:</span> You can be eligible for this visa if you have the necessary skills and qualifications for specific occupations that are listed in the Skilled Occupation List (SOL). This visa does not require the sponsorship of an employer. You can use the SkillSelect tool to find out if your skills are in demand.</li>
                                            <li><span>Employer Nomination Scheme:</span> Under this scheme, a permanent work visa is given to workers sponsored by their companies.</li>
                                            <li><span>TSS Visa (Temporary Skill Shortage):</span> Under this visa, individuals can work between two to four years depending on the employee’s requirement. Applicants should have a minimum of two years’ work experience and should be below 45 years. Companies taking employees on this visa must pay them the market salary.</li>

                                        </ul>


                                    </div>

                                </div>
                                {< InternationalWorkEnquryRight />}


                            </div>
                        </div>
                    </section>

                </main>
            </React.Fragment>
        )
    }
}
