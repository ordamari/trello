import React, { useState } from 'react';
import CloseBtn from '../CloseBtn';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


export default function PopChecklist({
  toggleCurrPop,
  taskId,
  board,
  addChecklist,
  width,
  height,
  isFromPreview
}) {

  const [checklistName, setChecklistName] = useState('Checklist');
  const [copyFromData, setCopyFromData] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [elPop, setElPop] = useState(null);

  function getStyle() {
    if (!elPop) return {};
    var style = {};
    if (!(width > elPop.getBoundingClientRect().right)) style.left = width - elPop.getBoundingClientRect().right - 10;
    if (!(height > elPop.getBoundingClientRect().bottom)) {
      if (elPop.getBoundingClientRect().top < elPop.getBoundingClientRect().bottom - elPop.getBoundingClientRect().top) {
        style.top = '50%';
        style.transform = `translate(0, -50%)`;
      } else {
        style.top = 'unset';
        style.bottom = isFromPreview ? 30 : 50;
      }
    }
    return style;
  }


  const boardChecklists = Object.values(board.tasks).reduce((acc, task) => {
    const checklists = task.checklists.map(checklist => {
      return checklist.title
    })
    if (checklists.length) acc.push({ taskId: task.id, taskTitle: task.title, checklists })
    return acc
  }, [])

  function onSetCopyFrom(taskId, checklistIdx, checklistTitle) {
    setCopyFromData({ taskId, checklistIdx, checklistTitle })
    toggleIsSelectOpen();
  }

  function toggleIsSelectOpen() {
    setIsSelectOpen(prevState => !prevState);
  }

  function resetCopyFromData() {
    setCopyFromData(null);
    toggleIsSelectOpen();
  }

  function onAddChecklist() {
    addChecklist(taskId, checklistName, copyFromData);
    toggleCurrPop('checklist');
  }

  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Add checklist</p>
      <CloseBtn onClick={() => { toggleCurrPop('checklist') }} />

      <div className="pop-container pop-checklist">
        <p className="pop-middle-title">Title</p>
        <input
          className="pop-input"
          value={checklistName}
          onChange={({ target }) => { setChecklistName(target.value) }}
          type="text"
          autoFocus={true}
        />
        <p className="pop-middle-title">Copy items from...</p>
        <button onClick={toggleIsSelectOpen} className="select-btn">
          {copyFromData ? copyFromData.checklistTitle : '(none)'} <KeyboardArrowDownIcon />
        </button>
        <div className={`copy-from ${isSelectOpen ? 'open' : ''}`}>
          <button onClick={resetCopyFromData} className="grey-btn">(none)</button>
          {boardChecklists.map(taskChecklists => (
            <div key={taskChecklists.taskId}>
              <p className="mini-title">{taskChecklists.taskTitle}</p>
              { taskChecklists.checklists.map((checklist, idx) => (
                <button onClick={() => { onSetCopyFrom(taskChecklists.taskId, idx, checklist) }} className="grey-btn" key={idx}>{checklist}</button>
              ))}
            </div>
          ))
          }
        </div>
        <button onClick={onAddChecklist} className="blue-btn">Add</button>
      </div>
    </div>
  )
}

