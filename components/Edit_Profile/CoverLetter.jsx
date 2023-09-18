import React, { useEffect } from 'react'
import styles from '../../src/styles/cover_lettter_list.module.css'
import ReactReadMoreReadLess from "react-read-more-read-less";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare , faTrash } from '@fortawesome/free-solid-svg-icons'
import parse from 'html-react-parser'; 
import Accordion from 'react-bootstrap/Accordion';
import Swal from 'sweetalert2';
import { deleteCvl, updateCvlByCvlId } from '@/action/cvl';
import noSearchFound from '../../src/assets/images/no-results.png'
import Link from 'next/link';
import Image from 'next/image';

function CoverLetterList(props) {
  

function onDeleteCoverLetter(item){
   
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: '',
      cancelButton: ''
    },
    customStyle:{
      margin:"1px" 
    },
    buttonsStyling: true   
   })
  
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      
        deleteCvl(item.id).then(res=>{
           if(res.status) { 
                props.updateCvl(res.result)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your cover letter has been deleted.',
                'success'
                )

           }
       }
        ).catch(err=>{   
        })
        
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'your cover letter is safe ',
        'error'
      )
    }
  })

}




     const { coverDetails } = props 
 
     return (
       <React.Fragment>
        
 
        

       <div className= {styles['cv_letter_dash']}  >
       Cover Letters
        </div>
  
     

        <div className= {styles['Name']} > 
        
       {coverDetails && coverDetails.length > 0 ? 
        coverDetails.map((ele , i )=>{
        return (
          <Accordion >
           
          <Accordion.Item eventKey={i}>
            <Accordion.Header>{ele.cover_letter.slice(0,90)+"..."}
            <div className={ styles['ped-btn'] }>
            <ul className={ styles['coverright'] } >
             
                 <li className={styles['choose_config']}  >  <span className="badge badge-secondary" style={ ele.selected=="yes"?{color:"white" , background:"green",padding: "5px 15px"}:{color:"white" , background:"grey",padding: "5px 15px"} }  >  Primary </span>  </li>
             
                 <li className={styles['choose_config_edit']} style={{color: "#ff9600"}}>
                 
                 <FontAwesomeIcon icon={faPenToSquare} onClick={()=>{ 
                  
                  Swal.fire(
                    {
                      
                      title: "Cover Letter",
                      type: "success",
                      input: 'textarea',
                      inputValue: ele.cover_letter,
                      showCancelButton: true,
                      cancelButtonText: "close",
                      closeOnConfirm: true,
                      closeOnCancel: true,
                      width: 800,
                      height: 800,
                      showCancelButton: true,
                      showConfirmButton: true,
                      inputValidator: (value) => {
                            let model = {CVL_ID: ele.id  , CVL_BODY:value  }
                          return new Promise((resolve , reject ) => {

                            updateCvlByCvlId(model).then(res=>{
                                 if(res.status)  {
                                   props.updateCvl(res.result)
                                   resolve("cover letter updated ")
                                   }
                                    
                              }).catch(err=>{
                                   reject("some error occured ")
                              })
                             
                          })
                      }
                  }
                    
                    )
                
                }
                
                } /> </li>

                 <li className={styles['choose_config_delete']} style={{color: "red"}}>
                  <FontAwesomeIcon icon={faTrash}  onClick={()=> onDeleteCoverLetter(ele)} /></li>
             </ul>
          </div> 
           
            </Accordion.Header>
            <Accordion.Body>
            { parse(` <p style="white-space: pre-wrap ; color:black "> ${ele.cover_letter} </p> `) }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        )
        })  :
      
        <div className='edprofilerightsideinner bb-01'>
        <div className='pro-job-details'>
            <div className='grid03'>
                         <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                        <h6 className='text-center text-danger'> No Cover letter </h6>
                       
                     </div>
               </div>
        </div>

      }
        </div>
      

  </React.Fragment>

  )
}

export default CoverLetterList
