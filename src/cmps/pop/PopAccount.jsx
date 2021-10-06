import React, { useState } from 'react';
import CloseBtn from '../CloseBtn';
import TaskUser from '../TakUser';


export default function PopAccount({
  loggedInUser,
  history,
  logout,
  toggleIsAccountPopOpen
}) {

  function onLogin() {
    history.push('/login');
    toggleIsAccountPopOpen();
  }
  
  function onSignup() {
    history.push('/signup')
    toggleIsAccountPopOpen();
  }
  
  async function onLogout() {
    await logout();
    history.push('/login');
    toggleIsAccountPopOpen();
  }

  return (
    <div onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Account</p>
      <CloseBtn onClick={toggleIsAccountPopOpen} />
      <div className="pop-container pop-account">
        {loggedInUser &&
          <div className="have-user">

            <div className="user-details flex align-start">
              <TaskUser user={{ imgUrl: loggedInUser.profileImg }} />
              <p>{loggedInUser.username}</p>
            </div>
            <button  onClick={onLogout} className="pop-btn" >Log out</button>
          </div>
        }
        {!loggedInUser &&
          <div className="dont-have-user">
            <button onClick={onLogin} className="pop-btn" >Log in</button>
            <button onClick={onSignup} className="pop-btn" >Sign up</button>
          </div>

        }
      </div>
    </div >
  )
}

// 210718001451