import React, { useEffect, useState } from 'react';
import CloseBtn from '../CloseBtn';
import Calendar from 'react-calendar';
import { utilService } from '../../services/utilService';


export default function PopDates({
  toggleCurrPop,
  taskId,
  date,
  addDateToTask,
  width,
  height,
  isFromPreview
}) {

  const [calenderDate, setCalenderDate] = useState(getCalenderDate());
  const [dateText, setDateText] = useState(getDateFromCalender());
  const [timeInDay, setTimeInDay] = useState(defaultTimeInDay());
  const [lastTimeInDay, setLastTimeInDay] = useState(defaultTimeInDay());
  const [isHaveDueTime, setIsHaveDueTime] = useState(true)
  const [elPop, setElPop] = useState(null);


  useEffect(() => {
    setDateText(getDateFromCalender());
  }, [calenderDate])

  function getStyle() {
    if (!elPop) return {};
    var style = {};
    if (!(width > elPop.getBoundingClientRect().right)) style.left = width - elPop.getBoundingClientRect().right - 10;
    if (!(height > elPop.getBoundingClientRect().bottom)) {
      if (elPop.getBoundingClientRect().top < elPop.getBoundingClientRect().bottom - elPop.getBoundingClientRect().top + 50) {
        style.top = '50%';
        style.transform = `translate(0, -50%)`;
      } else {
        style.top = 'unset';
        style.bottom = isFromPreview ? 30 : 50;
      }
    }
    return style;
  }

  function getCalenderDate() {
    const oldTimestamp = date ? date.timestamp : Date.now();
    const newDate = new Date(oldTimestamp);
    const timestamp = oldTimestamp - (((newDate.getHours() - 3) * 1000 * 60 * 60) + (newDate.getMinutes() * 1000 * 60) + (newDate.getSeconds() * 1000 * 60) + newDate.getMilliseconds());
    return new Date(timestamp);
  }

  function getDateFromCalender() {
    if (!calenderDate) return '';
    var dateText = '';
    dateText += (calenderDate.getDate() < 10) ? '0' + calenderDate.getDate() + '/' : calenderDate.getDate() + '/'
    dateText += ((calenderDate.getMonth() + 1) < 10) ? '0' + (calenderDate.getMonth() + 1) + '/' : (calenderDate.getMonth() + 1) + '/'
    dateText += calenderDate.getFullYear()
    return dateText;
  }

  function updateCalenderDateFromInput() {
    if (!utilService.checkDateStr(dateText)) setDateText(getDateFromCalender());
    else {
      const [day, month, year] = dateText.split('/');
      const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0);
      const newDateTimestamp = newDate.getTime();
      setCalenderDate(new Date(newDateTimestamp));
    }
  }

  function defaultTimeInDay() {
    if (!date) return '02:00 PM'
    const time = new Date(date.timestamp);
    return utilService.timeToString(time);
  }

  function onCreateNewDate() {
    var newDate = null;
    if (isHaveDueTime) {
      const calenderTimestamp = calenderDate.getTime();
      const timeStr = utilService.checkTimeStr(timeInDay) ? timeInDay : lastTimeInDay;
      const [time, AMorPM] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = (hours === 12) ? 0 : hours;
      const timeMiliseconds = (1000 * 60 * minutes) + (1000 * 60 * 60 * hours) + (AMorPM === 'PM' ? 1000 * 60 * 60 * 12 : 0);
      const newDateTimestamp = calenderTimestamp + timeMiliseconds;
      newDate = {
        timestamp: newDateTimestamp,
        isDone: false
      }
    }
    addDateToTask(taskId, newDate);
    toggleCurrPop('dates')
  }

  function removeDueDate() {
    addDateToTask(taskId, null);
    toggleCurrPop('dates')
  }

  function updateTimeInDay() {
    if (utilService.checkTimeStr(timeInDay)) setLastTimeInDay(timeInDay);
    else setTimeInDay(lastTimeInDay)
  }

  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Dates</p>
      <CloseBtn onClick={() => { toggleCurrPop('dates') }} />

      <div className="pop-container pop-dates">
        <Calendar
          className='cal'
          onChange={setCalenderDate}
          value={calenderDate}
          calendarType="Hebrew"
          locale="ISR"

        />
        <p className={`pop-middle-title ${isHaveDueTime ? 'have-due' : 'dont-have-due'}`}>Due date</p>
        <div className={`flex inputs-container ${(isHaveDueTime) ? 'have-due' : 'dont-have-due'}`}>
          <input
            type="checkbox"
            defaultChecked={isHaveDueTime}
            onClick={() => { setIsHaveDueTime(prevState => !prevState) }}
          />
          <input
            className={`date-input ${utilService.checkDateStr(dateText) ? 'isValid' : 'isntValid'}`}
            placeholder="DD/MM/YYYY"
            type="text"
            value={dateText}
            onChange={({ target }) => { setDateText(target.value) }}
            onBlur={updateCalenderDateFromInput}
          />
          <input
            className={`time-input ${utilService.checkTimeStr(timeInDay) ? 'isValid' : 'isntValid'}`}
            placeholder="h:mm A"
            type="text"
            value={timeInDay}
            onChange={({ target }) => { setTimeInDay(target.value) }}
            onBlur={updateTimeInDay}
          />
        </div>

        <div onClick={onCreateNewDate} className="blue-btn">Save</div>
        <div onClick={removeDueDate} className="grey-btn">Remove</div>

      </div>
    </div>
  )
}

