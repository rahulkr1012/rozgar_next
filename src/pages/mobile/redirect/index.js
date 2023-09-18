import React, { useEffect } from 'react'
const Redirect = () => {
    useEffect(() => {
        function getOS() {
            var userAgent = window.navigator.userAgent,
                platform = window.navigator.platform,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
            } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
            }

            return os;
        }

        const os = getOS();
        window.location.href = os === 'Android' ? 'https://play.google.com/store/apps/details?id=com.app.rozgar' : os === 'iOS' ? 'https://apps.apple.com/app/id6445827267' : 'https://rozgar.com'


    }, [])
    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default Redirect