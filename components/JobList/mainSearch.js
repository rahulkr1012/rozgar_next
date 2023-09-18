import React, { Component } from 'react'
import { topCompanyImages } from '@/action/dashboard';
import { searchJobs } from '@/action/jobsByActions';
import queryString from 'query-string'
import Joblist from './BySearch'
import { withRouter } from 'next/router';


export default withRouter( class joblist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JOB_LIST: [],
            JOB_LOCATION: {},
            JOB_COUNT: undefined,
            CURRENT_PAGE: 1,
            aboutJobName: 'India',
            title: 'Rozgar.com'
        }

    }

    joblist = (page, data) => {
        this.setState({ JOB_LIST: [], JOB_COUNT: undefined })
       
        const qParam = this.props.router.query
        const model = {
            KEYWORD: qParam?.keyword.replaceAll("'","''")?.split(','),
            LOC: qParam?.location ? qParam?.location?.split(',') : [],
            EXP: {
                MIN: qParam?.exp ? qParam?.exp?.split('-')[0] : undefined,
                MAX: qParam?.exp ? qParam?.exp?.split('-')[1] : undefined,
            },
            SAL: {
                MIN: qParam?.sal ? qParam?.sal?.split('-')[0] : undefined,
                MAX: qParam?.sal ? qParam?.sal?.split('-')[1] : undefined,
            },
            page: page ? page : 1
        }
        model.filter = data
        searchJobs(model).then((res) => {
            if (res.status) {
                this.setState({ JOB_LIST: res.result.list })
                this.setState({ JOB_COUNT: res.result.count })
            } else {
                alert(res.error)
            }

        }).catch(err => {
            alert(err)
        })
    }



    joblistforfilter = (page, data, url) => {
        this.setState({ JOB_LIST: [], JOB_COUNT: undefined })
        const qParam = queryString.parse(url)
        const model = {
            KEYWORD: qParam.keyword.replaceAll("'","''").split(','),
            LOC: qParam?.location ? qParam?.location?.split(',') : [],
            EXP: {
                MIN: qParam?.exp ? qParam?.exp?.split('-')[0] : undefined,
                MAX: qParam?.exp ? qParam?.exp?.split('-')[1] : undefined,
            },
            SAL: {
                MIN: qParam?.sal ? qParam?.sal?.split('-')[0] : undefined,
                MAX: qParam?.sal ? qParam?.sal?.split('-')[1] : undefined,
            },
            page: page,
        }
        model.filter = data
        searchJobs(model).then((res) => {
            if (res.status) {
                this.setState({ JOB_LIST: res.result.list })
                this.setState({ JOB_COUNT: res.result.count })
            } else {
                alert(res.error)
            }

        }).catch(err => {
            alert(err)
        })
    }

    filterData = (data, url) => {
        this.joblistforfilter(1, data, url)
    }

    componentDidMount() {
    
        const qParam = this.props.router.query
        const LOCATION = qParam?.location ? qParam?.location.split(',') : null
        this.setState({ aboutJobName: qParam?.keyword?.replace(/,/g, ', ') })
        if (LOCATION) {
            this.setState({ title: `${qParam.keyword} Jobs in ${LOCATION} - Rozgar.com` })
        } else {
            this.setState({ title: `${qParam.keyword} Jobs - Rozgar.com` })
        }

        this.joblist(this.state.CURRENT_PAGE, {})
        topCompanyImages().then(res => {
            if (res.status) {   
                this.setState({ TOP_COMPANY_IMAGES: res.result.images })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        const { title, JOB_LIST, CURRENT_PAGE, JOB_COUNT, aboutJobName, TOP_COMPANY_IMAGES ,LOCATION} = this.state
        return (
            <React.Fragment >

                <Joblist
                    JOB_LIST={JOB_LIST}
                    JOB_COUNT={JOB_COUNT}
                    filterData={(data, url) => this.filterData(data, url)}
                    TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
                    aboutJobName={aboutJobName}
                    LOCATION={LOCATION}
                    joblist={(page, data) => { this.joblist(page, data) }}
                    CURRENT_PAGE={CURRENT_PAGE}
                />
            </React.Fragment>
         )
      }
  }
   
)
