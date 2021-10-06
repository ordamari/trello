import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import CloseBtn from '../CloseBtn';
import MenuBtn from '../MenuBtn';
import PopChecklistMenu from '../pop/PopChecklistMenu';


export default function ChecklistTaskPreview({
  taskId,
  checklistIdx,
  idx,
  task,
  choosenTask,
  onUpdateTakName,
  setChoosenTask,
  onChooseTask,
  onSetChecklsitTaskMenu,
  toggleIsDoneTaskInChecklist,
  choosenTaskName,
  setChoosenTaskName,
  checklsitTaskMenu,
  deleteChecklistTask,
  convertChecklistTaskToTask,
  columnId,
  width,
  height,
}) {

  function stop(ev) {
    ev.stopPropagation()
  }


  return (
    <div  className="flex align-start task-in-list">
      <input
        className="checkbox"
        onClick={() => { toggleIsDoneTaskInChecklist(taskId, checklistIdx, idx) }}
        type="checkbox"
        defaultChecked={task.isDone}
      />
      {choosenTask === idx ? (
        <form>
          <TextareaAutosize
            onClick={stop}
            value={choosenTaskName}
            onChange={({ target }) => setChoosenTaskName(target.value)}
          />
          <div className="flex align-center justify-space-between">
            <div className="flex align-center">
              <button onClick={() => { onUpdateTakName(idx) }} className="blue-btn">save</button>
              <CloseBtn onClick={() => { setChoosenTask(-1) }} />
            </div>
          </div>
        </form>
      ) : (
        <div className="flex align-start grow">
          <p
            onClick={(ev) => { onChooseTask(ev, idx) }}
            className={`grow ${task.isDone ? 'checked' : ''}`}
          >
            {task.task}
          </p>
          <div className="menu-btn-container">
            <MenuBtn onClick={(ev) => { onSetChecklsitTaskMenu(idx, ev) }} />
            {checklsitTaskMenu === idx &&
              <PopChecklistMenu
                onSetChecklsitTaskMenu={onSetChecklsitTaskMenu}
                deleteChecklistTask={deleteChecklistTask}
                convertChecklistTaskToTask={convertChecklistTaskToTask}
                taskId={taskId}
                checklistIdx={checklistIdx}
                taskIdx={idx}
                columnId={columnId}
                width={width}
                height={height}
              />
            }
          </div>

        </div>
      )}
    </div>
  )
}

