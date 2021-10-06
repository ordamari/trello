import React, { useState } from 'react';
import CloseBtn from '../CloseBtn';
import { eventBusService } from '../../services/eventBusService'
import TextareaAutosize from 'react-textarea-autosize';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



export default function PopColumnMenu({
  width,
  height,
  toggleIsMenuOpen,
  column,
  removeColumn,
  coppiedColumn,
  board,
  moveList
}) {

  const [elPop, setElPop] = useState(null);
  const [currTitle, setCurrTitle] = useState('List actions')
  const [coppiedListName, setCoppiedListName] = useState(column.title);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [moveTo, setMoveTo] = useState(board.columnsOrder.findIndex(orderColumnId => orderColumnId === column.id) + 1);

  function getStyle() {
    if (!elPop) return {};
    var style = {};
    if (!(width > elPop.getBoundingClientRect().right)) style.left = width - elPop.getBoundingClientRect().right - 10;
    if (!(height > elPop.getBoundingClientRect().bottom)) {
      style.top = 'unset';
      style.bottom = 25;
    }
    return style;
  }

  function onAddCard() {
    toggleIsMenuOpen();
    eventBusService.emit('add-task', column.id)
  }

  function onRemoveList() {
    toggleIsMenuOpen();
    removeColumn(column.id);

  }

  function onMakeCopyColumn() {
    toggleIsMenuOpen();
    coppiedColumn(column.id, coppiedListName);
  }

  function onChooseMoveTo(choosen) {
    setMoveTo(choosen);
  }

  function toggleIsDropdownOpen() {
    setIsDropdownOpen(prevState => !prevState)
  }

  function onMoveList() {
    moveList(column.id, board.columnsOrder.findIndex(orderColumnId => orderColumnId === column.id), moveTo - 1);
    toggleIsMenuOpen();
  }


  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">{currTitle}</p>
      <CloseBtn onClick={toggleIsMenuOpen} />
      { currTitle !== 'List actions' &&
        <button className="back-btn" onClick={() => { setCurrTitle('List actions') }} ><ArrowBackIosIcon /></button>
      }
      <div className="pop-container pop-column-menu">
        {currTitle === "List actions" &&
          <div className="flex column btns-container-menu">
            <button onClick={onAddCard} >Add card...</button>
            <button onClick={() => { setCurrTitle('Copy list') }} >Copy list...</button>
            <button onClick={() => { setCurrTitle('Move list') }} >Move list...</button>
            <button onClick={onRemoveList} >Remove list</button>
          </div>
        }
        {currTitle === 'Copy list' &&
          <div className="">
            <p className="pop-middle-title">Name</p>
            <TextareaAutosize
              value={coppiedListName}
              onChange={({ target }) => { setCoppiedListName(target.value) }}
              className="pop-input"
            />
            <button onClick={onMakeCopyColumn} className="blue-btn">Create list</button>

          </div>
        }
        {currTitle === 'Move list' &&
          <div className="move-list-container">

            <div className="select-conatiner">
              <div onClick={toggleIsDropdownOpen} className="column-list">
                <p>Position</p>
                <p>{moveTo}</p>
                <div className={`drop-down ${isDropdownOpen ? 'open' : ''}`}>
                  {isDropdownOpen && board.columnsOrder.map((orderColumnId, idx) => (
                    <div onClick={() => onChooseMoveTo(idx + 1)} key={orderColumnId}>
                      <p>{idx + 1}
                        {idx === board.columnsOrder.findIndex(orderColumnId => orderColumnId === column.id) &&
                          <span>{' (current)'}</span>
                        }
                      </p>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
            <button onClick={onMoveList} className="blue-btn">Move</button>
          </div>

        }
      </div>
    </div >

  )
}

