import React from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import constant from 'constant'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'

let RecommendedJobs = dynamic(() => import('components/Edit_Profile/RecomendedJobs'), {
  // loading: () => <Loader />,
  ssr: false
})

export default function index(props) {

  const { ud } = props
  const [data, setData] = React.useState({
    ud_id: JSON.parse(ud[constant.keys.cd])
  })
  return (
    <React.Fragment>
      <FilteredHeader ud={ud} />
      <RecommendedJobs ud={data.ud_id} />
    </React.Fragment>
  )
}



export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req)

  if (ud == null) {
    return {
      redirect: {
        destination: "/?alert=true",
        permanent: false

      }
    }
  }

  return {
    props: {
      ud: ud
    }
  }

}
