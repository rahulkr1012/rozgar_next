import React, { Component } from 'react'
import { reportIssue } from '../../action/dashboard';
import ReportIssue from "components/ReportAnIssue/index"
import constant from 'constant'
// import Swal from 'sweetalert2';
// import { capFirstLetterInSentence } from '../../utils';
import swal from 'sweetalert';
// import Head from 'next/head';
import Loading from 'components/Loader'
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from "components/Filtered_Header";
import Head from 'next/head';

let ReportAProblem = dynamic(() => import("components/ReportAnIssue/index"), { loading: () => <Loading />, ssr: false })

 class ReportAnIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ud : props.ud
        }
    }
    
    componentDidMount() {
        document.title = constant.title.ReportIssue
        window.scrollTo(0, 0)
    }

    onSubmit = (model) => {

        reportIssue(model).then(res => {
            if (res.status) {
                // alert(res.messageCode)
                swal({
                    icon: 'success',
                    text: res.result.message,
                    timer: 1500,
                    showCancelButton: false,
                    showConfirmButton: false
                })
                // window.location.reload()
            } else {
                swal({
                    icon: 'error',
                    text: res.error,
                    timer: 1500,
                    showCancelButton: false,
                    showConfirmButton: false
                })
            }

        }).catch(err => {
            Swal.fire({
                icon: 'error',
                text: err,
                timer: 1500,
                showCancelButton: false,
                showConfirmButton: false
            })
        })

    }
    render() {
        return (
            <React.Fragment>
                <Head >


                    <title >Report a Problem with Rozgar - Rozgar Help Center</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"This process is for reporting something on Rozgar.com. If something is not working correctly report a problem on Rozgar."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Report a Problem with Rozgar - Rozgar Help Center"} />
                    <meta property="og:description" content={"This process is for reporting something on Rozgar.com. If something is not working correctly report a problem on Rozgar."} />
                    <meta property="og:url" content={"https://rozgar.com/report-a-problem"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Report a Problem with Rozgar - Rozgar Help Center"} />
                    <meta name="twitter:description" content={"This process is for reporting something on Rozgar.com. If something is not working correctly report a problem on Rozgar."} />
                    <meta name="twitter:url" content={"https://rozgar.com/report-a-problem"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical" href={"https://rozgar.com/report-a-problem"} />
                </Head>
                                <FilteredHeader ud={this.state.ud} />
                <ReportAProblem
                    onSubmit={this.onSubmit}
                />
            </React.Fragment>
        )
    }
}

export default withRouter(ReportAnIssue)

export async function getServerSideProps(context){
    const {req}  = context
  let ud = getLoggedInUserData(req) 
  
     return {
       props:{ud}
   }
   }