import React, { useEffect, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { eventBusService } from '../../services/eventBusService';
import CloseBtn from '../CloseBtn';


export default function ChecklistHeader({
  getNumOfChecked,
  toggleIsShowCheckedItems,
  taskId, 
  checklistIdx,
  checklist,
  deleteChecklist,
  closeOtherInputs,
  updateChecklistName
}) {
  const [isChecklistNameOpen, setIsChecklistNameOpen] = useState(false);
  const [checklistName, setChecklistName] = useState(checklist.title);

  useEffect(() => {
    eventBusService.on('close-header-input', onCloseChecklistInput);
  }, [])

  function stop(ev) {
    ev.stopPropagation(ev)
  }


  function onOpenChecklistInput(ev) {
    if (ev) stop(ev)
    closeOtherInputs();
    setIsChecklistNameOpen(true);

  }

  function onCloseChecklistInput(ev) {
    if (ev) stop(ev)
    setChecklistName(checklist.title);
    setIsChecklistNameOpen(false);
  }

  function onUpdateChecklistName(ev) {
    stop(ev);
    updateChecklistName(taskId, checklistIdx, checklistName);
    setIsChecklistNameOpen(false);
  }


  return (
    <div className="Check-list-header flex align-center justify-space-between">
      <div
        onClick={onOpenChecklistInput}
        className={`middle-title ${isChecklistNameOpen ? 'checklist-name-form' : ''}`}
      >
        <FiCheckSquare />
        {isChecklistNameOpen ? (
          <form>
            <TextareaAutosize
              value={checklistName}
              onChange={({ target }) => { setChecklistName(target.value) }}
            />
            <div className="flex align-center">
              <button onClick={onUpdateChecklistName} className="blue-btn">Save</button>
              <CloseBtn onClick={onCloseChecklistInput} />
            </div>
          </form>
        ) : (
          <p  >{checklist.title}</p>
        )}
      </div>
      {!isChecklistNameOpen &&
        <div className="btns-container">
          {getNumOfChecked() > 0 &&
            <button
              onClick={() => { toggleIsShowCheckedItems(taskId, checklistIdx) }}
              className="grey-btn"
            >
              {checklist.isShowCheckedItems ? "Hide checked items" : `Show checked items (${getNumOfChecked()})`}
            </button>

          }
          <button onClick={() => deleteChecklist(taskId, checklistIdx)} className="grey-btn" >Delete</button>
        </div>
      }
    </div>
  )
}

