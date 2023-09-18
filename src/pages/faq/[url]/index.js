import React, { Component } from 'react'
import constant from 'constant'
import { capFirstLetterInSentence, capitalizeWords } from 'utils';
import { FAQbyId, FAQCategoryList, FAQList, FAQOurBlog } from '@/action/FAQAction';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic';
import loader from 'components/Loader'

 let FaqDetails  = dynamic(import('components/Faq/faq_details') , {
    ssr:false ,
    loading:()=> <loader /> 
}) 


 

export default withRouter(  class faqDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ud:this.props.ud , 
      list: [],
      data: [],
      keywordList: [],
      keyword: "",
      showQuickShimmer: true,
      showURLShimmer: true,
      showFAQShimmer: true,
    }

  }

  componentDidMount() {
    this.getFAQlist(this.state.keyword)
    const urlType = this.props.router.pathname
    if (urlType === constant.component.faqDetails.url) {
      const URL = this.props.router.query.url
      this.getFAQIDURL(URL)
      window.scrollTo(0, 0)
    }

    FAQCategoryList().then((res) => {
      this.setState({ showQuickShimmer: true })
      this.setState({ data: res.result })
      this.setState({ showQuickShimmer: false })
    }).catch((err) => {
      alert(err)
    })

  }

  getFAQIDURL = (URL) => {
     
    this.setState({ showURLShimmer: true })
    FAQbyId(URL).then((res) => {
      this.setState({ list: res.result })
      this.setState({ showURLShimmer: false })
      document.title = "FAQ - " + res.result.QUESTION + " - Rozgar.com"
    }).catch((err) => {
      alert(err)
    })
     
  }

  getFAQlist = (keyword) => {
    this.setState({ showFAQShimmer: true })
    FAQList({ KEYWORD: keyword }).then((res) => {
      this.setState({ keywordList: res.result })
      this.setState({ showFAQShimmer: false })
    }).catch((err) => {
      alert(err)
    })
  }


  updateKeyword = (keyword) => {
    this.setState({ keyword })
    this.getFAQlist(keyword)

  }



  render() {

   
    return (
      <React.Fragment>
           <Head >

{<title title={capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))}>{ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))}</title> }
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + " - Learn how to create Job profile, Search and Apply jobs and many more on  Rozgar.com."} />

<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))} />
<meta property="og:description" content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + " - Learn how to create Job profile, Search and Apply jobs and many more on   Rozgar.com."} />
<meta property="og:url" content= {this.props.router.asPath}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' '))} />
<meta name="twitter:description"  content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + " - Learn how to create Job profile, Search and Apply jobs and many more on   Rozgar.com."} />
<meta name="twitter:url"content= {this.props.router.asPath} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical"  href={"https://rozgar.com/"+this.props.router.asPath} />

</Head>
      

      <FilteredHeader ud={this.state.ud} />


     {
          <FaqDetails list={this.state.list}
          data={this.state.data}
          FAQ_Blog_List={this.props.FAQ_Blog_List}
          keyword={(kywrd) => { this.updateKeyword(kywrd) }}
          showQuickShimmer={this.state.showQuickShimmer}
          showURLShimmer={this.state.showURLShimmer}
          showFAQShimmer={this.state.showFAQShimmer}
    keywordList={this.state.keywordList} />  }

           
      </React.Fragment>
    )
  }
})


export async function getServerSideProps(context) {
    const { req }  = context
      let ud = getLoggedInUserData(req)
      let  FAQ_Blog_List  = await FAQOurBlog()

         return {
                props:{
                   ud,
                   FAQ_Blog_List:FAQ_Blog_List
                }  
   }
  
    }
