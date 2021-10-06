import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GrFacebook } from 'react-icons/all';


export default function LoginFacebook({ SocialSignup }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function responseFacebook(response) {

    const user = {
      signupBy: 'facebook',
      username: response.name,
      password: response.id,
      imgUrl: response.picture.data.url
      
    }
    SocialSignup(user);

  }


  let fbContent = null;

  if (!isLoggedIn) {
    fbContent = (
      <FacebookLogin
        appId="243347017341204"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook"
        icon={<GrFacebook />}
      />
    )

  }



  return (
    <div className='Login-facebook'>
      {fbContent}
    </div>
  )
}
