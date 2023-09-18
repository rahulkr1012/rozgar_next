import dynamic from 'next/dynamic';
import Image ,{Component} from 'next/image';
import React ,{useState} from 'react'
import resume01 from 'src/assets/img/demos/demo-view-1.png';
let ResumeForm  = dynamic(()=>import('components/ResumeForm' ) , {ssr:false}) 

export default class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
        }
    }
    
     addResumeMaking = ( model ) => {
     
     }
      



render() {

    return (
        <React.Fragment>
        <section className="blog-area">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-5">
                    <div className="cv-prev">
                        <div className="blog_thumbnail">
                            <Image src={resume01} className="temp-img" alt="" width={"1000"}  height={"1000"} />
                        </div>
                    </div>
    
                </div>
                <div className="col-12 col-md-7">
                    <div className="container">
                      
                      {/* <ResumeForm
                            onSubmit={ (model) => this.addResumeMaking(model) }
                            showLoader={this.state.showLoader }
                          /> 
    */}
                        
    
                    </div>
                </div>
            </div>
        </div>
    </section>
        </React.Fragment>
         
      )

}
  
}

