import React, { useEffect, useState } from 'react';
import { eventBusService } from '../../services/eventBusService';
import ChecklistAfterTask from './ChecklistAfterTask';
import ChecklistHeader from './ChecklistHeader';
import ChecklistProggres from './ChecklistProggres';
import ChecklistTaskPreview from './ChecklistTaskPreview';


export default function TaskDetailsChecklist({
  closeOtherInputs,
  addTaskToTasklist,
  updateChecklistTaskName,
  updateChecklistName,
  toggleIsDoneTaskInChecklist,
  checklist,
  toggleIsShowCheckedItems,
  taskId,
  columnId,
  checklistIdx,
  deleteChecklist,
  deleteChecklistTask,
  convertChecklistTaskToTask,
  width,
  height
}) {

  const [isAddChecklistTaskOpen, setIsAddChecklistTaskOpen] = useState(false);
  const [choosenTask, setChoosenTask] = useState(-1);
  const [newTaskName, setNewTaskName] = useState('');
  const [checklsitTaskMenu, setChecklsitTaskMenu] = useState(-1);
  const [choosenTaskName, setChoosenTaskName] = useState('');

  useEffect(() => {
    eventBusService.on('close-checklist-input', onCloseInputs);
  }, [])

  function stop(ev) {
    ev.stopPropagation(ev)
  }

  function getCheckedPrecent() {
    const numOfDone = getNumOfChecked();
    const precent = Math.round(numOfDone / checklist.list.length * 100);
    return isNaN(precent) ? 0 : precent
  }

  function getNumOfChecked() {
    return checklist.list.reduce((acc, task) => {
      if (task.isDone) acc++;
      return acc
    }, 0)
  }

  function onCloseInputs() {
    eventBusService.emit('close-header-input', null);
    setChoosenTask(-1);
    setIsAddChecklistTaskOpen(false);
    setChecklsitTaskMenu(-1);
  }

  function onChooseTask(ev, idx) {
    stop(ev)
    closeOtherInputs();
    setChoosenTask(idx);
    setChoosenTaskName(checklist.list[idx].task);
  }

  function onUpdateTakName(taskIdx) {
    updateChecklistTaskName(taskId, checklistIdx, taskIdx, choosenTaskName);
    setChoosenTask(-1);
  }

  function onAddTaskToTasklist() {
    addTaskToTasklist(taskId, checklistIdx, newTaskName);
    setNewTaskName('');
    setIsAddChecklistTaskOpen(false);
  }

  function onOpenAddChecklistTask(ev) {
    stop(ev)
    closeOtherInputs();
    setIsAddChecklistTaskOpen(true);

  }

  function onSetChecklsitTaskMenu(idx, ev) {
    if (ev) stop(ev);
    closeOtherInputs();
    if (idx === checklsitTaskMenu) setChecklsitTaskMenu(-1);
    else setChecklsitTaskMenu(idx);
  }

  return (
    <div className='task-details-checklist'>
      <ChecklistHeader
        getNumOfChecked={getNumOfChecked}
        toggleIsShowCheckedItems={toggleIsShowCheckedItems}
        taskId={taskId}
        checklistIdx={checklistIdx}
        checklist={checklist}
        deleteChecklist={deleteChecklist}
        closeOtherInputs={closeOtherInputs}
        updateChecklistName={updateChecklistName}
      />
      <ChecklistProggres
        getCheckedPrecent={getCheckedPrecent}
      />
      <div className="task-list">
        {checklist.list.map((task, idx) => (
          (checklist.isShowCheckedItems || !task.isDone) &&
          <ChecklistTaskPreview
            key={idx}
            taskId={taskId}
            checklistIdx={checklistIdx}
            idx={idx}
            task={task}
            choosenTask={choosenTask}
            onUpdateTakName={onUpdateTakName}
            setChoosenTask={setChoosenTask}
            onChooseTask={onChooseTask}
            onSetChecklsitTaskMenu={onSetChecklsitTaskMenu}
            toggleIsDoneTaskInChecklist={toggleIsDoneTaskInChecklist}
            choosenTaskName={choosenTaskName}
            setChoosenTaskName={setChoosenTaskName}
            checklsitTaskMenu={checklsitTaskMenu}
            deleteChecklistTask={deleteChecklistTask}
            convertChecklistTaskToTask={convertChecklistTaskToTask}
            columnId={columnId}
            width={width}
            height={height}
          />
        ))}
      </div>
      <ChecklistAfterTask
        getCheckedPrecent={getCheckedPrecent}
        checklist={checklist}
        isAddChecklistTaskOpen={isAddChecklistTaskOpen}
        newTaskName={newTaskName}
        setNewTaskName={setNewTaskName}
        setIsAddChecklistTaskOpen={setIsAddChecklistTaskOpen}
        onOpenAddChecklistTask={onOpenAddChecklistTask}
        onAddTaskToTasklist={onAddTaskToTasklist}
      />
    </div>
  )
}

