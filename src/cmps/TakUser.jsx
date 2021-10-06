import React, { useEffect, useState } from 'react';


export default function TaskUser({user}) {


  return (
    <div className='task-user'>
      <img src={user.imgUrl} alt="Profile image" />
    </div>
  )
}

