import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import CloseBtn from '../CloseBtn';
import TaskUser from '../TakUser';


export default function PopMembers({
  toggleCurrPop,
  boardMembers,
  taskMembers,
  toggleTaskMember,
  taskId,
  width,
  height,
  isFromPreview
}) {

  const [memberSearch, setMemberSearch] = useState('');
  const [elPop, setElPop] = useState(null);

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

  function checkBoardMemberInTaskMembers(boardMember) {
    return taskMembers.some(taskMembers => taskMembers.id === boardMember.id);
  }

  function getFilteredBoardMembers() {
    return boardMembers.filter(member => (
      member.userName.toLowerCase().includes(memberSearch.toLowerCase()) || member.id.toLowerCase().includes(memberSearch.toLowerCase())
    ))
  }

  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">Members</p>
      <CloseBtn onClick={() => { toggleCurrPop('members') }} />

      <div className="pop-container pop-members">
        <input
          className="pop-input"
          value={memberSearch}
          onChange={({ target }) => { setMemberSearch(target.value) }}
          type="text"
          placeholder="Search members"
        />
        <p className="pop-mini-title">BOARD MEMBERS</p>
        <div className="board-members-container">
          {getFilteredBoardMembers().map(boardMember => (
            <div
              className="flex align-center justify-space-between member-data"
              key={boardMember.id}
              onClick={() => { toggleTaskMember(boardMember, taskId) }}
            >
              <div className="flex align-center inner">
                <TaskUser user={boardMember} />
                <p>{boardMember.userName}</p>
                <p>({boardMember.id})</p>
              </div>
              {checkBoardMemberInTaskMembers(boardMember) &&
                <AiOutlineCheck />
              }
            </div>
          ))

          }

        </div>
      </div>
    </div>
  )
}

