// import Select from 'react-select'
import { getAllCoverLetterById, getJobDetailById } from '@/action/CandidateAction';
import React ,{useEffect, useState , useRef, useCallback} from 'react'
import { getAuthHeader, getCandidateAuthHeader } from 'utils';
import axios from 'axios';

import { faUnlock , faLock , faPenToSquare , faPen } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@/styles/CoverLetter.module.css'
import moment from 'moment';
import Ailogo from 'src/assets/images/ai-logo.png';
import Image from 'next/image';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

 export default function index(props) {

    const [ formData , setFormData ] = useState({
        company: '' ,
        name: '' ,
        skills: '' ,
        position: ''  ,
        experience: '' ,
        education:"",
        prev_experience:"",
        isSummary:false,
        grammerly_generator:false
      });
      
          
        const [allLoader, setAllLoader ]  = useState({
          edit_show_loader :false
        })
        
            
      const [attemp_left , setAttemptLeft] = useState(undefined)
      const [selected_cov_index , set_selected_cov_index] = useState(undefined)
      const [coverletter , setFinalCoverLetter] = useState('')
      const [selectedCover , setSelectedCover] = useState([])
      const [allCoverLetter , setAllCoverLetters] = useState([])
      const [result, setResult] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [saveLoading, setSaveLoading] = useState(false);
      const [error, setError] = useState(null);
      const [saved_cvl_id, set_saved_cvl_id] = useState(null);
      const ref = useRef(null);
       
 
      //  let save_cvl_id_callback = useCallback(()=>{
      //   const {JOB_ID} =props.cd_job_details  
      //   let model = { attemp_left , JOB_ID , COVER_LETTER:coverletter , ai_generated:"yes" , selected:"yes" , saved_cvl_id  }
      //    props.sendcvl_with_associatedJob(model)  
      //     } , [saved_cvl_id])


       useEffect(()=>{
 
            (async function() {
           
                const {JOB_ID} = props.cd_job_details  
                let {result , status }   = await getJobDetailById(JOB_ID) 
                    if(status){
                       setFormData({
                        ...formData , 
                          name:result.CANDIDATE_NAME ,
                          company:result.company ,
                          skills:result.skills ,
                          position :result.position ,
                          experience:result.experience==null?"fresher ":result.experience+"+"  ,
                          education:`${result.education!=null?result.education.EDUCATION_QUALIFICATION:""} in ${result.education!=null?result.education.SPECIALIZATION:""} ` , 
                          prev_experience:result.experience==null?null:result.experience+"+" 
                    })
                  
                    setAllCoverLetters(result.summ_details  )
                    setAttemptLeft(result.attemps_left)
                  
                  }


            
         })()
          
    } ,[ allCoverLetter.length ,attemp_left   ])


    
const SaveCoverLetter = async ()=>{
   try{

    setSaveLoading(true)
       const {JOB_ID} = props.cd_job_details  
       let model = { JOB_ID ,COVER_LETTER:coverletter , ai_generated: "yes"  }
  
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/save-cover-letter`,
         model , getCandidateAuthHeader() )

          if( data.status ) {
             
              const { result , status } =  await getAllCoverLetterById()
                
               if(status) { 
                      setAllCoverLetters(result.cover_list) 
                      setSaveLoading(false) 
                      setAllLoader({...allLoader ,edit_show_loader:false })
                      
                       if(data.result.saved_cd_cvl_id!=null){
                            //  set_saved_cvl_id(data.result.saved_cd_cvl_id )
                                const {JOB_ID} =props.cd_job_details  
                                let model = { attemp_left , JOB_ID , COVER_LETTER:coverletter , ai_generated:"yes" , selected:"yes" , saved_cvl_id:data.result.saved_cd_cvl_id  }
                                 props.sendcvl_with_associatedJob(model)  
                             } 

            }else{
              setSaveLoading(false)  
              setAllLoader({...allLoader ,edit_show_loader:false })
             }
         }
       
   }catch(err){
        console.log(err);
        setSaveLoading(false)    
   }

   setSaveLoading(false)
   setAllLoader({...allLoader , edit_show_loader:false })
  }

       
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);
     
      try {
              if(attemp_left >0 && attemp_left<=3 ) {
  
                if(selected_cov_index!=undefined) {
                  let filteredArr = selectedCover.filter(ele=> ele!=selected_cov_index)
                  setSelectedCover(filteredArr)
                  setFinalCoverLetter('')                    
                    }
                
                     debugger
                 
                    const {data:gptCoverLetter } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/cover-letter`,
                    formData, getCandidateAuthHeader() )
                    
                     if(gptCoverLetter.status) {
                        const {stream , attemps_left:als }   = gptCoverLetter.result
                         generate(stream , 1 )
                         setAttemptLeft(als)

                          if(stream) {
                            const {JOB_ID} =props.cd_job_details  
                            let model = { attemp_left , JOB_ID , COVER_LETTER:stream , ai_generated:"yes" , selected:"yes" , saved_cvl_id:null  }
                            props.sendcvl_with_associatedJob(model)  
                          }
                        }
                        
                        else{
                      setIsLoading(false);    
                    }  
                 }else{
                   setIsLoading(false);    
                 }

    } catch (err) {
       console.log("Recommended replacement err " , err  );
      setError(err);
    }
     
    setIsLoading(false);
     

  }


