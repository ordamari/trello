import React, { useEffect, useState } from 'react';
import { MdLabelOutline, IoPersonOutline, BiImageAlt, FiEye, FiCheckSquare, AiOutlineArrowRight, AiOutlineCheck, AiOutlineDelete } from 'react-icons/all'
import PopMembers from '../pop/PopMembers';
import PopLabels from '../pop/PopLabels';
import PopChecklist from '../pop/PopChecklist';
import PopDates from '../pop/PopDates';
import PopCover from '../pop/PopCover';
import PopMove from '../pop/PopMove';
import PopDeleteTask from '../pop/PopDeleteTask';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';



export default function TaskDetailsMenu({
  onToggleCurrPop,
  toggleCurrPop,
  currPop,
  board,
  taskId,
  toggleTaskMember,
  width,
  height,
  addLabelToTask,
  toggleTaskLabel,
  updateLabel,
  deleteLabel,
  addChecklist,
  deleteTask,
  addDateToTask,
  addNewAttachment,
  changeIsCoverTaskTextColorBlack,
  updateTaskCover,
  getTaskColumn,
  moveTask,
  toggleTaskIsWatch,
  setCurrTask,
  updateIsCoverTop
}) {


  return (
    <div className="menu flex column">
      <div className="menu-container flex column align-start">
        <h3>ADD TO CARD</h3>
        <div className='btn-container'>
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'members')}
            className="grey-btn"
          ><IoPersonOutline />
        Members
        </button>

          {currPop === 'members' &&
            <PopMembers
              toggleCurrPop={toggleCurrPop}
              boardMembers={board.members}
              taskMembers={board.tasks[taskId].members}
              toggleTaskMember={toggleTaskMember}
              taskId={taskId}
              width={width}
              height={height}
            />
          }
        </div>
        <div className="btn-container">
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'labels')}
            className="grey-btn"
          >
            <MdLabelOutline /> Labels
        </button>
          {currPop === 'labels' &&
            <PopLabels
              addLabelToTask={addLabelToTask}
              toggleCurrPop={toggleCurrPop}
              taskId={taskId}
              boardLabels={board.labels}
              taskLabels={board.tasks[taskId].labels}
              toggleTaskLabel={toggleTaskLabel}
              updateLabel={updateLabel}
              deleteLabel={deleteLabel}
              width={width}
              height={height}
            />
          }
        </div>
        <div className="btn-container">
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'ckecklist')}
            className="grey-btn"
          >
            <FiCheckSquare /> Checklist
        </button>
          {currPop === 'ckecklist' &&
            <PopChecklist
              toggleCurrPop={toggleCurrPop}
              taskId={taskId}
              board={board}
              addChecklist={addChecklist}
              deleteTask={deleteTask}
              width={width}
              height={height}
            />
          }
        </div>
        <div className="btn-container">
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'dates')}
            className="grey-btn"
          >
            <WatchLaterOutlinedIcon /> Dates
        </button>
          {currPop === 'dates' &&
            <PopDates
              toggleCurrPop={toggleCurrPop}
              taskId={taskId}
              date={board.tasks[taskId].date}
              addDateToTask={addDateToTask}
              width={width}
              height={height}
            />
          }
        </div>
        <div className="btn-container">
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'cover')}
            className="grey-btn"
          >
            <BiImageAlt /> Cover
        </button>
          {currPop === 'cover' &&
            <PopCover
              toggleCurrPop={toggleCurrPop}
              taskId={taskId}
              cover={board.tasks[taskId].cover}
              attachments={board.tasks[taskId].attachments}
              addNewAttachment={addNewAttachment}
              taskTitle={board.tasks[taskId].title}
              isCoverTaskTextColorBlack={board.tasks[taskId].isCoverTaskTextColorBlack}
              changeIsCoverTaskTextColorBlack={changeIsCoverTaskTextColorBlack}
              updateTaskCover={updateTaskCover}
              width={width}
              height={height}
              taskIsCoverTop={board.tasks[taskId].isCoverTop}
              updateIsCoverTop={updateIsCoverTop}
            />
          }
        </div>
      </div>
      <div className="menu-container flex column align-start">
        <h3>ACTIONS</h3>
        <div className="btn-container">
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'move')}
            className="grey-btn"
          >
            <AiOutlineArrowRight /> Move
        </button>
          {currPop === 'move' &&
            <PopMove
              toggleCurrPop={toggleCurrPop}
              taskId={taskId}
              column={getTaskColumn()}
              columns={board.columns}
              moveTask={moveTask}
              width={width}
              height={height}
            />
          }

        </div>
        <button
          onClick={() => { toggleTaskIsWatch(taskId) }}
          className="grey-btn watch"
        >
          <span className="title"><FiEye /> Watch</span> {board.tasks[taskId].isWatched && <span><AiOutlineCheck /></span>}
        </button>
        <div className="btn-container">
          <button
            onClick={(ev) => onToggleCurrPop(ev, 'delete')}
            className="red-btn delete-btn"
          >
            <AiOutlineDelete /> Delete
        </button>
          {currPop === 'delete' &&
            <PopDeleteTask
              toggleCurrPop={toggleCurrPop}
              taskId={taskId}
              taskTitle={board.tasks[taskId].title}
              setCurrTask={setCurrTask}
              deleteTask={deleteTask}
              width={width}
              height={height}
            />
          }
        </div>
      </div>
    </div>
  )
}

