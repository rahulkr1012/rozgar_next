import React, { Component } from 'react'
import { FaqbyCategory, FAQCategoryList, FAQOurBlog } from '@/action/FAQAction';
// import FaqCategory from '../../../../components/FAQ_Category/index'

import constant from 'constant';
import {  capitalizeWords ,capFirstLetterInSentence  } from 'utils';
import Loading from 'components/Loader'
import Head from 'next/head';
import dynamic from "next/dynamic";
import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'

let FAQCategory  = dynamic(()=> import( 'components/FAQ_Category/index') , {loading:()=><Loading /> ,  ssr:false} ) 

class faqCategory extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            data: [],
            keyword: "",
            showQuickShimmer: true,
            showBrowseShimmer: true,

        }

    }
    componentDidMount = () =>{
        this.getfaqCategoryList()
        this.getfaqbyCategory(this.state.keyword)
        window.scrollTo(0, 0)

    }

    getfaqCategoryList = () => {
        this.setState({ showQuickShimmer: true })
        FAQCategoryList().then((res) => {
            this.setState({ data: res.result })
            this.setState({ showQuickShimmer: false })
        }).catch((err) => {
            alert(err)
        })
    }

    getfaqbyCategory = (keyword) => {
        
        const urlType = this.props.router.pathname
        if (urlType === constant.component.faqCategory.url) {
            const URL = this.props.router.query.url
            FaqbyCategory(URL, { KEYWORD: keyword }).then((res) => {
                this.setState({ showBrowseShimmer: true })
                this.setState({ list: res.result })
                this.setState({ showBrowseShimmer: false })
                document.title = "FAQ - " + capitalizeWords(this.props.router.asPath.split('-')).join(' ') + " - Rozgar.com"
            }).catch((err) => {
                alert(err)
            })
        }
    }

    updateKeyword = (keyword) => {
        this.setState({ KEYWORD: keyword })
        this.getfaqbyCategory(keyword)
    }


    render() {
        return (
            <React.Fragment>
                <Head >


                     <title title={capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))}>{ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))}</title> 
                 <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " - Learn how to create Job profile, Search and Apply jobs and many more on  Rozgar.com."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " - Learn how to create Job profile, Search and Apply jobs and many more on   Rozgar.com."} />
                    <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " - Learn how to create Job profile, Search and Apply jobs and many more on   Rozgar.com."} />
                    <meta name="twitter:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" /> 
                    <link rel="canonical"  href={"https://rozgar.com"+this.props.router.asPath} />
                </Head>
                <FilteredHeader ud={this.state.ud} />

                <FAQCategory list={this.state.list}
                    data={this.state.data}
                    showQuickShimmer={this.state.showQuickShimmer}
                    showBrowseShimmer={this.state.showBrowseShimmer}
                    keyword={(e) => { this.updateKeyword(e) }}
                    FAQ_Blog_List={this.props.FAQ_Blog_List}
                    />
            </React.Fragment>
        )
    }
}


export default withRouter(faqCategory)
 
export async function getServerSideProps(context){
     const {req}  = context
  let ud = getLoggedInUserData(req) 
  let  FAQ_Blog_List  = await FAQOurBlog()
      return {
        props:{ud,
            FAQ_Blog_List: FAQ_Blog_List
        }

    }
    }
