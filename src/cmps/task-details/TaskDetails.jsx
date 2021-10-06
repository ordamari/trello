import React, { useState } from 'react';
import { MdLabelOutline, IoPersonOutline, BiImageAlt, FiEye, FiCheckSquare, AiOutlineArrowRight, AiOutlineCheck, AiOutlineDelete } from 'react-icons/all'
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import TaskDetailsMenu from './TaskDetailsMenu';
import TaskDetailsMembers from './TaskDetailsMembers';
import TaskDetailsLabels from './TaskDetailsLabels';
import TaskDetailsDueDate from './TaskDetailsDueDate';
import TaskDetailsDescription from './TaskDetailsDescription';
import TaskDetailsChecklist from './TaskDetailsChecklist';
import { eventBusService } from '../../services/eventBusService';
import PopMembers from '../pop/PopMembers';
import PopLabels from '../pop/PopLabels';
import PopChecklist from '../pop/PopChecklist';
import PopDates from '../pop/PopDates';
import PopCover from '../pop/PopCover';
import PopMove from '../pop/PopMove';
import PopDeleteTask from '../pop/PopDeleteTask';
import useWindowDimensions from '../../services/useWindowDimensions';
import TaskDetailsCover from './TaskDetailsCover';
import TaskDetailsTitle from './TaskDetailsTitle';



export default function TaskDetails({
  deleteChecklistTask,
  convertChecklistTaskToTask,
  deleteTask,
  moveTask,
  updateTaskCover,
  changeIsCoverTaskTextColorBlack,
  addNewAttachment,
  addDateToTask,
  addChecklist,
  updateLabel,
  deleteLabel,
  addLabelToTask,
  toggleTaskMember,
  toggleTaskIsWatch,
  addTaskToTasklist,
  updateChecklistTaskName,
  updateChecklistName,
  toggleIsDoneTaskInChecklist,
  deleteChecklist,
  toggleIsShowCheckedItems,
  updateTaskName,
  updateTaskDate,
  updateTaskDescription,
  setCurrTask,
  board,
  taskId,
  listTitle,
  toggleTaskLabel,
  updateIsCoverTop
}) {

  const [currPop, setCurPop] = useState('');
  const { height, width } = useWindowDimensions();

  const colorsMap = {
    green: {
      backgroundColor: '#61bd4f',
    },
    yellow: {
      backgroundColor: '#f2d600',
    },
    orange: {
      backgroundColor: '#ff9f1a',
    },
    red: {
      backgroundColor: '#eb5a46',
    },
    purple: {
      backgroundColor: '#c377e0',
    },
    blue: {
      backgroundColor: '#0079bf',
    },
  }

  function onContainerClick(ev) {
    if (ev) ev.stopPropagation();
    setCurPop('');
    eventBusService.emit('close-title-input', null);
    eventBusService.emit('close-desc-input', null);
    eventBusService.emit('close-checklist-input', null);
    eventBusService.emit('close-details-pops', null);
  }

  function toggleCurrPop(reqPop) {
    onContainerClick();
    if (currPop == reqPop) setCurPop('');
    else setCurPop(reqPop);
  }

  function getTaskColumn() {
    return Object.values(board.columns).find(column => column.taskIds.some(task => task === taskId))
  }

  function onToggleCurrPop(ev, pop) {
    ev.stopPropagation();
    toggleCurrPop(pop);
  }

  return (
    <div
      onClick={() => { setCurrTask('') }}
      className='task-details'
    >
      <div
        onClick={onContainerClick}
        className="container"
      >
        <TaskDetailsCover
          board={board}
          colorsMap={colorsMap}
          taskId={taskId}
        />

        <TaskDetailsTitle
          board={board}
          taskId={taskId}
          updateTaskName={updateTaskName}
          closeOtherInputs={onContainerClick}
          listTitle={listTitle}
          setCurrTask={setCurrTask}
        />

        <div className="flex details-container">
          <div className="data">
            <div className="data-container">
              {!!board.tasks[taskId].members.length &&
                <TaskDetailsMembers
                  boardMembers={board.members}
                  taskMembers={board.tasks[taskId].members}
                  toggleTaskMember={toggleTaskMember}
                  taskId={taskId}
                  width={width}
                  closeOtherInputs={onContainerClick}
                  height={height}
                />
              }
              {!!board.tasks[taskId].labels.length &&
                <TaskDetailsLabels
                  boardLabels={board.labels}
                  taskLabels={board.tasks[taskId].labels}
                  addLabelToTask={addLabelToTask}
                  taskId={taskId}
                  toggleTaskLabel={toggleTaskLabel}
                  updateLabel={updateLabel}
                  deleteLabel={deleteLabel}
                  width={width}
                  closeOtherInputs={onContainerClick}
                  height={height}
                />
              }
              {board.tasks[taskId].date &&
                <TaskDetailsDueDate
                  date={board.tasks[taskId].date}
                  updateTaskDate={updateTaskDate}
                  taskId={taskId}
                  addDateToTask={addDateToTask}
                  width={width}
                  height={height}
                  closeOtherInputs={onContainerClick}
                />
              }
            </div>
            <TaskDetailsDescription
              closeOtherInputs={onContainerClick}
              taskId={taskId}
              updateTaskDescription={updateTaskDescription}
              description={board.tasks[taskId].description}
            />

            {board.tasks[taskId].checklists.map((checklist, idx) => (
              <TaskDetailsChecklist
                key={idx}
                closeOtherInputs={onContainerClick}
                addTaskToTasklist={addTaskToTasklist}
                updateChecklistTaskName={updateChecklistTaskName}
                updateChecklistName={updateChecklistName}
                toggleIsDoneTaskInChecklist={toggleIsDoneTaskInChecklist}
                deleteChecklist={deleteChecklist}
                checklistIdx={idx}
                taskId={taskId}
                toggleIsShowCheckedItems={toggleIsShowCheckedItems}
                checklist={checklist}
                deleteChecklistTask={deleteChecklistTask}
                convertChecklistTaskToTask={convertChecklistTaskToTask}
                columnId={getTaskColumn().id}
                width={width}
                height={height}
              />
            ))

            }
          </div>
          <TaskDetailsMenu
            onToggleCurrPop={onToggleCurrPop}
            toggleCurrPop={toggleCurrPop}
            currPop={currPop}
            board={board}
            taskId={taskId}
            toggleTaskMember={toggleTaskMember}
            width={width}
            height={height}
            addLabelToTask={addLabelToTask}
            toggleTaskLabel={toggleTaskLabel}
            updateLabel={updateLabel}
            deleteLabel={deleteLabel}
            addChecklist={addChecklist}
            deleteTask={deleteTask}
            addDateToTask={addDateToTask}
            addNewAttachment={addNewAttachment}
            changeIsCoverTaskTextColorBlack={changeIsCoverTaskTextColorBlack}
            updateTaskCover={updateTaskCover}
            getTaskColumn={getTaskColumn}
            moveTask={moveTask}
            toggleTaskIsWatch={toggleTaskIsWatch}
            setCurrTask={setCurrTask}
            updateIsCoverTop={updateIsCoverTop}
          />
        </div>
      </div>
    </div>
  )
}

