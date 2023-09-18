import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import { CompanyQuestionSearch, interviewByCompany } from '@/action/CompanyQuestionAction';
import { topPremiumFeaturedCompanyList } from '@/action/dashboard';
import FilteredHeader from 'components/Filtered_Header'
import { InterviewQuestionCompanyByUrl } from '@/action/SkillsQuestionAction';
import constant from 'constant'
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'
import { capitalizeWords } from '@/utils';
import { withRouter } from 'next/router';
const ByCompanies = dynamic( () => import('components/InterviewQuestions/ByCompany'), { loading:()=><Loader /> ,   ssr: false });

class ByCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            PREMIUM_COMPANIES: props.PREMIUM_COMPANIES,
            path: props.pathName,
            loader: false,
            CompanyId: props.CompanyId
        }
    }
     
    componentDidMount() {
    }

    InterviewByCompany = (EMPLOYER_ID) => {
        this.setState({ loader: true })
        interviewByCompany(EMPLOYER_ID).then((res) => {
            this.setState({ list: res.result, loader: false })
        }).catch((err) => {
            alert(err);
        })
    }

    TopPremiumFeaturedCompanyList = () => {
        topPremiumFeaturedCompanyList().then(res => {
            if (res.status) {
                this.setState({ PREMIUM_COMPANIES: res.result.premium })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }



    onInputSearch = (value = "") => {
        this.setState({ loader: true })
        const EMPLOYER_ID = this.state?.CompanyId
        const modal = {
            EMPLOYER_ID: EMPLOYER_ID,
            KEYWORD: value,
        }
        CompanyQuestionSearch(modal).then((res) => {
            if (res.result) {
                this.setState({ loader: false })
            }
            this.setState({ list: res.result })
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        const { PREMIUM_COMPANIES, list } = this.state
        console.log(list,"listcompany");
        const title=`Interview Question By Company ${ capitalizeWords(this.props.router.query.id.split("-")).join(
            " "
          )} `;
          const  description=`Read  ${capitalizeWords(this.props.router.query.id.split("-")).join(
            " "
          )} Interview Questions at Rozgar.com. Interview questions for the company ${capitalizeWords(this.props.router.query.id.split("-")).join(
            " "
          )}`;
         
         
        return (
            <React.Fragment>
                <Head>
                    <title >{title}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={description} />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                </Head>

                <FilteredHeader ud={this.props.ud} />

                
                <ByCompanies
                    PREMIUM_COMPANIES={PREMIUM_COMPANIES}
                    List={list}
                    EMPLOYER_ID={this.state.CompanyId}
                />
                 
                {this.state.loader &&
                    <div style={{
                        position: "fixed",
                        zIndex: "999",
                        left: "0",
                        top: " 0",
                        width: " 100%",
                        height: " 100%",
                        overflow: "auto",
                        padding: "210px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}>
                        <LoadingOverlay
                            active={true}
                            spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                        >
                        </LoadingOverlay>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(ByCompany)

export async function getServerSideProps(
    { req, query, resolvedUrl }
    // context
) {
     
    
    let ud = getLoggedInUserData(req)
    let url = req.headers.host + resolvedUrl
    const InterviewQuestionCompanyByUrlRes = await InterviewQuestionCompanyByUrl(query.id)
    let CompanyId = InterviewQuestionCompanyByUrlRes.result
    const interviewByCompanyRes = await interviewByCompany(InterviewQuestionCompanyByUrlRes.result[0].EMPLOYER_ID)
    let list = interviewByCompanyRes.result
    let topPremiumFeaturedCompanyListRes = await topPremiumFeaturedCompanyList()
    let PREMIUM_COMPANIES = topPremiumFeaturedCompanyListRes.result.premium

    return {
        props: {
            ud: ud,
            CompanyId: CompanyId,
            list: list,
            PREMIUM_COMPANIES: PREMIUM_COMPANIES,
            pathName: resolvedUrl,
            url
        }
    }

}
