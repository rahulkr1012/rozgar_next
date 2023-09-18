import '@/styles/css/rmaking/pillar-1.css' 
import '@/styles/orbit-1.css'
import '@/styles/css/bootstrap.css';
import '@/styles/css/normalize.css';
import '@/styles/css/fontawesome/fontawesome-all.css';
import '@/styles/css/font-awesome.min.css';
import '@/styles/css/themify-icons.css';
import '@/styles/css/owl.carousel.css';
import '@/styles/css/linearicons.css';
import '@/styles/css/prettyPhoto.css';
import '@/styles/css/magnific-popup.css';
import '@/styles/css/chartist.css';
import '@/styles/css/scrollbar.css';
import '@/styles/css/chosen.css';
import '@/styles/globals.css';
import '@/styles/css/color.css';
import '@/styles/css/transitions.css';
import '@/styles/responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/MultiRangeSlider.css';
import '@/styles/css/government-result.css';
import '@/styles/Fonts.module.css';
import '@/styles/simmerCss/simmer.css';
// import '@/styles/CoverLetter.css';

import { browserName } from "react-device-detect"
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper, makeStore as store } from "../store/store";
import { Provider } from "react-redux";

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { CookiesProvider } from 'react-cookie';
import Loader from 'components/Loader'

const Footer = dynamic(
  () => import("components/common/footer"),
  {
    ssr: true,
  }
);

function App({ Component, pageProps }) {

  const [mobileView, setMobileView] = useState(false)
  const [hideFooter, setHideFooter] = useState(false)

  useEffect(() => {
    if (window.location.href.includes('mobile=true') || browserName.includes('Chrome WebView') || window.location.href.includes('register') || window.location.href.includes('register')||window.location.href.includes('affiliate')||window.location.href.includes('discussionForumSignIn')||window.location.href.includes('signin')) {
      setMobileView(true)
    }

    // typeof document !== undefined
    //   ? require("../../public/js/vendor/bootstrap.min.js")
    //   : null;
  }, [])



  return (
    <React.Fragment>

      <CookiesProvider>
        <Component {...pageProps} />
        {!mobileView && <Footer />}
      </CookiesProvider>
    </React.Fragment>
  )

  // }

}

export default wrapper.withRedux(App);
