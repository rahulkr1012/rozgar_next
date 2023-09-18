import { companylist, nonregularcompanylist } from '@/action/companyAction';
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from "next/dynamic";
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const CompanyList = dynamic(() => import("components/company_list/CompanyList"), {
    loading: () => <Loader />,
    ssr: true,
});
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            COMPANY_LIST: undefined,
            COUNT: 0,
            page: 1,
            filterdata: {
                LOCATION: [],
                CATEGORY: [],
                COMPANY_TYPE: []
            },
            KEYWORD: '',
            ud: this.props.ud
        }
    }
    componentDidMount() {
        this.list(this.state.page, this.state.filterdata)

    }

    list = (page, data) => {

        nonregularcompanylist({
            page: page,
            filter: data
        }).then(res => {
            if (res.status) {
                this.setState({ COMPANY_LIST: res.result.list, COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }
    filterData = (data) => {
        this.list(1, data)
    }

    onSearch = (page, filter, input) => {
        this.setState({ KEYWORD: input })
        companylist({
            page: page,
            KEYWORD: input,
            filter: filter
        }).then(res => {

            if (res.status) {
                this.setState({ COMPANY_LIST: res.result.list, COUNT: res.result.count })
            }
            else {
                console.log(res.error)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const { COMPANY_LIST, COUNT } = this.state

        return (
            <React.Fragment>
                <Head>
                    <title>Search and Apply for Jobs In Top Companies  - Rozgar.com</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="Keywords" content={"Top Companies" + ", Jobs in India, Jobs in Noida, Search & Apply Job"} />
                    <meta name="description" content={"Get all the details of job vacancies in top companies in India. Rozgar.com provides details of jobs in top companies in India. Apply for jobs in top companies."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Search and Apply for Jobs In Top Companies  - Rozgar.com"} />
                    <meta property="og:description" content={"Get all the details of job vacancies in top companies in India. Rozgar.com provides details of jobs in top companies in India. Apply for jobs in top companies."} />
                    <meta property="og:url" content={"https://rozgar.com/top-companies"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Search and Apply for Jobs In Top Companies  - Rozgar.com"} />
                    <meta name="twitter:description" content={"Get all the details of job vacancies in top companies in India. Rozgar.com provides details of jobs in top companies in India. Apply for jobs in top companies."} />
                    <meta name="twitter:url" content={"https://rozgar.com/top-companies"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical" href={"https://rozgar.com/top-companies"} />


                </Head>
                <FilteredHeader ud={this.state.ud} />
                <CompanyList
                    COMPANY_LIST={COMPANY_LIST}
                    COUNT={COUNT}
                    list={(page, filter) => { this.list(page, filter) }}
                    filterData={(data) => { this.filterData(data) }}
                    onSearch={(page, filter, input) => { this.onSearch(page, filter, input) }}
                />
            </React.Fragment>
        )

    }
}

export async function getServerSideProps(context) {

    const { req } = context
    let ud = getLoggedInUserData(req)

    return {
        props: {
            ud: ud
        }
    }

}

