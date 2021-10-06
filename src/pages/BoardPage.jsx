import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { updateBoard, loadBoard, deleteBoard } from '../actions/boardActions'
import { toggleUserBoard, loadUsers, removeBoardFromUser } from '../actions/userActions'
import { boardService } from '../services/boardService';
import { eventBusService } from '../services/eventBusService';
import Board from '../cmps/board/Board';
import BoardHeader from '../cmps/board/BoardHeader';
import BoardMenu from '../cmps/board/BoardMenu';
import Navbar from '../cmps/Navbar';

function _BoardPage(props) {
  const [board, setBoard] = useState({ ...props.board });
  const [isDrag, setIsDrag] = useState(false);
  const [currTask, setCurrTask] = useState('');
  const [boardMenuIsOpen, setBoardMenuIsOpen] = useState(false);
  const [choosenLabelsFilter, setChoosenLabelsFilter] = useState([]);
  const [choosenMembersFilter, setChoosenMembersFilter] = useState([]);
  const [filterIsMembersOrLabels, setFilterIsMembersOrLabels] = useState(true);
  const [users, setUsers] = useState([])


  useEffect(() => {
    setBoard(props.board)
  }, [props.board])

  useEffect(() => {
    eventBusService.emit('set-curr-page', 'board');
    props.loadUsers();
  }, [])

  useEffect(() => {
    props.loadBoard(props.match.params.id);
  }, [props.match.params.id])

  useEffect(() => {
    setUsers(props.users.map(user => {
      return {
        "id": user._id,
        "imgUrl": user.profileImg,
        "userName": user.username
      }
    }))
  }, [props.users])

  async function updateBoard(newBoard) {
    console.log(newBoard);
    const oldBoard = { ...board };
    setBoard(newBoard);
    await props.updateBoard(oldBoard, newBoard);
  }

  async function deleteBoard() {
    await props.removeBoardFromUser(props.loggedInUser._id, board._id);
    if (board.members.length === 1 && board.members[0].id === props.loggedInUser._id) {
      await props.deleteBoard(board._id);
    }
    else {
      const newBoard = boardService.removeUserFromBoard(board, props.loggedInUser._id);
      await updateBoard(newBoard);
    }
    props.history.push('/userBoards');
  }

  function onDragEnd({ destination, source, draggableId, type }) {
    setIsDrag(false);
    const newBoard = boardService.onDragEnd(destination, source, draggableId, type, board);
    if (newBoard) updateBoard(newBoard);
  }

  function onDragStart({ type }) {
    setIsDrag(true);
    closeColumnsInputAndMenu();

  }

  function addColumn(name) {
    const newBoard = boardService.addNewColumn(name, board);
    updateBoard(newBoard);
  }

  function addTask(name, columnId) {
    const newBoard = boardService.addNewTask(name, columnId, board);
    updateBoard(newBoard)
  }

  function updateColumnName(name, columnId) {
    const newBoard = boardService.updateColumnName(name, columnId, board);
    updateBoard(newBoard);
  }

  function updateTaskName(name, taskId) {
    const newBoard = boardService.updateTaskName(name, taskId, board);
    updateBoard(newBoard);
  }

  function updateTaskDescription(description, taskId) {
    const newBoard = boardService.updateTaskDescription(description, taskId, board);
    updateBoard(newBoard);
  }

  function updateTaskDate(date, taskId) {
    const newBoard = boardService.updateTaskDate(date, taskId, board);
    updateBoard(newBoard);
  }

  function toggleIsShowCheckedItems(taskId, checklistIdx) {
    const newBoard = boardService.toggleIsShowCheckedItems(taskId, checklistIdx, board);
    updateBoard(newBoard);
  }

  function toggleIsDoneTaskInChecklist(taskId, checklistIdx, checklistTaskIdx) {
    const newBoard = boardService.toggleIsDoneTaskInChecklist(taskId, checklistIdx, checklistTaskIdx, board);
    updateBoard(newBoard);
  }

  function deleteChecklist(taskId, checklistIdx) {
    const newBoard = boardService.deleteChecklist(taskId, checklistIdx, board);
    updateBoard(newBoard);
  }

  function addTaskToTasklist(taskId, checklistIdx, name) {
    const newBoard = boardService.addTaskToTasklist(taskId, checklistIdx, name, board);
    updateBoard(newBoard);
  }

  function updateChecklistName(taskId, checklistIdx, name) {
    const newBoard = boardService.updateChecklistName(taskId, checklistIdx, name, board);
    updateBoard(newBoard);
  }

  function updateChecklistTaskName(taskId, checklistIdx, checklistTaskIdx, name) {
    const newBoard = boardService.updateChecklistTaskName(taskId, checklistIdx, checklistTaskIdx, name, board)
    updateBoard(newBoard);
  }

  function toggleTaskIsWatch(taskId) {
    const newBoard = boardService.toggleTaskIsWatch(taskId, board);
    updateBoard(newBoard);
  }

  function toggleTaskMember(member, taskId) {
    const newBoard = boardService.toggleTaskMember(member, taskId, board);
    updateBoard(newBoard);
  }

  function toggleTaskLabel(labelIdx, taskId) {
    const newBoard = boardService.toggleTaskLabel(labelIdx, taskId, board);
    updateBoard(newBoard);
  }

  function updateLabel(newLabel, labelIdx) {
    const newBoard = boardService.updateLabel(newLabel, labelIdx, board);
    updateBoard(newBoard);
  }

  function addChecklist(taskId, checklistTitle, copyFrom) {
    const newBoard = boardService.addChecklist(taskId, checklistTitle, copyFrom, board);
    updateBoard(newBoard);
  }

  function deleteLabel(labelIdx) {
    const newBoard = boardService.deleteLabel(labelIdx, board);
    updateBoard(newBoard);
  }

  function addLabelToTask(newLabel, taskId) {
    const newBoard = boardService.addLabelToTask(newLabel, taskId, board)
    updateBoard(newBoard);
  }

  function addDateToTask(taskId, newDate) {
    const newBoard = boardService.addDateToTask(taskId, newDate, board);
    updateBoard(newBoard);
  }

  function addNewAttachment(newAttachment, taskId) {
    const newBoard = boardService.addNewAttachment(newAttachment, taskId, board);
    updateBoard(newBoard);
  }

  function changeIsCoverTaskTextColorBlack(isCoverTaskTextColorBlack, taskId) {
    const newBoard = boardService.changeIsCoverTaskTextColorBlack(isCoverTaskTextColorBlack, taskId, board);
    updateBoard(newBoard);
  }

  function updateTaskCover(newCover, taskId) {
    const newBoard = boardService.updateTaskCover(newCover, taskId, board);
    updateBoard(newBoard);
  }

  function moveTask(from, to, taskId) {
    const newBoard = boardService.moveTask(from, to, taskId, board);
    updateBoard(newBoard);
  }

  function deleteTask(taskId) {
    const newBoard = boardService.deleteTask(taskId, board);
    updateBoard(newBoard);
  }

  function updateIsCoverTop(isCoverTop, taskId) {
    const newBoard = boardService.updateIsCoverTop(isCoverTop, taskId, board);
    updateBoard(newBoard);
  }

  function toggleUserInBoard(user) {
    const newBoard = boardService.toggleUserInBoard(user, board);
    updateBoard(newBoard);
    props.toggleUserBoard(user.id, newBoard._id);
  }

  function convertChecklistTaskToTask(taskId, checklistIdx, taskIdx, columnId) {
    const newBoard = boardService.convertChecklistTaskToTask(taskId, checklistIdx, taskIdx, columnId, board);
    updateBoard(newBoard);
  }

  function deleteChecklistTask(taskId, checklistIdx, taskIdx) {
    const newBoard = boardService.deleteChecklistTask(taskId, checklistIdx, taskIdx, board);
    updateBoard(newBoard);
  }

  function removeColumn(columnId) {
    const newBoard = boardService.removeColumn(columnId, board);
    updateBoard(newBoard);
  }

  function coppiedColumn(columnId, columnTitle) {
    const newBoard = boardService.coppiedColumn(columnId, columnTitle, board);
    updateBoard(newBoard);
  }

  function moveList(columnId, position, moveTo) {
    const newBoard = boardService.moveList(columnId, position, moveTo, board);
    updateBoard(newBoard);
  }

  function updateBoardIsStared() {
    const newBoard = boardService.updateBoardIsStared(board);
    updateBoard(newBoard);
  }

  function updateBoardTitle(newTitle) {
    const newBoard = boardService.updateBoardTitle(newTitle, board);
    updateBoard(newBoard);
  }

  function updateBoardBackground(newBackground) {
    const newBoard = boardService.updateBoardBackground(newBackground, board);
    updateBoard(newBoard);
  }

  function closeColumnsInputAndMenu() {
    setBoardMenuIsOpen(false);
    eventBusService.emit('close-columns-input-and-menu', null);
  }

  function getBoardPageStyle() {
    if (board.background.type === "color") return { backgroundColor: board.background.cover }
    return { backgroundImage: `url(${board.background.cover})` }
  }

  function checkIsIncludeInFilter(taskId) {
    if (!choosenLabelsFilter.length) {
      if (!choosenMembersFilter.length) return true;
      return choosenMembersFilter.some(filterMember => board.tasks[taskId].members.some(taskMember => taskMember.id === filterMember.id))
    }
    if (!choosenMembersFilter.length) return choosenLabelsFilter.some(filterLabel => board.tasks[taskId].labels.some(taskLabel => taskLabel === filterLabel));
    if (filterIsMembersOrLabels) return choosenMembersFilter.some(filterMember => board.tasks[taskId].members.some(taskMember => taskMember.id === filterMember.id)) ||
      choosenLabelsFilter.some(filterLabel => board.tasks[taskId].labels.some(taskLabel => taskLabel === filterLabel));
    return choosenMembersFilter.some(filterMember => board.tasks[taskId].members.some(taskMember => taskMember.id === filterMember.id)) &&
      choosenLabelsFilter.some(filterLabel => board.tasks[taskId].labels.some(taskLabel => taskLabel === filterLabel));
  }

  function checkIsHaveFilter() {
    return !!choosenLabelsFilter.length || !!choosenMembersFilter.length
  }

  function unfilterBoard() {
    setChoosenLabelsFilter([]);
    setChoosenMembersFilter([]);
  }


  return (
    <div className="flex h100">
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <div className="board-page-conatiner" style={getBoardPageStyle()}>

          <BoardHeader
            closeColumnsInputAndMenu={closeColumnsInputAndMenu}
            board={board}
            updateBoardIsStared={updateBoardIsStared}
            updateBoardTitle={updateBoardTitle}
            boardMenuIsOpen={boardMenuIsOpen}
            setBoardMenuIsOpen={setBoardMenuIsOpen}
            checkIsIncludeInFilter={checkIsIncludeInFilter}
            checkIsHaveFilter={checkIsHaveFilter}
            unfilterBoard={unfilterBoard}
            users={users}
            toggleUserInBoard={toggleUserInBoard}
          />


          <Board
            closeColumnsInputAndMenu={closeColumnsInputAndMenu}
            board={board}
            deleteTask={deleteTask}
            moveTask={moveTask}
            setCurrTask={setCurrTask}
            updateTaskName={updateTaskName}
            updateColumnName={updateColumnName}
            addTask={addTask}
            addLabelToTask={addLabelToTask}
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
            addColumn={addColumn}
            deleteChecklistTask={deleteChecklistTask}
            convertChecklistTaskToTask={convertChecklistTaskToTask}
            addChecklist={addChecklist}
            toggleTaskIsWatch={toggleTaskIsWatch}
            addTaskToTasklist={addTaskToTasklist}
            updateChecklistTaskName={updateChecklistTaskName}
            updateChecklistName={updateChecklistName}
            toggleIsDoneTaskInChecklist={toggleIsDoneTaskInChecklist}
            deleteChecklist={deleteChecklist}
            toggleIsShowCheckedItems={toggleIsShowCheckedItems}
            updateTaskDescription={updateTaskDescription}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            isDrag={isDrag}
            currTask={currTask}
            findTaskListTitle={boardService.findTaskListTitle}
            boardMenuIsOpen={boardMenuIsOpen}
            checkIsIncludeInFilter={checkIsIncludeInFilter}
          />
        </div>
      </DragDropContext>
      <BoardMenu
        users={users}
        toggleUserInBoard={toggleUserInBoard}
        deleteLabel={deleteLabel}
        addLabelToTask={addLabelToTask}
        updateLabel={updateLabel}
        updateBoardBackground={updateBoardBackground}
        boardMenuIsOpen={boardMenuIsOpen}
        setBoardMenuIsOpen={setBoardMenuIsOpen}
        board={board}
        choosenLabelsFilter={choosenLabelsFilter}
        setChoosenLabelsFilter={setChoosenLabelsFilter}
        choosenMembersFilter={choosenMembersFilter}
        setChoosenMembersFilter={setChoosenMembersFilter}
        filterIsMembersOrLabels={filterIsMembersOrLabels}
        setFilterIsMembersOrLabels={setFilterIsMembersOrLabels}
        removeBoardFromUser={props.removeBoardFromUser}
        loggedInUser={props.loggedInUser}
        deleteBoard={deleteBoard}
      />
    </div>

  )
}

const mapStateToProps = state => {
  return {
    board: state.board.board,
    users: state.user.users,
    loggedInUser: state.user.loggedinUser
  }
}
const mapDispatchToProps = {
  updateBoard,
  loadBoard,
  loadUsers,
  toggleUserBoard,
  removeBoardFromUser,
  deleteBoard
}
export default connect(mapStateToProps, mapDispatchToProps)(_BoardPage)

