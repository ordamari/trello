import httpService from './httpService'



export const userService = {
    login,
    logout,
    add,
    getCurrUser,
    getUsers,
    toggleUserBoard,
    removeBoardFromUser
}



async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();

}

function getCurrUser() {
    let currUser = sessionStorage.getItem('user')
    currUser = JSON.parse(currUser)
    return currUser

}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function add(user) {
    const returnedUser = await httpService.post('auth/signup', user)
    return _handleLogin(returnedUser)
}


function getUsers() {
    return httpService.get('user')
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

async function toggleUserBoard(userId, boardId) {
    try {
        const newUser = await httpService.put(`user/toggleBoard/${userId}`, {boardId})
        return newUser
    } catch (err) {
        console.log(err);
    }
}

async function removeBoardFromUser(userId, boardId) {
    try {
        const newUser = await httpService.put(`user/removeBoardFromUser/${userId}`, {boardId})
        _handleLogin(newUser);
        return newUser
    } catch (err) {
        console.log(err);
    }
}

