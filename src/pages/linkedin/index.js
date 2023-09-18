import React, { useEffect } from 'react'
import queryString from 'query-string'
import { LinkedInLoginAuth } from '@/action/CandidateAction'
import constant from 'constant'
import { withRouter } from 'next/router'

const Index = (props) => {
    useEffect(() => {
        const qParam = queryString.parse('?' + props.router.asPath.split('?')[1])
        qParam.redirect_uri = `${window.location.origin}/linkedin`
        LinkedInLoginAuth(qParam).then((res => {
            if (res.status) {
                window.location.href = constant.component.editProfile.url
            }
        }))
    }, [])
    return (
        <React.Fragment>
            <h1>Please wait Logging in</h1>
        </React.Fragment >
    )
}

export default withRouter(Index)