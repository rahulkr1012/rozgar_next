import React, { Component } from 'react'
import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'
let Payroll  =dynamic(()=> import('components/employerServices/Payrollautomation') ,  { 
 loading:()=> <Loader /> , 
    ssr:false 
} ) 
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { ud } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title >Payroll Automation Services for Companies - Rozgar.com</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Payroll-Automation" + "-3rd Party Payroll Outsourcing Employee Management Solutions Simplifying payroll management for your organisation"} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Payroll Automation Services for Companies - Rozgar.com"} />
                    <meta property="og:description" content={"Payroll-Automation" + "-3rd Party Payroll Outsourcing Employee Management Solutions Simplifying payroll management for your organisation"} />
                    <meta property="og:url" content={"https://rozgar.com/payroll-automation"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Payroll Automation Services for Companies - Rozgar.com"} />
                    <meta name="twitter:description" content={"Payroll-Automation" + "-3rd Party Payroll Outsourcing Employee Management Solutions Simplifying payroll management for your organisation"} />
                    <meta name="twitter:url" content={"https://rozgar.com/payroll-automation"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical"  href={"https://rozgar.com/payroll-automation"} />
                </Head>
                <FilteredHeader ud={ud} />

                <Payroll />
            </React.Fragment>

        )
    }
}


export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud
        }
    }
}