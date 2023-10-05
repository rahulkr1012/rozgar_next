import {s3_url as s3_profile_url }  from "./../../constant"
import { generate_candidate_summary, parseAndUpdateResume, saveForLaterSummary, setCurrentSummary } from '@/action/cvl'
import { ToastContainer, toast } from 'react-toastify';
import styles from './../../src/styles/summary_css.module.css'
  import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk , faCheck } from '@fortawesome/free-solid-svg-icons'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';  
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function index(props) {
    
     const [summary , setSummaryData ] =  useState({
            value:"" ,
            error:false ,
            word_count:{ name:"word_count" , value:100 , error:'' , requried:true  },  
            summary_generated:"",
            set_to_top_loader:false,
            save_for_later_loader:false    
          })

        const [loading , setLoading] = useState(false)

     const gene_summ = useCallback(()=>{
       
      const { getResume   } = props  
          if(getResume!=undefined) {
            setLoading(true)
            setSummaryData({...summary ,summary_generated:""  }) 
          } 
       } , [loading ,summary.summary_generated , summary.word_count.value  ])
    


       
        const  setPrimarySummary = useCallback(()=>{
    
           const {summary_generated } = summary
             setSummaryData({  ...summary, set_to_top_loader:true })

              if(summary_generated!='') {
            let model = {summary_generated:summary_generated }
              setCurrentSummary(model).then( res=> { 
                 if(res.status) {
                      sussesToast(" summary updated ")
                      props.updateProfileSummary()
                    }
                   
             setSummaryData({  ...summary, set_to_top_loader:false })

             }).catch(err=>{
                    failureToast(err)
                    setSummaryData({  ...summary, set_to_top_loader:false })
                 })
                 
                 setSummaryData({  ...summary, set_to_top_loader:false })
                      
          }
            
       } ,[  summary.summary_generated , summary.set_to_top_loader   ]) 



       const saveToLater= useCallback(()=>{ 
         debugger
       
        const { summary_generated  } = summary  
        if(summary_generated!="") {
          debugger
          let model = { generate_summary : summary_generated }
           
        setSummaryData({...summary, save_for_later_loader:true })
                  saveForLaterSummary(model).then(res=>{

                      if(res.status) {
                        sussesToast(res.result)     
                        setSummaryData({...summary, save_for_later_loader:false })
                      }
               
                   }).catch(err=>{
                        failureToast(err)
                      setSummaryData({...summary, save_for_later_loader:false })
              })
        }
        
        setSummaryData({...summary, save_for_later_loader:false })
        
         } , [summary.save_for_later_loader , summary.summary_generated ]  )




       const sussesToast=(args) =>{
       
         toast.success( args , {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
           
       }


       const failureToast =(err)=>{
         
          toast.success(err || " some error occured "  ,  {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
           
       }


       useEffect(()=>{
        
        debugger
        const { getResume,  error , profileSummary ,profileDetail:{ CANDIDATE_ID ,  EMAIL_ID ,  CANDIDATE_NAME ,  PHONENO,  token}   } = props 
        
           if(loading && getResume!=undefined) {
            let s3_url = `${s3_profile_url}${getResume.CANDIDATE_ID}/${getResume.RESUME_FILE}`  
              parseAndUpdateResume(s3_url).then(res=>{
                if(res.status) { 
                  (async  function(){
                     try{
                       
                          let formData = new FormData()
                          formData.append('name' , CANDIDATE_NAME )
                          formData.append('email' ,EMAIL_ID)
                          formData.append('experience' , res?.result?.parts?.experience)
                          formData.append('skills' ,res?.result?.parts?.languages )
                          formData.append('isSummary' ,"true" )
                          formData.append('company' , "" )
                          formData.append('position' , "" )
                          formData.append('word_count' , summary.word_count.value )
                          let model = {}
                           
                          for(var [key , value ] of formData.entries()) {
                              model[key] = value
                          }

                           let response = await generate_candidate_summary(model)
                           if(response.status) {
                             
                                  setSummaryData({...summary , summary_generated:response.result }) 
                                  setLoading(false)
                                  
                                     }
                     }catch(err) {
                             setLoading(false)
                     }
                      
                   }) ()
                           
                 }    
            }).catch(err=>{
              setLoading(false)
            
             })
          
              
           }else if(loading){
            failureToast("please upload resume ")
            setLoading(false)
           }


         
       } ,[ loading , summary.summary_generated , summary.word_count.value   ])
      
            

      let summ_loading_style = {
        border:'none', outline:'none' , 
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      cursor:"pointer"
      
      }


      let summ_save_style = {
        display: "flex",
        flexDirection: "row-reverse",
        gap: "10px",
        margin: "5px",
        alignItems: "center",
        cursor:"pointer"
      }


   const {   value  , error , summary_generated, word_count , set_to_top_loader , save_for_later_loader      }  = summary 

    return (

    <div>
     
       <div  className='edit-profile-summary'>       
       <div className='row'>
           <div class="col-12">
               <div className='form-group'>
                
               <label className='create-job-alert-label'> Word Count <span className='label-required'>*</span></label>
               <input 
                   name={word_count.name}
                   value={word_count.value}
                   onChange={(e)=> setSummaryData({...summary , ["word_count"] :{ ...summary.word_count , value : e.target.value } }) }
                   type="number"
                   className="form-control my-2"
                   placeholder={word_count.value}
                   style={{ paddingLeft: "10px" }}
               />
                
               {word_count && word_count.error && !word_count.value && <span className='text-danger ml-1'>  please provide count </span>}

                  {  
                    loading? 
                    <button  style={summ_loading_style}  >  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> </button>: 
                  
                   <textarea

                   cols={5} 
                  value={summary_generated}
                  placeholder='Write here...'
                  onChange={(e)=>  setSummaryData({...summary , summary_generated:e.target.value }) }
                    />
                  }
                     
                   

               <span style={summ_save_style} >  
                 <OverlayTrigger
                overlay={
                  <Tooltip >
                  save for later 
                  </Tooltip>
                     }  
                    > 

                     {save_for_later_loader?<Spinner animation="border" role="status" size="sm"> </Spinner>: 
                     <FontAwesomeIcon  className={`${styles['save_for_later']}`} 
                       onClick={saveToLater}
                     icon={faFloppyDisk} size="lg" title="save for later"  /> }
                
                   </OverlayTrigger>
                    
                   <OverlayTrigger
                  
                   overlay={
                     <Tooltip  >
                       set to primary
                     </Tooltip>
                        }  
                       > 
                        
                       { set_to_top_loader? <Spinner animation="border" role="status" size="sm"> </Spinner>
                      : <FontAwesomeIcon   className={`${styles['set_as_primary']}`}   onClick={setPrimarySummary} size="lg" icon ={faCheck} /> }
                       </OverlayTrigger>
                    
                </span>    
                       
               </div>
           </div>
       </div>
       
       <div className='row'>
           <div class="col-12 text-right pb-3 pt-3">
               <button type='button'  className='rg-btn btn-primary mr-2' style={{border:'none', outline:'none'}} 
                onClick={()=>{
                   props.onCancel()
               }
            }>
             CANCEL
             </button>

             { 
                loading? 
                <button type='button'  disabled className='rg-btn' style={{border:'none', outline:'none'}} 
                >  <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> </button>
              : 
               
                <button type='button'  className='rg-btn rg-active btn-primary'
                 style={{border:'none', outline:'none' }} onClick={()=> gene_summ()}  > generate </button>        
               }
              
           </div>
       </div>
   </div>

        
    </div>
  )
}

export default index
