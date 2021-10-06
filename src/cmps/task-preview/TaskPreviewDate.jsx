import React, { useEffect, useState } from 'react';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { IoMdCheckboxOutline } from 'react-icons/io';



export default function TaskPreviewDate({ date, taskId, updateTaskDate }) {

  function getTime() {
    let timeStr = ''
    const time = new Date(date.timestamp);
    timeStr += time.toLocaleString('default', { month: 'short' }) + " "
    timeStr += time.getDate();
    return timeStr
  }

  function getClass() {
    if (date.isDone) return 'green'
    if (date.timestamp < Date.now()) return 'red'
    if (date.timestamp < Date.now() + (1000 * 60 * 60 * 24)) return 'yellow'
  }

  function toggleIsDone(ev) {
    ev.stopPropagation(ev);
    const newDate = {
      ...date,
      isDone: !date.isDone
    }

    updateTaskDate(newDate, taskId)
  }

  return (
    <button
      onClick={toggleIsDone}
      className={`task-preview-date ${getClass()}`}
    >
      <WatchLaterOutlinedIcon className='clock-icon' />
      {
        date.isDone ? <IoMdCheckboxOutline className='check-icon' /> : <ImCheckboxUnchecked className='check-icon uncheck-icon' />
      }
      <span>{getTime()}</span>
    </button>
  )
}

