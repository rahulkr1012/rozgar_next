import React, { Component } from "react";
import { withRouter } from "next/router";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from "components/Filtered_Header";
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'
const ProfilePreview = dynamic( () => import('components/Edit_Profile/ProfilePreview'), { loading:()=><Loader /> ,   ssr: false });

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { ud } = this.props;
    return (
      <React.Fragment>
        <FilteredHeader ud={ud} />
        <ProfilePreview />
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context) {
  const { req } = context;
  let ud = getLoggedInUserData(req);
  return {
    props: {
      ud: ud,
    }, // will be passed to the page component as props
  };
}

export default withRouter(index);
