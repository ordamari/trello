import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';



export default function CloseBtn({onClick}) {

  return (
    <button type="button" className="close-btn" onClick={onClick}><CloseIcon/></button>
  )
}

