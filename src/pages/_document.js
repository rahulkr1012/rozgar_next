import { Html, Head, Main, NextScript } from "next/document";

import Script from "next/script";
 
// import Header from '../../components/common/header'
// import Footer from '../../components/common/footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KLM22JNN');`,
          }}
          defer
          strategy="lazyOnload"
        ></Script>


        {/* <Script
          dangerouslySetInnerHTML={{
            __html: `
      var scriptUrls = [
        'https://d2apjlzdwu53ds.cloudfront.net/js/vendor/jquery-3.3.1.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/vendor/jquery-library.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/vendor/bootstrap.min.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/jquery.basictable.min.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/jquery.sortable.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/jquery.collapse.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/owl.carousel.min.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/circle-progress.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/scrollbar.min.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/chosen.jquery.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/prettyPhoto.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/chartist.js',
        'https://checkout.razorpay.com/v1/checkout.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js',
        'https://d2apjlzdwu53ds.cloudfront.net/js/main.js'
      ];
      
      function loadScripts(urls, async = false, defer = false) {
        if (urls.length === 0) return;
      
        var script = document.createElement('script');
        script.src = urls[0];
        script.async = async;
        script.defer = defer;

        script.onload = function () {
          loadScripts(urls.slice(1), async, defer);
          
        };
        function getTemplateUrl(encoded_string,template_name){ return ('https://rozgar.com/'+template_name+'?mobile=true&data='+encoded_string) }
              window.functionResumeUrl = getTemplateUrl;
              var channel = new MessageChannel();
              window.RESUME_URL = channel;
              window.RESUME_URL.getTemplateUrl = functionResumeUrl;

            
        document.head.appendChild(script);
      }
      
      loadScripts(scriptUrls, true, false);
      `,
          }}
          defer
          strategy="lazyOnload"
        ></Script> */}
         
      </Head>

      <body>

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLM22JNN"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>

        <Main />
        <NextScript />
        
        <script src="https://rozgar.com/assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/vendor/jquery-3.3.1.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/vendor/jquery-library.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/jquery.basictable.min.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/jquery.sortable.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/owl.carousel.min.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/circle-progress.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/magnific-popup.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/scrollbar.min.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/chosen.jquery.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/prettyPhoto.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/chartist.js" strategy="lazyOnload"></script>
        <script src="https://rozgar.com/assets/js/appear.js" strategy="lazyOnload"></script>
        <Script src="https://rozgar.com/js/main.js" strategy="lazyOnload"></Script>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload"></Script>
       



      </body>
    </Html>
  );
}
