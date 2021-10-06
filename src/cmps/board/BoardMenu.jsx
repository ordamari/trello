import React, { useEffect, useState } from 'react';
import { BiImageAlt } from 'react-icons/bi';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { MdLabelOutline } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import CloseBtn from '../CloseBtn';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BoardMenuBackground from './BoardMenuBackground';
import BoardMenuPhotos from './BoardMenuPhotos';
import BoardMenuColors from './BoardMenuColors';
import BoardMenuSearchCard from './BoardMenuSearchCard';
import { eventBusService } from '../../services/eventBusService';
import BoardMenuLabels from './BoardMenuLabels';
import BoardUserInvite from './BoardUserInvite';
import BoardMenuDeleteBoard from './BoardMenuDeleteBoard';



export default function BoardMenu({
  boardMenuIsOpen,
  setBoardMenuIsOpen,
  updateBoardBackground,
  board,
  choosenLabelsFilter,
  setChoosenLabelsFilter,
  choosenMembersFilter,
  setChoosenMembersFilter,
  filterIsMembersOrLabels,
  setFilterIsMembersOrLabels,
  addLabelToTask,
  updateLabel,
  deleteLabel,
  users,
  toggleUserInBoard,
  removeBoardFromUser,
  loggedInUser,
  deleteBoard
}) {

  const [currTitle, setCurrTitle] = useState('Menu');

  useEffect(() => {
    if (!boardMenuIsOpen) setCurrTitle('Menu');
  }, [boardMenuIsOpen])

  useEffect(() => {
    eventBusService.on('open-search-card', () => { setCurrTitle('Search cards') })
  }, [])


  return (
    <div className={`board-menu ${boardMenuIsOpen ? 'open' : 'close'}`}>
      <div className="board-menu-header">
        {currTitle === "Photos by Unsplush" ? (
          <p>Photos by <span>Unsplush</span></p>
        ) : (
          <p>{currTitle}</p>
        )}
        <CloseBtn onClick={() => { setBoardMenuIsOpen(false) }} />
        {currTitle !== "Menu" &&
          <button className="back-btn" onClick={() => { setCurrTitle('Menu') }} ><ArrowBackIosIcon /></button>
        }
      </div>
      <div className="board-menu-container">
        {currTitle === "Menu" &&
          <div className="btns-container">
            <button onClick={() => { setCurrTitle('Change background') }} ><BiImageAlt /> Change background</button>
            <button onClick={() => { setCurrTitle('Search cards') }} ><SearchOutlinedIcon /> Search cards</button>
            <button onClick={() => { setCurrTitle('Labels') }} ><MdLabelOutline /> Labels</button>
            <button onClick={() => { setCurrTitle('Members') }} ><IoPersonOutline /> Members</button>
            <button onClick={() => { setCurrTitle('Delete board') }} ><AiOutlineDelete /> Delete board</button>
          </div>
        }
        {currTitle === "Change background" &&
          <BoardMenuBackground
            setCurrTitle={setCurrTitle}
          />
        }
        {currTitle === "Photos by Unsplush" &&
          <BoardMenuPhotos
            updateBoardBackground={updateBoardBackground}
          />
        }
        {currTitle === "Colors" &&
          <BoardMenuColors
            updateBoardBackground={updateBoardBackground}
          />
        }
        {currTitle === "Search cards" &&
          <BoardMenuSearchCard
            board={board}
            choosenLabelsFilter={choosenLabelsFilter}
            setChoosenLabelsFilter={setChoosenLabelsFilter}
            choosenMembersFilter={choosenMembersFilter}
            setChoosenMembersFilter={setChoosenMembersFilter}
            filterIsMembersOrLabels={filterIsMembersOrLabels}
            setFilterIsMembersOrLabels={setFilterIsMembersOrLabels}
          />
        }
        {(currTitle === "Labels" || currTitle === "Change label" || currTitle === "Create label" || currTitle === "Delete label?") &&
          <BoardMenuLabels
            deleteLabel={deleteLabel}
            boardLabels={board.labels}
            currTitle={currTitle}
            setCurrTitle={setCurrTitle}
            addLabelToTask={addLabelToTask}
            updateLabel={updateLabel}
          />
        }
        {currTitle === "Members" &&
          <BoardUserInvite
            users={users}
            toggleUserInBoard={toggleUserInBoard}
            boardUsers={board.members}
          />
        }
        {currTitle === "Delete board" &&
          <BoardMenuDeleteBoard
          deleteBoard={deleteBoard}
          />
        }

      </div>
    </div>
  )
}

