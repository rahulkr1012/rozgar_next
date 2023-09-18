import Image from 'next/image';
import React from 'react';

import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

export default function LinkedInPage() {
    const { linkedInLogin } = useLinkedIn({

        clientId: '86g79ix2lcuzek',
        scope: 'r_liteprofile r_emailaddress',
        redirectUri: `${typeof window === 'object' && window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
            console.log(code)
            // window.close()
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return (
        <Image
            onClick={linkedInLogin}
            src={linkedin}
            alt="Linked In"
            style={{color:'transparent',
                maxWidth: '170px',
                cursor: 'pointer',
                height:'40px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 1px 1px 0px',
                objectFit: 'contain',
                background: '#0078b6',
                borderRadius: '4px',
             }}
        />
    );
}