const generate = (str, size)=>{

    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
                chunks[i] = str.substr(o, size)
                setFinalCoverLetter(prev=> prev+chunks[i]  )
        }
  
    // return chunks       
}

  const editShow =()=>{
     
     if(attemp_left>0 && attemp_left<=3) {
       
            if(allLoader.edit_show_loader) {
              const {JOB_ID} =props.cd_job_details  
              let model = { attemp_left , JOB_ID , COVER_LETTER:coverletter , ai_generated:"yes" , selected:"yes" , saved_cvl_id  }
              props.sendcvl_with_associatedJob(model)  
           }
            
          setAllLoader({
            edit_show_loader:!allLoader.edit_show_loader
          })
           
          
     }           
  }

  const options = allCoverLetter.map(ele=> {return  { label:ele.cover_letter.slice(0,100)+"..." , value: ele.cover_letter }} ) 

  const handleChange =(object)=>{
         
     if(Array.isArray( object) && object.length>0 ) {
       const { value , label } = object[0]
       

       let index = options.findIndex(ele=> {
         return ele.label==label
        }  )

        set_selected_cov_index(index)
            
           setSelectedCover(Array.from(new Set([index ]) )  ) 
           setFinalCoverLetter(allCoverLetter[index])
        
            if(allCoverLetter[index].cover_letter!="") {
             const {JOB_ID} =props.cd_job_details  
             let model = { attemp_left , JOB_ID , COVER_LETTER:allCoverLetter[index].cover_letter , ai_generated:"no" , selected:"yes" , saved_cvl_id  }
             props.sendcvl_with_associatedJob(model)  
              } 
      
     }else{

      let index = options.findIndex(ele=> {
            return ele.value==allCoverLetter[selected_cov_index].cover_letter
        })
        
      let filteredArr = selectedCover.filter(ele=> ele!=index)
      setSelectedCover(filteredArr)
      setFinalCoverLetter('')
      props.sendcvl_with_associatedJob(null)  
     }
    
               }
   

    let saveandeditstyle ={
      float: 'right',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color:"green"
     }

   return ( 
    <div className='cover-modal-box'>

    <div className="row">
    <div class="col-12">
      <div className="form-group">
        <label
          for={`select previous cover letters`}
          class="input-label"
          >
           
        Select Previous Cover Letters 
         
        </label>
      
    <Typeahead
    clearButton
    defaultSelected={options.slice(0, 1)}
    id="basic-example"
    onChange={handleChange}
    options={options}
    labelKey="label"
    placeholder=""
      // selected={selected}
       
     />
      </div>
    </div>
    </div>


 {/*  <div  id={styles.overflowTest}      >
      <div className={styles['accordion']} >
        
   */}
      {
         // working list code 
        
    //     allCoverLetter.map((ele,index)=>{
    //    return <React.Fragment>
        
    //    <label className={styles['accordion-label']  } for={`${index}`} >
       
    //    <input 
    //    id={index}  type="checkbox" checked={selectedCover.includes(index)?true:false}  className={styles.selectedBox}   
       
    //    onChange={(e)=>{
         
    //         set_selected_cov_index(index)
             
    //          if(e.target.checked) {
                
    //             setSelectedCover(Array.from(new Set([index ]) )  ) 
    //             setFinalCoverLetter(allCoverLetter[index])
             
    //              if(allCoverLetter[index].cover_letter!="") {
    //               const {JOB_ID} =props.cd_job_details  
    //               let model = { attemp_left , JOB_ID , COVER_LETTER:allCoverLetter[index].cover_letter , ai_generated:"no" , selected:"yes" , saved_cvl_id  }
    //               props.sendcvl_with_associatedJob(model)  
    //             } 
           
    
    //         } else{
                    
    //                 let filteredArr = selectedCover.filter(ele=> ele!=index)
    //                 setSelectedCover(filteredArr)
    //                 setFinalCoverLetter('')
    //                 props.sendcvl_with_associatedJob(null)  
                     
    //           }
    
    //    }}   />
    
    //      {ele.cover_letter.slice(0,100)} ...
  
    
    //       <div className={styles['accordion-content']}   >
    //       {ele.cover_letter.slice(0,200)}
         
          
    //     </div>
        
    //    </label>
     
    //    </React.Fragment>
        
    // })
  
    // working list code 
  }


     
  { /*    
    </div>
    
    
    
</div> */}

     
    {isLoading?
      <div className="rg-active ">
      <div className="spinner-border spinner-border-sm my-3 " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    :     
    <span 
    className="badge badge-success my-2 "
    style={{ cursor: "pointer",  width: "138px" , height: "23px" ,  fontSize: "12px",  }}
    onClick={handleSubmit} >

    Generate Cover Letter 
    
    </span>  }
     
            {attemp_left!=undefined &&  ( attemp_left >0 && attemp_left<=3 )? <span style={{ color:"green"}} > {attemp_left}</span> :
            <span style={{ color:"red"}} > {attemp_left<0?0:attemp_left}</span>  
          } / <span style={{ color:"red"}} >3 </span>  attempts left 
         | <span style={{fontWeight: "600"}}>Powered By</span> <span><Image src={Ailogo} style={{width: "20px"}} /></span>
          {attemp_left!=undefined && attemp_left<=0 && <span style={{ color:"red"}} > Limit exceed to generate cov letter per day  </span>  }
            

              {!allLoader.edit_show_loader?<span style={saveandeditstyle}> <FontAwesomeIcon  onClick={editShow}   icon={faPenToSquare} size='xl' className={`mx-2 ${styles.edit_show}`} /> edit & save </span>   :
             <span style={saveandeditstyle} ><FontAwesomeIcon icon={faPen} size='xl'  onClick={editShow} className={`mx-2 ${styles.edit_show}`} />edit & save  </span> }
                
    
            <textarea
            type="text"
            className="form-control cover-leatertext"
            name={`quest`}
            placeholder="Enter Answer..."
            rows={10}
            cols={33}
            value={ typeof coverletter=="object" ? coverletter.cover_letter : coverletter }
            onChange={(e)=> setFinalCoverLetter(e.target.value) }
            disabled={!allLoader.edit_show_loader?true : false }

             onBlur={()=>{
              if(attemp_left>0 && attemp_left<=3) {
                if(allLoader.edit_show_loader && coverletter!="" ) {     
                  const {JOB_ID} =props.cd_job_details  
                  let model = { attemp_left , JOB_ID , COVER_LETTER:coverletter , ai_generated:"yes" , selected:"yes" , saved_cvl_id  }
                  props.sendcvl_with_associatedJob(model)  
                 }
              
              setAllLoader({
                edit_show_loader:!allLoader.edit_show_loader
              })   
             }
            }}
            />
          
             

            {saveLoading?
              <div className="text-center rg-active ">
              <div className="spinner-border spinner-border-sm my-3 " role="status">
                <span className="sr-only"> Loading... </span>
              </div>
            </div>
            : <button
            type="button"
            className="rg-btn rg-active btn-primary my-2 save-later-btn"
            style={(!allLoader.edit_show_loader)?{  border: "none",  outline: "none"  , background: "rgba(0,0,0,0.4)" }: 
            { border: "none", outline: "none" ,  }   }
            onClick={SaveCoverLetter}
             disabled={ !allLoader.edit_show_loader ? true : false  }
            >
                     Save for later    
            </button>  
           }
             
           
              
        </div>
  )
}
