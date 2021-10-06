import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/all';


export default function LoginGoogle({ SocialSignup }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function responseGoogle(response) {
    const user = {
      signupBy: 'google',
      username: response.profileObj.name,
      password: response.googleId,
      imgUrl: response.profileObj.imageUrl
    }

    SocialSignup(user);
  }


  let googleContent = null;

  if (!isLoggedIn) {
    googleContent = (
      <GoogleLogin
        clientId="683885007501-prmbe23c37d70tvuo8ejt54vet9q9vf6.apps.googleusercontent.com"
        render={renderProps => (
          <button
            className='google'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FcGoogle />
            <span>Continue with Google</span>
        
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    )

  }



  return (
    <div className='Login-facebook'>
      {googleContent}
    </div>
  )
}
