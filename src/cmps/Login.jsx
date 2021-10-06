import React, { useEffect, useState } from 'react';
import LoginGoogle from './LoginGoogle';


export default function Login({ toggleIsRegister, loginInfo, handleChange, onLogin, SocialSignup,history }) {

  


  return (
    <div className='login'>
      <h2>Log in to Trello</h2>

      <form>
        <input onChange={handleChange} name="username" type="text" autoComplete="off" placeholder='Enter name' value={loginInfo.username} />
        <input onChange={handleChange} name="password" type="password" autoComplete="off" placeholder='Enter password' value={loginInfo.password} />
        <button className='submit' type="submit" onClick={onLogin}>Log in</button>
      </form>
      <div className="or">
        <p>OR</p>
      </div>
      <div className='social-login'>
        <LoginGoogle SocialSignup={SocialSignup} />
      </div>
      <hr />
      <p className="toggle-page" onClick={() =>{history.push('/signup')}} >Sign up for an account</p>

    </div>
  )
}

