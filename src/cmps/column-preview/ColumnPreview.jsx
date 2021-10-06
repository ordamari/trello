import React, { useEffect, useState } from 'react';
import TaskPreview from '../task-preview/TaskPreview';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskAdd from './TaskAdd'
import ColumnHeader from './ColumnHeader';



export default function ColumnPreview({
  closeColumnsInputAndMenu,
  setCurrTask,
  column,
  tasks,
  index,
  addTask,
  updateColumnName,
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
  moveTask,
  addDateToTask,
  deleteTask,
  updateIsCoverTop,
  removeColumn,
  coppiedColumn,
  moveList,
  checkIsIncludeInFilter
}) {





  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="board-column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex">
            <ColumnHeader
              closeColumnsInputAndMenu={closeColumnsInputAndMenu}
              updateColumnName={updateColumnName}
              provided={provided}
              column={column}
              removeColumn={removeColumn}
              coppiedColumn={coppiedColumn}
              board={board}
              moveList={moveList}
            />
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`tasks-container ${snapshot.isDraggingOver ? 'drag' : ''}`}
                {...provided.droppableProps}
              >
                {
                  tasks.map((task, idx) => {

                    if (checkIsIncludeInFilter(task.id)) return (
                      <TaskPreview
                        closeColumnsInputAndMenu={closeColumnsInputAndMenu}
                        addDateToTask={addDateToTask}
                        column={column}
                        setCurrTask={setCurrTask}
                        updateTaskName={updateTaskName}
                        key={task.id} task={task}
                        index={idx}
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
                        deleteTask={deleteTask}
                        updateIsCoverTop={updateIsCoverTop}
                      />
                    )
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <TaskAdd addTask={addTask} columnId={column.id} />
        </div>
      )
      }
    </Draggable >
  )
}

