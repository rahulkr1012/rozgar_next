import React, { Component } from 'react'
import constant from 'constant';
import { onChange } from '../../utils';
import Link from 'next/link';
import { DesignationList } from '@/action/jobsByActions';
import { withRouter } from 'next/router';
import Loader from 'components/common/JobsByDesignationLoader/DesignationLoader';


export default withRouter (class Designation extends Component {

    constructor(props) {
         
        super(props);
        this.state = {
            DESIGNATION_LIST: [],
            KEYWORD: { name: 'KEYWORD', value: '' } ,
            prevActive :"A",
            DESIGNATION_LIST_COUNT:"",
            pointer :{
            position: "relative",
            zIndex: "2",
            cursor: "pointer"
           }

        }
    }
     
    componentDidMount() {
        window.scroll(0, 0)
       
        DesignationList(this.state.prevActive).then(res => {
                
                   
            if (res.status) {    
                 
                  this.setState( { DESIGNATION_LIST: res.result.list})
                  this.setState({ DESIGNATION_LIST_COUNT: res.result.count}) 
                  }
                 
            else {
                alert(res.error)
            }
        }).catch(err => {
            console.log("errerrerr",err);
            alert(err)
        })         
    }

    getJobListByDesignation (designationType)
       
 
     { 
         
        this.props.ONCHANGE(designationType)
        //  let divs  = document.getElementsByClassName('boxatozlist')
           this.setState({ prevActive : designationType }) 
             

           DesignationList(designationType).then(res => {
                 
                   
            if (res.status) {    
                 
                  this.setState( { DESIGNATION_LIST: res.result.list})
                  this.setState({ DESIGNATION_LIST_COUNT: res.result.count}) 
                  }
                 
            else {
                alert(res.error)
            }
        }).catch(err => {
            console.log("errerrerr",err);
            alert(err)
        })


   
     
}

componentDidUpdate(prevProps, prevState , snapshot) {
      
  if(prevState.prevActive!=this.state.prevActive) {
      if(prevState.prevActive!=""){
        let preAvtive = document.getElementById(prevState.prevActive)      
        preAvtive.classList.remove('active')
        let currActive= document.getElementById(this.state.prevActive)
        currActive.classList.add('active')
      }  
    }
       
}
     

    render() {
         const {pointer}= this.state
        const { DESIGNATION_LIST, KEYWORD } = this.state;
        const { DESIGNATION_LIST_COUNT } = this.props
        

        let arraytag = this.props.router.asPath.split('-')
        let finalTag = arraytag[arraytag.length-1]

        let fialCatUrl =  ':url-jobs'
         
        return (
             
            <React.Fragment>
             
                <div className='jobsbylocationColumnBox'>
                    <div className='jobbycomsearch'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h6> Browse Jobs by Designations / Job Titles</h6>
                            </div>
                            <div className='col-md-6'>
                                <div className="jobComwrap">
                                    <div className="jobComsearch">

                                        <form className='jobComsearch' onSubmit={(e) => (this.onSearch(e))}>

                                            <input
                                                type="text"
                                                className="jobComsearchTerm"
                                                placeholder="Search for a  Designation"
                                                name={KEYWORD.name}
                                                value={KEYWORD.value}
                                                onChange={this.onChange} />
                                           </form >

                                        <button type="submit" onClick={(e) => (this.onSearch(e))} className="jobComsearchButton">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                    <div className='boxatoz'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='boxatozlist'>
                                    <ul>
                                        <li style={pointer} >
                                            <a  className={this.state.prevActive=="A"?"active":""  }  onClick={e=> this.getJobListByDesignation('A')  } id="A"  >A</a>
                                        </li>

                                        <li  >
                                            <a onClick={e=> this.getJobListByDesignation('B') } id="B"  style={pointer}>B</a>
                                        </li>
                                        
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('C')  } id="C" style={pointer} >C</a>
                                        </li>

                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('D') }  id="D"  style={pointer} >D</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('E') }  id="E" style={pointer} > E</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('F')  }   id="F" style={pointer} >F</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('G') }  id="G" style={pointer} >G</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('H') }  id="H" style={pointer} >H</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('I') }  id="I" style={pointer} >I</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('J') }  id="J" style={pointer} >J</a>
                                        </li>
                                        
                                         <li>
                                             <a onClick={e=> this.getJobListByDesignation('K') } id="K" style={pointer} >K</a>
                                         </li>

                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('L') } id="L" style={pointer}>L</a>
                                        </li>
                                         
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('M') } id="M" style={pointer} >M</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('N') } id="N" style={pointer} >N</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('O') } id="O" style={pointer} >O</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('P') } id="P" style={pointer} >P</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('Q') } id="Q" style={pointer} >Q</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('R') } id="R" style={pointer}  >R</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('S') }  id="S" style={pointer} >S</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('T') } id="T" style={pointer} >T</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('U') }  id="U" style={pointer} >U</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('V') }  id="V" style={pointer} >V</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('W') } id="W" style={pointer} >W</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('X') } id="X" style={pointer} >X</a>
                                        </li>
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('Y') }id="Y"  style={pointer} >Y</a>
                                        </li>
                                        
                                        <li>
                                            <a onClick={e=> this.getJobListByDesignation('Z') } id="Z" style={pointer} >Z</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                   

                    {DESIGNATION_LIST.length > 0?
                        
                        <div className={DESIGNATION_LIST.length > 0 ? 'jobsbylocationColumn colCount_four' : 'jobsbylocationColumn'}>
                       
                     {DESIGNATION_LIST_COUNT !== undefined && DESIGNATION_LIST.length > 0 ? DESIGNATION_LIST.map((item, index) => {
                        return (
                            <Link
                             target="_blank"
                            href={{
                                pathname: fialCatUrl.replace(':url', item.URL),
                                state: { hideJobAlert: false,
                                    KEYWORD: item.DESIGNATION }
                            }}
                        >
                         {item.DESIGNATION} </Link>)
                        }) : <span>No results found for your search criteria. Please check for any misspelling or try a new search</span>}

                    </div>:<Loader/> }
                     
                </div>


            </React.Fragment>
        )
} 





    onSearch = (e) => {
         
       
        e.preventDefault()
        const { value } = this.state.KEYWORD;
        if (value.length) {
            const filtered = (this.props.DESIGNATION_LIST.filter(entry => entry.DESIGNATION.toLowerCase().includes(value.toLowerCase())))
            this.setState({ DESIGNATION_LIST: filtered })
        }
        else {
           
            DesignationList('A').then(res => {
                if (res.status) {    
                     
                      this.setState( { DESIGNATION_LIST: res.result.list})
                      this.setState({ DESIGNATION_LIST_COUNT: res.result.count}) 
                       
                      let preAvtive = document.getElementById(this.state.prevActive)      
                      preAvtive.classList.remove('active')
                      let currActive= document.getElementById('A')
                      currActive.classList.add('active')
                     }
                
            }).catch(err => {
                alert(err)
            })

            // this.setState({ DESIGNATION_LIST: this.props.DESIGNATION_LIST.slice(0, 799) })
        
         }
    }

     
    onChange = (e) => {
        const { name, value } = e.target;
        onChange(this, name, value);
    }
})
