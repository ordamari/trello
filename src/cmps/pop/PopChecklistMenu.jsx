import React, { useState } from 'react';
import CloseBtn from '../CloseBtn';


export default function PopChecklistMenu({
  onSetChecklsitTaskMenu,
  deleteChecklistTask,
  convertChecklistTaskToTask,
  taskId,
  checklistIdx,
  taskIdx,
  columnId,
  width,
  height
}) {

  const [elPop, setElPop] = useState(null);

  function getStyle() {
    if (!elPop) return {};
    console.log(height);
    console.log(elPop.getBoundingClientRect().bottom);
    var style = {};
    if (!(width > elPop.getBoundingClientRect().right)) style.left = width - elPop.getBoundingClientRect().right-10;
    if (!(height > elPop.getBoundingClientRect().bottom)) {
      style.top = 'unset';
      style.bottom = 25;
    }
    return style;
  }

  function onDeleteChecklistTask() {
    deleteChecklistTask(taskId, checklistIdx, taskIdx);
    onSetChecklsitTaskMenu(-1);
  }

  function onConvertChecklistTaskToTask() {
    convertChecklistTaskToTask(taskId, checklistIdx, taskIdx, columnId);
    onSetChecklsitTaskMenu(-1);
  }

  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Item actions</p>
      <CloseBtn onClick={() => { onSetChecklsitTaskMenu(-1) }} />
      <div className="pop-container pop-checklist-menu">
        <div className="flex column btns-container-menu">
          <button onClick={onConvertChecklistTaskToTask} >Convert to card</button>
          <button onClick={onDeleteChecklistTask} >Delete</button>
        </div>
      </div>
    </div >
  )
}

