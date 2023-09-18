import React, { Component } from 'react'
import constant from 'constant';
import { capFirstLetterInSentence, getStorage, setStorage } from '../../utils';
import swal from 'sweetalert'
import { candidateLogin, googleLoginAuth } from '../../action/CandidateAction'
import { getLoggedInUserData } from 'nextCookie';
import Loading from 'components/Loader'
import { withRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';

let DiscussionForumSignIn = dynamic(() => import('components/DiscussionSignIn/index'), { loading: () => <Loading />, ssr: false })



class DiscussionFormsignin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDatas: null,
            showLoader: false,
            detail: getCookie(constant.keys.cd),
            // data: localStorage.getItem('JobUrl')
        }
    }
    componentDidMount() {
        document.title = constant.title.Signin
        window.scrollTo(0, 0)
        let auth = getStorage(constant.keys.ctoken)
        let cd = getStorage(constant.keys.cd)
        //no need for this piece of code
        if (auth && cd) {
            this.props.router.back()
        }
        //no need for this piece of code
    }

    onSubmit = (model) => {
        const Url = this.state.data
        this.setState({ showLoader: true })
        candidateLogin(model).then((res) => {
            this.setState({ showLoader: false })
            if (res.status) {
                this.setState({ showLoader: false })
                swal({
                    icon: "success",
                    text: "You have Successfully Logged In",
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false
                });
                this.props.router.back()

            } else {
                this.setState({ showLoader: false })
                swal({
                    icon: "error",
                    text: res.error,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
            }
        });
    }

    googleLoginHandler = (googleData) => {
        googleLoginAuth(googleData).then((res) => {
            if (res.status) {
                this.setState({
                    loginDatas: res
                })
                this.props.history.goBack()
            } else {
                swal({
                    icon: "error",
                    text: res.error,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
            }
        });
    }

    render() {
        // console.log(localStorage.getItem('JobUrl'))
        return (
            <React.Fragment>
                <Head >


                    {/* <title title={capFirstLetterInSentence(window.location.pathname.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(window.location.pathname.replace('/', '').split('/').pop().split('-').join(' '))}</title> */}
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " An environment where participants can pose issues for discussion and respond to any contribution, thus creating threaded discussions that can spawn a discussion tree where the discussion branches out in many directions or subthreads."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                     

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " An environment where participants can pose issues for discussion and respond to any contribution, thus creating threaded discussions that can spawn a discussion tree where the discussion branches out in many directions or subthreads."} />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " An environment where participants can pose issues for discussion and respond to any contribution, thus creating threaded discussions that can spawn a discussion tree where the discussion branches out in many directions or subthreads."} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    <link rel="canonical" href={this.props.router.asPath} />

                </Head>
                <DiscussionForumSignIn
                    leftBar={this.props.leftBar}
                    onSubmit={this.onSubmit}
                    googleLoginHandler={this.googleLoginHandler}
                    loginData={this.props.loginDatas}
                    showLoader={this.state.showLoader}
                />
            </React.Fragment>
        )
    }

}

export default withRouter(DiscussionFormsignin)


export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud
        }
    }

}