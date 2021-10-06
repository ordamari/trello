import React, { useState } from 'react';
import { GrList } from 'react-icons/gr';
import TextareaAutosize from 'react-textarea-autosize';



export default function TaskDetailsActivity({ activity }) {

  const [isFocus,setIsFocus]= useState(false);
  const [newActivity,setNewActivity]= useState('')


  return (
    <div className='task-details-activity'>
      <p className="middle-title"><GrList /> Activity</p>
      <form className={`flex column align-start ${isFocus?'focus':'blur'}`}>
        <TextareaAutosize
        placeholder="Write a comment..."
        maxRows={6}
        onFocus={()=>{setIsFocus(true)}}
        onBlur={()=>{if(!newActivity) setIsFocus(false)}}
        value={newActivity}
        onChange={({target})=>{setNewActivity(target.value)}}
        />
        <button className="blue-btn">Save</button>
      </form>
    </div>
  )
}

