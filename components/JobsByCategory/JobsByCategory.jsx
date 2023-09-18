import Link from 'next/link';
import React, { Component } from 'react'
import constant from 'constant';
import { withRouter } from 'next/router';
import Loader from 'components/common/JobsByCategoryloader/Loader'

export default  withRouter (class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FUNCTIONAL_AREA_SHOW: false,
            INDUSTRY_SHOW: false
        }
    }

    componentDidMount() {
        window.scroll(0, 0)
    }


    render() {
        const { FUNCTIONAL_AREA_SHOW, INDUSTRY_SHOW } = this.state;
        const { FUNCTIONAL_AREA_LIST, INDUSTRY_LIST } = this.props
        
        let arraytag = this.props.router.asPath.split('-')
        let finalTag = arraytag[arraytag.length-1]
        let finalUrl =  ':url-jobs'
        return (

            <React.Fragment>
                <div className='jobsbylocationColumnBox'>
              {  FUNCTIONAL_AREA_LIST===undefined?<Loader/>:
              <div>
                    <div className='headtext'>Browse Jobs by Functional Area / Department</div>
                    <div className='jobsbylocationColumn colCount_four'>
                        {
                       
                        FUNCTIONAL_AREA_LIST&& FUNCTIONAL_AREA_LIST.map((item, index) => {
                            if (FUNCTIONAL_AREA_SHOW) {

                                return ( <Link
                                         tagret="_blank"
                                        href={{
                                            pathname: finalUrl.replace(':url', item.URL),
                                            state: { hideJobAlert: false }
                                        }}
                                    >{item.FUNCTIONAL_AREA}</Link>)
                            }
                            else if (index < 50) {

                                return ( <Link
                                         target="_blank"
                                        href={{
                                            pathname: finalUrl.replace(':url', item.URL),
                                            state: { hideJobAlert: false }
                                        }}
                                    >{item.FUNCTIONAL_AREA}</Link>)
                            }

                        })  }
                    </div>
                    <div className='text-right pr-2 pb-1'>
                        <button onClick={(e) => this.showFunctionalArea(e)} className='proknowmore'>{FUNCTIONAL_AREA_SHOW ? 'Collapse' : 'View All'}</button>
                    </div>
                    </div>}
                </div>
               
                <div className='jobsbylocationColumnBox'>
                {INDUSTRY_LIST===undefined?<Loader/>:
                    <div>
                    <div className='headtext'>Browse Jobs by Industry / Sector</div>
                    <div className='jobsbylocationColumn colCount_four'>

                        {INDUSTRY_LIST.length > 0 ? INDUSTRY_LIST.map((item, index) => {
                            if (INDUSTRY_SHOW) {
                                return (
                                    <Link
                                        tagret="_blank"
                                        href={{
                                            pathname: finalUrl.replace(':url', item.URL),
                                            state: { hideJobAlert: false }
                                        }}
                                    >
                                        {item.INDUSTRY}</Link>)
                            }
                            else if (index < 50) {
                                return ( <Link
                                     target="_blank"
                                    href={{
                                        pathname: finalUrl.replace(':url', item.URL),
                                        state: { hideJobAlert: false }
                                    }}
                                >{item.INDUSTRY}</Link>)
                            }

                        }) : ''}

                    </div>
                    <div className='text-right pr-2 pb-1'>
                        <button onClick={(e) => this.showIndustry(e)} className='proknowmore'>{INDUSTRY_SHOW ? 'Collapse' : 'View All'}</button>
                    </div></div>}
                </div>

                {/* <nav className="rg-pagination">
                    <ul>
                        <li className="rg-prevpage"><a href="#"><i className="fa fa-angle-left"></i> Previous</a></li>
                        <li className="rg-active"><a href="#">01</a></li>
                        <li><a href="#">02</a></li>
                        <li><a href="#">03</a></li>
                        <li><a href="#">04</a></li>
                        <li><a href="#">05</a></li>
                        <li><a href="#"></a></li>
                        <li className="rg-nextpage"><a href="#">Next <i className="fa fa-angle-right"></i></a></li>
                    </ul>
                </nav> */}
            </React.Fragment>
        )
    }
    showFunctionalArea = (e) => {
        e.preventDefault();
        const { FUNCTIONAL_AREA_SHOW } = this.state;
        this.setState({ FUNCTIONAL_AREA_SHOW: !FUNCTIONAL_AREA_SHOW })
    }


    showIndustry = (e) => {
        e.preventDefault();
        const { INDUSTRY_SHOW } = this.state;
        this.setState({ INDUSTRY_SHOW: !INDUSTRY_SHOW })
    }
})
