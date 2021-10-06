import React, { useEffect, useState } from 'react';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiCheckSquare } from 'react-icons/fi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { IoMdCheckboxOutline } from 'react-icons/io';



export default function TaskPreviewChecklist({ checklists }) {


  function getNumOfTaskInChecklists() {
    return checklists.reduce((acc, checklist) => {
      acc += checklist.list.length
      return acc
    }, 0)
  }

  function getNumOfDoneTaskInChecklists() {
    return checklists.reduce((acc, checklist) => {
      checklist.list.forEach(task => {
        if (task.isDone) acc++;
      });
      return acc
    }, 0)
  }

  function checkAllTaskDone(){
    return !checklists.some(checklist=>checklist.list.some(task=>!task.isDone));
  }



  return (
    <div className={`task-preview-checklist ${checkAllTaskDone()?'done':''}`}>
      <div className="container">
      <IoMdCheckboxOutline />
      <span>{getNumOfDoneTaskInChecklists()}/{getNumOfTaskInChecklists()}</span>
      </div>
    </div>
  )
}

