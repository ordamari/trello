import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskUser from '../TakUser';
import { VscEdit } from 'react-icons/all'
import TaskMenuPreview from './TaskPreviewMenu'
import useWindowDimensions from '../../services/useWindowDimensions';
import TaskPreviewLabels from './TaskPreviewLabels';
import TaskPreviewData from './TaskPreviewData';
import TaskPreviewCover from './TaskPreviewCover';

export default function TaskPreview({
  setCurrTask,
  task,
  index,
  updateTaskName,
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
  column,
  moveTask,
  addDateToTask,
  deleteTask,
  updateIsCoverTop,
  closeColumnsInputAndMenu
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.title);
  const [elTask, setElTask] = useState(null);

  function stop(ev) {
    if (ev) ev.stopPropagation();
  }

  function onCloseMenu(ev) {
    stop(ev);
    setIsMenuOpen(false);
    setTaskName(task.title);
  }

  function onOpenMenu(ev) {
    ev.stopPropagation();
    closeColumnsInputAndMenu();
    setIsMenuOpen(true);
  }

  function openTaskDetails() {
    setIsMenuOpen(false);
    setCurrTask(task.id);
  }

  function getTaskTextStyle() {
    if (task.cover?.type === "color") return {};

    return task.isCoverTaskTextColorBlack ? { color: "#000000" } : { color: "#ffffff" }
  }

  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={isMenuOpen}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? 'drag-over' : ''} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={openTaskDetails}
        >
          <div ref={(el) => { if (el && !elTask) setElTask(el) }}></div>
          {isMenuOpen &&
            <TaskMenuPreview
              column={column}
              onCloseMenu={onCloseMenu}
              updateTaskName={updateTaskName}
              task={task}
              taskName={taskName}
              setTaskName={setTaskName}
              elTask={elTask}
              setCurrTask={setCurrTask}
              openTaskDetails={openTaskDetails}
              addLabelToTask={addLabelToTask}
              board={board}
              toggleTaskLabel={toggleTaskLabel}
              updateLabel={updateLabel}
              deleteLabel={deleteLabel}
              updateTaskDate={updateTaskDate}
              toggleTaskMember={toggleTaskMember}
              addNewAttachment={addNewAttachment}
              changeIsCoverTaskTextColorBlack={changeIsCoverTaskTextColorBlack}
              updateTaskCover={updateTaskCover}
              moveTask={moveTask}
              addDateToTask={addDateToTask}
              deleteTask={deleteTask}
              updateIsCoverTop={updateIsCoverTop}
            />
          }
          <button onClick={onOpenMenu} className="edit-btn" ><VscEdit /></button>


          {task.cover &&
            <TaskPreviewCover
              cover={task.cover}
              isCoverTop={task.isCoverTop}
              isCoverTaskTextColorBlack={task.isCoverTaskTextColorBlack}
            />
          }

          {((!task.isCoverTop) && (task.cover?.type === 'img') && !isMenuOpen) &&
            <div className="placeholder"></div>
          }

          <TaskPreviewLabels boardLabels={board.labels} taskLabels={task.labels} />

          <p style={getTaskTextStyle()} className={`task-text ${(!task.isCoverTop && task.cover) ? 'bold' : ''}`}>{task.title}</p>

          { task.isCoverTop &&
            <>
              <TaskPreviewData
                task={task}
                updateTaskDate={updateTaskDate}
              />

              <Droppable droppableId={task.id} direction="horizontal" type="members">
                {(provided) => (
                  <div
                    className="task-members"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {task.members.map((user, idx) => (
                      <div key={idx}>
                        <TaskUser user={user} />
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </>
          }
        </div>
      )
      }
    </Draggable>
  )
}

