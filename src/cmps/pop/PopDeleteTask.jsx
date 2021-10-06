import React, { useState } from 'react';
import CloseBtn from '../CloseBtn';


export default function PopDeleteTask({
  toggleCurrPop,
  taskId,
  taskTitle,
  deleteTask,
  setCurrTask,
  width,
  height,
  isFromPreview
}) {

  const [elPop, setElPop] = useState(null);

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


  function onDeleteTask() {
    setCurrTask('');
    deleteTask(taskId);
  }



  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Delete {taskTitle}?</p>
      <CloseBtn onClick={() => { toggleCurrPop('move') }} />
      <div className="pop-container pop-delete-task">
        <p>Deleting a task is permanent and there is no way to get it back.</p>
        <button onClick={onDeleteTask} className="red-btn">Delete task</button>
      </div>
    </div >
  )
}

