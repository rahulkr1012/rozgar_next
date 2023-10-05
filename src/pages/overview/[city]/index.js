import { cityAnOverView } from '@/action/cityOverview';
import { withRouter } from 'next/router';
import React, { Component, Suspense } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import CityOverview from 'components/cityoverview/cityoverview'
import { getLoggedInUserData } from 'nextCookie';
//const CityOverview = React.lazy(() => import('components/cityoverview/cityoverview'));
 class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityDetail: undefined,
            jobsCount: undefined,
            localities: [],
            jobs: [],
            showShimmer: true,
            ud:this.props.ud,
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        
        cityAnOverView(this.props.router.query.city).then(res => {
            if (res.status) {
                this.setState({ cityDetail: res.result.cityDetail, jobsCount: res.result.jobsCount, localities: res.result.localities, jobs: res.result.jobs, showShimmer: false })
                document.title = res.result.cityDetail.CITY + ' - An Overview'
            }
            else {
                console.log(res.error)
            }

        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const { cityDetail,
            jobsCount,
            localities,
            jobs,
            showShimmer } = this.state
        return (
            <React.Fragment>
                        <FilteredHeader ud={this.state.ud} />

                 <CityOverview
                        cityDetail={cityDetail}
                        jobsCount={jobsCount}
                        localities={localities}
                        jobs={jobs}
                        showShimmer={showShimmer}
                    />
                {/* <Suspense fallback={<div><Shimmer /></div>}>
                    <CityOverview
                        cityDetail={cityDetail}
                        jobsCount={jobsCount}
                        localities={localities}
                        jobs={jobs}
                        showShimmer={showShimmer}
                    />
                </Suspense> */}

            </React.Fragment>
        )
    }
}
export default withRouter(Overview)

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud,
        }
    }

}