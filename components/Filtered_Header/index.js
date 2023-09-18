import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { browserName } from "react-device-detect"
const Loader = dynamic(() => import('components/common/HeaderLoader'), { ssr: false });

let AuthHeader = dynamic(() => import('components/common/AuthHeader'), {
  loading: () => <Loader />, ssr: false
})
let Header = dynamic(() => import('components/common/header'), {
  loading: () => <Loader />, ssr: false
});

function index(props) {
  const { ud, router } = props
  const [mobileView, setMobileView] = useState(false)


  useEffect(() => {

    if (router.asPath.includes('mobile=true') || browserName.includes('Chrome WebView')) {
      setMobileView(true)
    }

  }, [])

  return (<React.Fragment>
    {!mobileView && (ud == null ? <Header /> : <AuthHeader />)}
  </React.Fragment>
  )
}

export default withRouter(index);
