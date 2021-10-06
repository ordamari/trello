import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import CloseBtn from '../CloseBtn';


export default function ChecklistAfterTask({
  getCheckedPrecent,
  checklist,
  isAddChecklistTaskOpen,
  newTaskName,
  setNewTaskName,
  setIsAddChecklistTaskOpen,
  onOpenAddChecklistTask,
  onAddTaskToTasklist
  
}) {

  function stop(ev) {
    ev.stopPropagation(ev)
  }




  return (
    <div className="after-tasks">
        {getCheckedPrecent() === 100 && !checklist.isShowCheckedItems &&
          <p>Everything in this checklist is complete!</p>
        }
        {isAddChecklistTaskOpen ? (
          <form >
            <TextareaAutosize
              onClick={stop}
              placeholder="Add an item"
              value={newTaskName}
              onChange={({ target }) => setNewTaskName(target.value)}
            />
            <div className="flex align-center">
              <button onClick={onAddTaskToTasklist} className="blue-btn">save</button>
              <CloseBtn onClick={() => { setIsAddChecklistTaskOpen(false) }} />
            </div>

          </form>
        ) : (
          <button onClick={onOpenAddChecklistTask} className="grey-btn">Add an item</button>
        )

        }
      </div>
  )
}

