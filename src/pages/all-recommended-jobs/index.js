import React, { Component } from 'react'
import constant from 'constant';
import { getAllRecommendedJobs } from '@/action/CandidateAction';
import { capFirstLetterInSentence } from '@/utils';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Loading from 'components/Loader'
import { getLoggedInUserData } from 'nextCookie';
import { withRouter } from 'next/router';
import FilteredHeader from 'components/Filtered_Header'

let AllRecommendedJobList = dynamic(() => import('components/AllRecommendedJobs/index'), { loading: () => <Loading />, ssr: false })

 class AllRecommendedJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            currentPage: 1,
            count: undefined,
            showShimmer: true,
        }
    }

    componentDidMount() {
        document.title = constant.title.recommendedJobsList
        window.scroll(0, 0)
        this.RecommendedJobsList(this.state.currentPage)
    }

    RecommendedJobsList = (page) => {
        getAllRecommendedJobs(page).then((res) => {
            if (res.status) {
                setTimeout(() => {
                    this.setState({ showShimmer: false })
                }, 900)
            }
            this.setState({ list: res.result.recommendedJobList })
            this.setState({ count: res.result.total })
            window.scroll(0, 0)
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        return (
            <React.Fragment>
                <Head >


<title title={capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))}>{ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))} />
<meta property="og:description" content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
<meta property="og:url" content= {this.props.router.asPath}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))} />
<meta name="twitter:description"  content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
<meta name="twitter:url"content= {this.props.router.asPath} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical" href={this.props.router.asPath} />

</Head>
<FilteredHeader ud={this.props.ud} />

                <AllRecommendedJobList
                    router={this.props.router}
                    list={this.state.list}
                    recommendedJobList={this.RecommendedJobsList}
                    currentPage={this.state.currentPage}
                    count={this.state.count}
                    showShimmer={this.state.showShimmer}
                />
            </React.Fragment>
        )
    }
}
export default withRouter(AllRecommendedJobs)

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)

    return {
        props: {
            ud: ud
        }
    }

}