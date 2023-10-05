import { CompanyLists, DepartmentLists, SkillsForInterview, totalCount } from '@/action/ShareInterviewAction'
import ShareAnInterview from 'components/shareInterviewQuestions/ShareAnInterview'
import React, { useEffect, useState } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie';

export default function index(props) {
  const [state, setstate] = React.useState({
    ud:props.ud
  }) 
    const [skill_list,setSkillList]=useState(undefined)
    const [departments,setDepartments]=useState(undefined)
    const [Company_list,setCompany_list]=useState(undefined)
    const [TotalCount,setTotalCount]=useState(undefined)
    useEffect(() => {
        SkillsList()
        CompanyList()
        DepartmentList()
        Counting()}, [])

    const Counting = () => {
            totalCount().then((res)=>{
            setTotalCount(res.result[0])
            }).catch(err=>alert(err))
           }



       const  SkillsList = () =>{
            SkillsForInterview().then((res)=>{
                setSkillList(res.result)
            }).catch(err=>alert(err))
           }
          
       const  CompanyList = () => {
            CompanyLists().then((res)=>{
                setCompany_list(res.result)
            }).catch(err=>alert(err))
           }
       const  DepartmentList = () => {
            DepartmentLists ().then((res)=>{
                setDepartments(res.result)
            })
           }

  return (
    <React.Fragment>
      <FilteredHeader ud={state.ud} />

    <ShareAnInterview
    skill_list={skill_list}
    Company_list={Company_list}
    TotalCount={TotalCount}
    departments={departments}
    />


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