import { boardService } from '../services/boardService';

export function updateBoard(oldBoard, newBoard) {
  return async dispatch => {
    dispatch({ type: 'SET_BOARD', board: newBoard });
    try {
      await boardService.updateBoard(newBoard);

    } catch (err) {
      dispatch({ type: 'SET_BOARD', board: oldBoard });
      console.log('boardActions: err in update board', err);
    };
  }
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.loadBoard(boardId);
      dispatch({ type: 'SET_BOARD', board: board });

    } catch (err) {
      console.log('boardActions: err in update board', err);
    };
  }
}

export function addNewBoard(boardTitle, background, user) {
  return async dispatch => {
    try {
      const board = await boardService.addNewBoard(boardTitle, background, user);
      dispatch({ type: 'UPDATE_USER_BOARDS', boardId: board._id });
      return board
    } catch (err) {
      console.log('boardActions: err in update board', err);
    };
  }
}

export function createBoardFromTemplate(templateId, user) {
  return async dispatch => {
    try {
      const board = await boardService.createBoardFromTemplate(templateId, user);
      dispatch({ type: 'UPDATE_USER_BOARDS', boardId: board._id });
      return board
    } catch (err) {
      console.log('boardActions: err in update board', err);
    };
  }
}

export function getBoardById(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.getBoardById(boardId);
      return board
    } catch (err) {
      console.log('boardActions: err in update board', err);
    };
  }
}

export function toggleBoardStar(board) {
  const newBoard = boardService.updateBoardIsStared(board);
  return async dispatch => {
    try {
      await boardService.updateBoard(newBoard);
      return newBoard;
    } catch (err) {
      console.log('boardActions: err in update board', err);
    };
  }
}

export function deleteBoard(id) {
  return async dispatch => {
    try {
      await boardService.deleteBoard(id);
      dispatch({ type: 'SET_BOARD', board: boardService.getEmptyBoard() });
    } catch (err) {
      console.log('boardActions: err in update board', err);
    };
  }
}










