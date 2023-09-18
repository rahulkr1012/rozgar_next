import React, { Component } from 'react'
import dynamic from 'next/dynamic';
const StudentsExplorer = dynamic(() => import('components/StudentsExplorer/StudentsExplorer'), { loading: () => <Loader />, ssr: false });
import Head from 'next/head';
import Loader from 'components/Loader/index'
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'
import { getBannerList } from '@/action/CandidateAction';

export default class studentsExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ud: this.props.ud,
            BannerSkill:[],
        }
    }
    componentDidMount() {
        getBannerList().then((res) => {
            this.setState({BannerSkill: res.result.list.map((item)=>{
             if(item.PAGE_LOCATION=="Career_Explorer"){
                return item
             }
            })});
          }).catch((err) => {
              console.log(err)
          })
        window.scroll(0, 0);
    }

    render() {
        const { ud } = this.props;
        const {BannerSkill}=this.state
        return (
            <React.Fragment>
                <Head>
                    <title>Career Explorer Courses From Top Universities | Rozgar.com</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Explore various courses for your bright career on Rozgar.com. Apply for career explorer courses from top universities and institutions in India."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Career Explorer Courses From Top Universities | Rozgar.com"} />
                    <meta property="og:description" content={"Explore various courses for your bright career on Rozgar.com. Apply for career explorer courses from top universities and institutions in India."} />
                    <meta property="og:url" content={"https://rozgar.com/career-explorer"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Career Explorer Courses From Top Universities | Rozgar.com"} />
                    <meta name="twitter:description" content={"Explore various courses for your bright career on Rozgar.com. Apply for career explorer courses from top universities and institutions in India."} />
                    <meta name="twitter:url" content={"https://rozgar.com/career-explorer"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical" href="https://rozgar.com/career-explorer" />

                </Head>

                <FilteredHeader ud={this.state.ud} />

                <StudentsExplorer
            BannerSkill={BannerSkill}

                />
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
