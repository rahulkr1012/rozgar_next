import Head from 'next/head';
import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import { topPremiumFeaturedCompanyList } from '@/action/dashboard';
import { DesignationQuestionSearch, interviewByDesignation, InterviewQuestionDesignationByUrl } from '@/action/SkillsQuestionAction';
import constant from 'constant'
import dynamic from 'next/dynamic';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'
import Loader from 'components/Loader'
import { withRouter } from 'next/router';
import { capitalizeWords } from '@/utils';
const ByDesignations = dynamic(() => import('components/InterviewQuestions/ByDesignation'), { loading: () => <Loader />, ssr: false });

class ByDesignation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            list: undefined,
            PREMIUM_COMPANIES: [],
            path: undefined,
            loader: false,
            DESIGNATION_ID: '',
            DESIGNATION: '',
            Question_Id:''
        }
    }
    componentDidMount() {
        this.setState({ path: this.props.pathName })

        this.InterviewQuestionByUrl()
        this.TopPremiumFeaturedCompanyList()

    }

    InterviewByDesignation = (DESIGNATION_ID) => {
        this.setState({ loader: true })
        interviewByDesignation(DESIGNATION_ID).then((res) => {
            this.setState({ list: res.result, loader: false})
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
    //useless now
    onInputSearch = (value = "") => {
        const { DESIGNATION_ID } = this.props.location.state
        const modal = {
            DESIGNATION_ID: DESIGNATION_ID,
            KEYWORD: value,
        }
        DesignationQuestionSearch(modal).then((res) => {
            this.setState({ list: res.result })
        }).catch(err => {
            alert(err)
        })
    }
    //useless now
    InterviewQuestionByUrl = () => {
        const URL = this.props.url
        const d1 = URL.split('/designations/')
        const DesignationUrl = d1[1]
        InterviewQuestionDesignationByUrl(DesignationUrl).then((res) => {
            this.InterviewByDesignation(res.result[0].DESIGNATION_ID)
            this.setState({ DESIGNATION: res.result[0].DESIGNATION })
            this.setState({ DESIGNATION_ID: res.result[0].DESIGNATION_ID })
            document.title = constant.title.interviewQuestionByDesignation.replace(":Designation", res.result[0].DESIGNATION)
        }).catch((err) => {
            alert(err)
        })

    }
    render() {
        const { DESIGNATION, DESIGNATION_ID } = this.state
        const { PREMIUM_COMPANIES } = this.state
        const { list ,Question_Id} = this.state
        console.log(Question_Id,"Question_Id");
        // if (this.props.pathName !== this.state.path) {
        //     this.setState({ path: this.props.pathName })
        //     this.InterviewQuestionByUrl()
        //     this.TopPremiumFeaturedCompanyList()
        // }

          const title=`${ capitalizeWords(this.props.router.query.id.split("-")).join(
            " "
          )} Interview Questions - Rozgar.com`;




          const  description=`Read various interview questions for the designation ${capitalizeWords(this.props.router.query.id.split("-")).join(
            " "
          )} at Rozgar.com.Updated interview questions for the interview of ${capitalizeWords(this.props.router.query.id.split("-")).join(
            " "
          )} designation.`;


        return (
            <React.Fragment>
                 <FilteredHeader ud={this.props.ud} />
                <Head >


                    <title >{title}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={description} />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    {/* og meta tag */}
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    {/* Twitter Meta Tag */}
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

                <ByDesignations
                    PREMIUM_COMPANIES={PREMIUM_COMPANIES}
                    // history={this.props.history}
                    List={list}
                    DESIGNATION={DESIGNATION}
                    DESIGNATION_ID={DESIGNATION_ID}
                    onInputSearch={(value) => this.onInputSearch(value)}
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
                    </div>}
            </React.Fragment>
        )
    }
}




export async function getServerSideProps(
    { req, query, resolvedUrl }
) {
    let ud = getLoggedInUserData(req)
    let url = req.headers.host + resolvedUrl
    return {
        props: {
            ud: ud,
            pathName: resolvedUrl,
            url,
            query
        }
    }

}

export default withRouter(ByDesignation)
