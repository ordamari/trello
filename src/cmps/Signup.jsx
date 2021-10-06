import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginGoogle from './LoginGoogle';


export default function Signup({ toggleIsRegister, registerInfo, handleChange, imgUrl, uploadImg, onSignup, SocialSignup, history }) {
  return (
    <div className='signup' >
      <h2>Sign up for your account</h2>

      <form>
        <input onChange={handleChange} name="username" type="text" autoComplete="off" placeholder='Enter name' value={registerInfo.username} />
        <input onChange={handleChange} name="password" type="password" autoComplete="off" placeholder='Enter password' value={registerInfo.password} />
        <label htmlFor="img-upload">
          <div className='profile-img'>
            <p>Click to select Profile Image</p>
            <img src={imgUrl} alt="" />
          </div>
        </label>
        <input hidden type="file" className="file-input" name="img-upload" id="img-upload"
          onChange={uploadImg} />

        <button className='submit' type="submit" onClick={(ev) => { onSignup(ev, 'wixer') }}>Signup</button>
      </form>
      <div className="or">
        <p>OR</p>
      </div>
      <div className='social-login'>
        <LoginGoogle SocialSignup={SocialSignup} />
      </div>
      <hr />
      <p className="toggle-page" onClick={() =>{history.push('/login')}} >Already have an account? Log in</p>
    </div>
  )
}

