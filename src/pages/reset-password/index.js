import React, { Component } from 'react'
import { resetPassword } from '@/action/CandidateAction';
import constant from 'constant'
import swal from 'sweetalert'
import { withRouter } from 'next/router'

// import { capFirstLetterInSentence } from 'utils';
import { getLoggedInUserData } from 'nextCookie';
import dynamic from 'next/dynamic';
import { capFirstLetterInSentence, getParameterByName } from 'utils';
import Loader from 'components/Loader'
import Head from 'next/head';
let ResetPasswordss = dynamic(() => import("components/ResetPassword/index"), { loading: () => <Loader />, ssr: false })
 
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader: false
        }
    }
    componentDidMount() {
        // console.log("dataaa", router.query);
        window.scrollTo(0, 0)
         
    }

    onSubmit = (model) => {
        this.setState({showLoader:true})
            let token =getParameterByName('t' , window.location.href) 
          let data = {
            NewPassword: model.NewPassword,
            token
        } 

        resetPassword(data).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: "Password Successfully Changed",
                    timer: 4000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                window.location.href = constant.component.signin.url;
            }
            else {
                swal({
                    icon: "error",
                    text: res.error,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.setState({showLoader:false})
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                 <Head >


                    <title title={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                </Head> 
                <ResetPasswordss onSubmit={this.onSubmit} showLoader={this.state.showLoader}/>
            </React.Fragment>
        )
    }
}

export default withRouter(ResetPassword)

export async function getServerSideProps({ req }) {    
     let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud,
            // logData:logData
        }
    }


}