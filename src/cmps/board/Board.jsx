import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ColumnPreview from '../column-preview/ColumnPreview';
import ColumnAdd from '../ColumnAdd';
import TaskDetails from '../task-details/TaskDetails';


export default function Board({
  checkIsIncludeInFilter,
  closeColumnsInputAndMenu,
  board,
  deleteTask,
  moveTask,
  setCurrTask,
  updateTaskName,
  updateColumnName,
  addTask,
  addLabelToTask,
  toggleTaskLabel,
  updateLabel,
  deleteLabel,
  updateTaskDate,
  toggleTaskMember,
  addNewAttachment,
  changeIsCoverTaskTextColorBlack,
  updateTaskCover,
  addDateToTask,
  updateIsCoverTop,
  removeColumn,
  coppiedColumn,
  moveList,
  addColumn,
  deleteChecklistTask,
  convertChecklistTaskToTask,
  addChecklist,
  toggleTaskIsWatch,
  addTaskToTasklist,
  updateChecklistTaskName,
  updateChecklistName,
  toggleIsDoneTaskInChecklist,
  deleteChecklist,
  toggleIsShowCheckedItems,
  updateTaskDescription,
  isDrag,
  currTask,
  findTaskListTitle,
  boardMenuIsOpen
}) {


  return (
      <div className="h100">

        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              className={`board-container ${isDrag ? 'drag' : ''}`}
              {...provided.droppableProps}
              ref={provided.innerRef}
              onClick={closeColumnsInputAndMenu}
            >

              <div className={`board ${boardMenuIsOpen? 'menu-open':'menuClose'}`}>

                {
                  board.columnsOrder.map((columnId, idx) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(taskId => board.tasks[taskId])
                    return (
                      <ColumnPreview
                      checkIsIncludeInFilter={checkIsIncludeInFilter}
                        closeColumnsInputAndMenu={closeColumnsInputAndMenu}
                        board={board}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        setCurrTask={setCurrTask}
                        updateTaskName={updateTaskName}
                        updateColumnName={updateColumnName}
                        addTask={addTask}
                        key={column.id}
                        column={column}
                        tasks={tasks}
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
                        addDateToTask={addDateToTask}
                        updateIsCoverTop={updateIsCoverTop}
                        removeColumn={removeColumn}
                        coppiedColumn={coppiedColumn}
                        moveList={moveList}
                      />
                    )
                  })
                }
                {provided.placeholder}
                <ColumnAdd addColumn={addColumn} />
              </div>
            </div>
          )}
        </Droppable>
        {
          currTask &&
          <TaskDetails
            deleteChecklistTask={deleteChecklistTask}
            convertChecklistTaskToTask={convertChecklistTaskToTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            updateTaskCover={updateTaskCover}
            changeIsCoverTaskTextColorBlack={changeIsCoverTaskTextColorBlack}
            addNewAttachment={addNewAttachment}
            addDateToTask={addDateToTask}
            addChecklist={addChecklist}
            updateLabel={updateLabel}
            deleteLabel={deleteLabel}
            addLabelToTask={addLabelToTask}
            toggleTaskLabel={toggleTaskLabel}
            toggleTaskMember={toggleTaskMember}
            toggleTaskIsWatch={toggleTaskIsWatch}
            addTaskToTasklist={addTaskToTasklist}
            updateChecklistTaskName={updateChecklistTaskName}
            updateChecklistName={updateChecklistName}
            toggleIsDoneTaskInChecklist={toggleIsDoneTaskInChecklist}
            deleteChecklist={deleteChecklist}
            toggleIsShowCheckedItems={toggleIsShowCheckedItems}
            updateTaskDate={updateTaskDate}
            updateTaskName={updateTaskName}
            updateTaskDescription={updateTaskDescription}
            setCurrTask={setCurrTask}
            board={board}
            taskId={currTask}
            listTitle={findTaskListTitle(currTask, board)}
            updateIsCoverTop={updateIsCoverTop}
          />
        }
      </div>
  )
}

