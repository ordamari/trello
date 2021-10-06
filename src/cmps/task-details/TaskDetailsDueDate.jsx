import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PopDates from '../pop/PopDates';
import { eventBusService } from '../../services/eventBusService';


export default function TaskDetailsDueDate({
  date,
  updateTaskDate,
  taskId,
  addDateToTask,
  width,
  closeOtherInputs,
  height
}) {

  const [popSituation, setPopSituation] = useState('');

  const colorsMap = {
    green: '#61bd4f',
    yellow: '#f2d600',
    red: '#eb5a46',
  }

  useEffect(() => {
    eventBusService.on('close-details-pops', () => { setPopSituation('') });
  }, [])

  function togglePopSituation(ev) {
    closeOtherInputs();
    if (ev) {
      if (typeof ev === 'object' && ev !== null) ev.stopPropagation();
    }

    if (popSituation) setPopSituation('');
    else (setPopSituation)('open');
  }

  function getTime() {
    let timeStr = ''
    const time = new Date(date.timestamp);
    const hours = time.getHours();
    timeStr += time.toLocaleString('default', { month: 'short' }) + " "
    timeStr += time.getDate() + " at ";
    timeStr += hours % 12 + ":"
    timeStr += (time.getMinutes() >= 10) ? time.getMinutes() : `0${time.getMinutes()}`;
    timeStr += (hours >= 12) ? ' PM' : ' AM';

    return timeStr
  }

  function getMsg() {
    if (date.isDone) return <span style={{ backgroundColor: colorsMap.green }} >COMPLETE</span>;
    if (date.timestamp < Date.now()) return <span style={{ backgroundColor: colorsMap.red }} >OVERDUE</span>
    if (date.timestamp < Date.now() + (1000 * 60 * 60 * 24)) return <span style={{ backgroundColor: colorsMap.yellow }} >DUE SOON</span>
  }

  function toggleIsDone() {
    const newDate = {
      ...date,
      isDone: !date.isDone
    }

    updateTaskDate(newDate, taskId)
  }


  return (
    <div className='task-details-due-date'>
      <p className="mini-title">DUE DATE</p>
      <form className="flex list align-center due-date">
        <input
          onClick={toggleIsDone}
          defaultChecked={date.isDone}
          type="checkbox"
        />
        <div className="open-due-date-pop-btn-container">
          <button
            className="due-date-details-btn"
            onClick={togglePopSituation}
          >
            {getTime()} {getMsg()} <KeyboardArrowDownIcon />
          </button>
          {popSituation &&
            <PopDates
              toggleCurrPop={togglePopSituation}
              taskId={taskId}
              date={date}
              addDateToTask={addDateToTask}
              width={width}
              height={height}
            />
          }
        </div>
      </form>

    </div>
  )
}

