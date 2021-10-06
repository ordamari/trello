import React, { useEffect, useState } from 'react';
import BoardMembers from './BoardMembers';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import { BsThreeDots } from 'react-icons/bs';
import AutosizeInput from 'react-input-autosize';
import CloseBtn from '../CloseBtn';
import { eventBusService } from '../../services/eventBusService';
import PopInvite from '../pop/PopInvite'



export default function BoardHeader({
  board,
  updateBoardIsStared,
  updateBoardTitle,
  setBoardMenuIsOpen,
  boardMenuIsOpen,
  checkIsIncludeInFilter,
  checkIsHaveFilter,
  unfilterBoard,
  closeColumnsInputAndMenu,
  users,
  toggleUserInBoard,
}) {

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isInvitePopOpen, setIsInvitePopOpen] = useState(false);
  const [title, setTitle] = useState(board.title);

  function onInputBlur() {
    updateBoardTitle(title);
    setIsInputOpen(false);
  }

  function getNumOfResult() {
    return Object.keys(board.tasks).reduce((acc, taskId) => {
      if (checkIsIncludeInFilter(taskId)) acc++;
      return acc
    }, 0)
  }

  function onClickSearchResult() {
    setBoardMenuIsOpen(true);
    eventBusService.emit('open-search-card', null);
  }

  function onToggleIsMenuOpen() {
    closeColumnsInputAndMenu();
    setBoardMenuIsOpen(prevState => !prevState)
  }

  function toggleIsInvitePopOpen(ev) {
    ev.stopPropagation();
    setIsInvitePopOpen(prevState => !prevState)
  }

  return (
    <div className={`board-header flex justify-space-between ${boardMenuIsOpen?'menu-open':'menu-close'}`}>
      <div className="flex align-center">
        {isInputOpen ? (
          <AutosizeInput
            type="text"
            value={title}
            onChange={({ target }) => { setTitle(target.value) }}
            onBlur={onInputBlur}
            autoFocus={true}
            onFocus={()=>setTitle(board.title)}
          />
        ) : (
          <button onClick={() => { setIsInputOpen(true) }} className="header-btn board-title-btn">{board.title}</button>
        )

        }
        <button
          onClick={updateBoardIsStared}
          className={`header-btn ${board.isStared ? 'stared' : 'not-stared'}`}
        >
          <GradeOutlinedIcon />
        </button>
        <div className="spacer"></div>
        <BoardMembers members={board.members} />
        <div className="btn-container">
          <button onClick={toggleIsInvitePopOpen} className="header-btn board-invite-btn">invite</button>
          {isInvitePopOpen &&
            <PopInvite
              toggleIsInvitePopOpen={toggleIsInvitePopOpen}
              users={users}
              boardUsers={board.members}
              toggleUserInBoard={toggleUserInBoard}
            />
          }
        </div>
      </div>
      <div className="flex align-center">

        {checkIsHaveFilter() &&
          <div className="result-container flex align-center">
            <p onClick={onClickSearchResult} >{getNumOfResult()} search results</p>
            <CloseBtn onClick={unfilterBoard} />
          </div>
        }
        {!boardMenuIsOpen &&
          <button
            className="header-btn board-menu-btn"
            onClick={onToggleIsMenuOpen}
          >
            <BsThreeDots /> show menu
          </button>
        }
      </div>
    </div>
  )
}

