import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';



export default function MenuBtn({onClick}) {

  return (
    <button type="button" className="menu-btn" onClick={onClick}><BsThreeDots/></button>
  )
}

