import { userService } from '../services/userService'

export function onLogin(credentials) {
  return async dispatch => {
    const user = await userService.login(credentials)
    dispatch({ type: 'SET_USER', user })

  }
}

export function onLogout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}

export function onSignup(cred) {
  return async dispatch => {
    const user = await userService.add(cred)
    dispatch({ type: 'SET_USER', user })
  }
}

export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    };
  }
}

export function toggleUserBoard(userId, boardId) {
    return async dispatch => {
      try {
        await userService.toggleUserBoard(userId,boardId);
      } catch (err) {
        console.log('boardActions: err in update board', err);
      };
    }
}

export function removeBoardFromUser(userId, boardId) {
    return async dispatch => {
      try {
        const newUser =  await userService.removeBoardFromUser(userId,boardId);
        dispatch({ type: 'SET_USER', user:newUser})
      } catch (err) {
        console.log('boardActions: err in update board', err);
      };
    }
}









