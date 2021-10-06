import React, { useEffect, useState } from 'react';
import TaskUser from '../TakUser';
import { AiOutlineCheck } from 'react-icons/ai';



export default function BoardUserInvite({
  users,
  boardUsers,
  toggleUserInBoard
}) {

  const [userSearch, setUserSearch] = useState('');

  function filterUsers() {
    return users.filter(user => user.id.includes(userSearch) || user.userName.toLowerCase().includes(userSearch.toLowerCase()))
  }

  function onToggleUserInBoard(user) {
    toggleUserInBoard(user)
  }

  return (
    <div className="board-user-invite">
      <input
        type="text"
        value={userSearch}
        onChange={({ target }) => { setUserSearch(target.value) }}
        placeholder="Search members"
      />

      <div className="users-container">
        {filterUsers().map(user => (

          <div
            className="user-preview"
            key={user.id}
            onClick={() => { onToggleUserInBoard(user) }}
          >
            <div className="flex align-center">
              <TaskUser user={user} />
              <p>{user.userName}</p>

            </div>
            { boardUsers.some(boardUser => boardUser.id === user.id) &&
              <AiOutlineCheck />
            }
          </div>
        ))
        }
        {!filterUsers().length &&
          <div className="user-dont-found">
            <p>Looks like that person isn't a member yet.</p>
          </div>
        }
      </div>
    </div>
  )
}

