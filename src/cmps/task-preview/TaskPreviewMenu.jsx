import React, { useEffect, useState } from 'react';
import { BiCreditCardFront, BiImageAlt } from 'react-icons/bi';
import { IoPersonOutline } from 'react-icons/io5';
import { MdLabelOutline } from 'react-icons/md';
import useWindowDimensions from '../../services/useWindowDimensions';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import TaskUser from '../TakUser';
import PopLabels from '../pop/PopLabels';
import PopMembers from '../pop/PopMembers';
import TaskPreviewData from './TaskPreviewData';
import PopCover from '../pop/PopCover';
import { AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai';
import PopMove from '../pop/PopMove';
import PopDates from '../pop/PopDates';
import PopDeleteTask from '../pop/PopDeleteTask';
import TaskPreviewCover from './TaskPreviewCover';
import TaskPreviewLabels from './TaskPreviewLabels';



export default function TaskPreviewMenu({
  column,
  onCloseMenu,
  updateTaskName,
  task,
  taskName,
  setTaskName,
  elTask,
  openTaskDetails,
  addLabelToTask,
  board,
  toggleTaskLabel,
  updateLabel,
  deleteLabel,
  updateTaskDate,
  toggleTaskMember,
  addNewAttachment,
  changeIsCoverTaskTextColorBlack,
  updateTaskCover,
  moveTask,
  addDateToTask,
  deleteTask,
  updateIsCoverTop
}) {

  const [currPop, setCurrPop] = useState('');
  const { height, width } = useWindowDimensions();

  function onSubmitMenu(ev) {
    stop(ev);
    updateTaskName(taskName, task.id);
  }

  function toggleCurrPop(reqPop) {
    if (currPop == reqPop) setCurrPop('');
    else setCurrPop(reqPop);
  }

  function checkSizes() {
    if (!elTask) return
    return elTask.getBoundingClientRect().right + 200 > width
  }

  function onSubmitMenu(ev) {
    ev.preventDefault();
    updateTaskName(taskName, task.id);
    onCloseMenu();
  }

  function stop(ev) {
    if (ev) ev.stopPropagation();
  }


  return (
    <div onClick={stop} className="menu">
      <div onClick={onCloseMenu} className="menu-black-screen"></div>
      <div className="form-container"  >
        {task.cover &&
          <TaskPreviewCover
            cover={task.cover}
            isCoverTop={true}
            isCoverTaskTextColorBlack={task.isCoverTaskTextColorBlack}
          />
        }
        <TaskPreviewLabels boardLabels={board.labels} taskLabels={task.labels} />
        <form onSubmit={onSubmitMenu}>
          <textarea
            value={taskName}
            onChange={({ target }) => setTaskName(target.value)}
            rows="3"
            onClick={stop}
          />
        </form>
        <div className="task-members">
          {task.members.map((user, idx) => (
            <div key={idx}>
              <TaskUser user={user} />
            </div>
          ))}
        </div>
        <TaskPreviewData
          task={task}
          updateTaskDate={updateTaskDate}
        />
        <button className="form-submit-button blue-btn" onClick={onSubmitMenu} >Save</button>
      </div>
      <div className={`menu-btns ${checkSizes() ? 'left' : ''}`}>
        <button className="menu-btn" onClick={openTaskDetails} ><BiCreditCardFront /> Open card</button>
        <div className="btn-container-task-preview">
          <button className="menu-btn" onClick={() => { toggleCurrPop('labels') }}><MdLabelOutline /> Edit labels</button>
          {currPop == 'labels' &&
            <PopLabels
              addLabelToTask={addLabelToTask}
              toggleCurrPop={toggleCurrPop}
              taskId={task.id}
              boardLabels={board.labels}
              taskLabels={task.labels}
              toggleTaskLabel={toggleTaskLabel}
              updateLabel={updateLabel}
              deleteLabel={deleteLabel}
              width={width}
              height={height}
              isFromPreview={true}
            />

          }
        </div>
        <div className="btn-container-task-preview">
          <button className="menu-btn" onClick={() => { toggleCurrPop('members') }} ><IoPersonOutline /> Change members</button>
          {currPop == 'members' &&
            <PopMembers
              toggleCurrPop={toggleCurrPop}
              isFromPreview={true}
              boardMembers={board.members}
              taskMembers={task.members}
              toggleTaskMember={toggleTaskMember}
              taskId={task.id}
              width={width}
              closeOtherInputs={() => { }}
              height={height}
            />

          }
        </div>
        <div className="btn-container-task-preview">
          <button className="menu-btn" onClick={() => { toggleCurrPop('cover') }}><BiImageAlt /> Change cover</button>
          {currPop == 'cover' &&
            <PopCover
              toggleCurrPop={toggleCurrPop}
              isFromPreview={true}
              taskId={task.id}
              cover={task.cover}
              attachments={task.attachments}
              addNewAttachment={addNewAttachment}
              taskTitle={task.title}
              isCoverTaskTextColorBlack={task.isCoverTaskTextColorBlack}
              changeIsCoverTaskTextColorBlack={changeIsCoverTaskTextColorBlack}
              updateTaskCover={updateTaskCover}
              width={width}
              height={height}
              taskIsCoverTop={task.isCoverTop}
              updateIsCoverTop={updateIsCoverTop}

            />
          }
          <div className="btn-container-task-preview">
            <button className="menu-btn" onClick={() => { toggleCurrPop('move') }}><AiOutlineArrowRight /> Move</button>
            {currPop == 'move' &&
              <PopMove
                toggleCurrPop={toggleCurrPop}
                isFromPreview={true}
                taskId={task.id}
                column={column}
                columns={board.columns}
                moveTask={moveTask}
                width={width}
                height={height}
              />
            }
          </div>
          <div className="btn-container-task-preview">
            <button className="menu-btn" onClick={() => { toggleCurrPop('date') }}><WatchLaterOutlinedIcon /> Edit date</button>
            {currPop == 'date' &&
              <PopDates
                toggleCurrPop={toggleCurrPop}
                isFromPreview={true}
                date={task.date}
                addDateToTask={addDateToTask}
                width={width}
                height={height}
                taskId={task.id}
              />
            }
          </div>
          <div className="btn-container-task-preview">
            <button className="menu-btn" onClick={() => { toggleCurrPop('delete') }}><AiOutlineDelete /> Delete</button>
            {currPop == 'delete' &&
              <PopDeleteTask
                toggleCurrPop={toggleCurrPop}
                isFromPreview={true}
                taskTitle={task.title}
                setCurrTask={() => { }}
                deleteTask={deleteTask}
                width={width}
                height={height}
                taskId={task.id}
              />
            }
          </div>

        </div>
      </div>
    </div>
  )
}

