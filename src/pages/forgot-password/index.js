import React, { Component } from 'react'
import { forgotPassword } from '../../action/CandidateAction';
// import ForgotPasswords from 'components/ForgotPasswordAtLogin/index'
import constant from 'constant';
import swal from 'sweetalert'
import { capFirstLetterInSentence  } from 'utils';
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import Loading from 'components/Loader'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';



let ForgotPasswords  = dynamic(()=> import( 'components/ForgotPasswordAtLogin/index') , {loading:()=><Loading /> ,  ssr:false} ) 

 class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            showMessage: false,
            showLoader: false,
        }
    }
    componentDidMount() {
        document.title = constant.title.ForgotPassword
        window.scrollTo(0, 0)
    }

    onSubmit = (model) => {
        this.setState({ showLoader: true })
        forgotPassword(model).then((res) => {
            
            if (res.status) {
                this.setState({
                    message: res.result.message,
                    showMessage: true,
                    showLoader: false,
                })
                setTimeout(() => {
                    this.setState({
                        message: '',
                        showMessage: false
                    })
                }, 7000)
            } else {
                swal({
                    icon: "error",
                    text: res.error,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,

                });
                this.setState({ showLoader: false })
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Head >


                    <title >{"Forgot Password? - Rozgar.com"}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Forgot Password? - Rozgar.com"} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Forgot Password? - Rozgar.com"} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical" href={this.props.router.asPath} />
                </Head>
                <ForgotPasswords onSubmit={this.onSubmit} message={this.state.message} showMessage={this.state.showMessage} showLoader={this.state.showLoader} />
            </React.Fragment>
        )
    }
}

export default withRouter (ForgotPassword)
export async function getServerSideProps(context){
    const {req}  = context
 let ud = getLoggedInUserData(req) 
 
     return {
       props:{ud}
   }
   }