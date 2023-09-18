import React from 'react'
// import SavedJobs from 'components/Edit_Profile/SavedJobs'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import constant from 'constant'
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

import { withRouter } from 'next/router'

const SavedJobs = dynamic(
    () => import("components/Edit_Profile/SavedJobs"),
    {
      loading: () => <Loader />,
      ssr: false,
    }
  );
 function index(props) {

    const { ud } = props
    const [data, setData] = React.useState({
        ud_id: JSON.parse(ud[constant.keys.cd])
    })
  return (
<React.Fragment>
<FilteredHeader ud={ud} />
    <SavedJobs ud={data.ud_id}/>
</React.Fragment>
    )
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