import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie'
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
let UpgradeSkills = dynamic(() => import('components/StudyAbroad/UpgradeSkill'), { loading: () => <Loader />, ssr: true })

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ud: this.props.ud
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title title={"UpgradeSkills" + " | Learning Hub - Rozgar.com"}>{"UpgradeSkills" + " | Learning Hub - Rozgar.com"}</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="Keywords" content={"UpgradeSkills" + " Course," + "UpgradeSkills" + "Certification Course,Learn " + "UpgradeSkills" + "Online ,Online " + "UpgradeSkills" + "Course,online " + "UpgradeSkills" + " course for beginners,learn java online course, full stack developer course online,best  " + "UpgradeSkills" + " course online,full stack developer course online."}></meta>
          <meta name="description" content={"Want to upgrade your skills in Java, Python, and software testing? Apply for these courses on  Rozgar.com and upgrade your skills to make a bright career."} />
          <link rel="canonical" href={"https://rozgar.com/upgrade-skills"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* og meta tag */}
          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"UpgradeSkills"} />
          <meta property="og:description" content={"Want to upgrade your skills in Java, Python, and software testing? Apply for these courses on  Rozgar.com and upgrade your skills to make a bright career."} />
          <meta property="og:url" content={"https://rozgar.com/upgrade-skills"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          {/* Twitter Meta Tag */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"UpgradeSkills"} />
          <meta name="twitter:description" content={"Want to upgrade your skills in Java, Python, and software testing? Apply for these courses on  Rozgar.com and upgrade your skills to make a bright career."} />
          <meta name="twitter:url" content={"https://rozgar.com/upgrade-skills"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <link rel="canonical" href={"https://rozgar.com/upgrade-skills"} />
        </Head>
        <FilteredHeader ud={this.state.ud} />

        <UpgradeSkills />
      </React.Fragment>
    )
  }
}

export default withRouter(index)
export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req)

  return {
    props: {
      ud: ud
    }
  }
}

