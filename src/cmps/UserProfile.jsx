import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function UserProfile({ user, onLogout, history }) {

  return (
    <div className='main-container'>

      <img src={user.profileImg} alt="" />
      <h2>Hi, {user.username}</h2>
      <button className='logout' onClick={onLogout} >logOut</button>
    </div>
  )
}

