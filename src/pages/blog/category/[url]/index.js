import React, { Component } from 'react'
import { blogCategory, BlogListbyCategoryURL, recentblogList } from '@/action/BlogAction';
import constant from 'constant';
// import Loader from 'components/Loader'
import FilteredHeader from 'components/Filtered_Header'

import { capitalizeWords } from '@/utils';
import { withRouter } from 'next/router';
import dynamic from "next/dynamic";
import { getLoggedInUserData } from 'nextCookie';
import Loader from 'components/Loader'
import Head from 'next/head';
  
let BlogDetail  =   dynamic(()=>import('components/blog_detail/BlogDetail') , {
    ssr:false ,
    loading: () => <Loader />,
} );
 

 import { capFirstLetterInSentence } from 'utils';
const Category = dynamic(
    () => import("components/blog_detail/BlogDetail"),
    {
      loading: () => <Loader />,
      ssr: false,
    }
  );
   

  
  class blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            count: undefined,
            currentPage: 1,
            recentList: [],
            blogCategory: undefined,
            showShimmer: true,
            tags: [],
            ud:this.props.ud

        }
    }

    componentDidMount() {
        this.blogLists(this.state.currentPage)
        document.title = constant.title.Blog
    }

    blogLists = (page) => {
        
        BlogListbyCategoryURL({ URL: this.props.router.query.url, page: page }).then((res) => {
            
            let finalTag = []
            res.result.list.map((ele, index) => {

                if (ele.TAG.includes(",")) {
                    let arr = ele.TAG.split(",")
                    arr.map((tg) => {
                        if (tg != "") {
                            finalTag.push(tg)
                        }
                    })
                }
                else {
                    finalTag.push(ele.TAG)
                }
            })

            finalTag = [...new Set(finalTag)]

            this.setState({ list: res.result.list, count: res.result.count, showShimmer: false, tags: finalTag })
            document.title = "Blog - " + capitalizeWords(this.props.router.query.url?.split('-')).join(' ') + " - Rozgar.com"
        }).catch((err) => {
            alert(err)
        })
        recentblogList().then((res) => {
            this.setState({ recentList: res.result.list })
        }).catch((err) => {
            alert(err)
        })
        blogCategory().then((res) => {
            // console.log("cate", res.result);
            this.setState({ blogCategory: res.result.list })


        }).catch((err) => {
            alert(err)
        })
    }

    render() {
        return (
            <React.Fragment>

             { <Head>
                    <title title={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))}</title>
                    <meta name="HandheldFriendly" content="True" />

                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " ? Here are  8 tips for you to go about applying for your dream job abroad!"} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar Official Blog" />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " ? Here are  8 tips for you to go about applying for your dream job abroad!"} />
                    <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="article:published_time" content="2022-10-18T06:04:34.000Z" />
                    <meta property="article:modified_time" content="2022-10-18T06:04:37.000Z" />
                    <meta property="article:tag" content="Career Advice" />
                    <meta property="article:tag" content="Career Insights" />

                    <meta property="article:publisher" content={this.props.router.asPath} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " ? Here are  8 tips for you to go about applying for your dream job abroad!"} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
        </Head>  }

                 
                <FilteredHeader ud={this.state.ud} />

                
                <BlogDetail
                 
                    list={this.state.list}
                    blogLists={(page) => this.blogLists(page)}
                    count={this.state.count}
                    setPage={this.state.currentPage}
                    recentList={this.state.recentList}
                    blogCategory={this.state.blogCategory}
                    category={capitalizeWords(this.props.router.query.url.split('-')).join(' ')}
                    showShimmer={this.state.showShimmer}
                    tags={this.state.tags}

                />
            </React.Fragment>
        )
    }
}
 

export default withRouter(blog)
 
export async function getServerSideProps(context){
     const {req}  = context
  let ud = getLoggedInUserData(req) 
  
      return {
        props:{ud}
    }
    }