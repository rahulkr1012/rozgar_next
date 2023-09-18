import React from 'react'
import StudyAbroadDestinationSetion from 'components/StudyAbroad/StudyAbroadDestinationSetion'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'

export default function index(props) {

  const [state, setstate] = React.useState({
    ud:props.ud
  }) 

  return (
    <React.Fragment>
     
         <FilteredHeader ud={state.ud} />
        <StudyAbroadDestinationSetion/>
   
         </React.Fragment>
  )
}



export async function getServerSideProps({ req }) {

  let ud = getLoggedInUserData(req)
  
  return {
    props: {
      ud: ud
    }
  }
}