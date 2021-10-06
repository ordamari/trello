import React, { useState } from 'react';
import useWindowDimensions from '../../services/useWindowDimensions';
import BoardUserInvite from '../board/BoardUserInvite';
import CloseBtn from '../CloseBtn';


export default function PopInvite({
  isFromPreview,
  users,
  boardUsers,
  toggleUserInBoard,
  toggleIsInvitePopOpen
}) {

  const [elPop, setElPop] = useState(null);
  const { height, width } = useWindowDimensions();


  function getStyle() {
    if (!elPop) return {};
    var style = {};
    if (!(width > elPop.getBoundingClientRect().right)) style.left = width - elPop.getBoundingClientRect().right - 10;
    if (!(height > elPop.getBoundingClientRect().bottom)) {
      if (elPop.getBoundingClientRect().top < elPop.getBoundingClientRect().bottom - elPop.getBoundingClientRect().top + 50) {
        style.top = '50%';
        style.transform = `translate(0, -50%)`;
      } else {
        style.top = 'unset';
        style.bottom = isFromPreview ? 30 : 50;
      }
    }
    return style;
  }

  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Invite to board</p>
      <CloseBtn onClick={toggleIsInvitePopOpen} />
      <div className="pop-container pop-invite">
        <BoardUserInvite
          users={users}
          boardUsers={boardUsers}
          toggleUserInBoard={toggleUserInBoard}
        />
      </div>
    </div >
  )
}

