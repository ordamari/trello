import React, { useEffect, useState } from 'react';
import CloseBtn from '../CloseBtn';


export default function PopMove({
  toggleCurrPop,
  taskId,
  column,
  columns,
  moveTask,
  width,
  height,
  isFromPreview
}) {
  const [moveTo, setMoveTo] = useState({ list: column, position: column.taskIds.findIndex(task => task === taskId) + 1 });
  const [listDropDownOpen, setListDropDownOpen] = useState(false);
  const [positionDropDownOpen, setPositionDropDownOpen] = useState(false);
  const [elPop, setElPop] = useState(null);

  useEffect(() => {
    setMoveTo({ ...moveTo, position: 1 })
  }, [moveTo.list])

  function onMove() {
    const from = { columnId: column.id, position: column.taskIds.findIndex(task => task === taskId) };
    const to = { columnId: moveTo.list.id, position: (moveTo.position - 1) };
    moveTask(from, to, taskId);
    toggleCurrPop('move');

  }

  function toggleDropDown(isListDropDown) {
    if (isListDropDown) {

      if (listDropDownOpen) {
        setPositionDropDownOpen(false);
        setListDropDownOpen(false);
      } else {
        setPositionDropDownOpen(false);
        setListDropDownOpen(true);
      }


    }
    else {

      if (positionDropDownOpen) {
        setPositionDropDownOpen(false);
        setListDropDownOpen(false);
      } else {
        setPositionDropDownOpen(true);
        setListDropDownOpen(false);
      }
    }
  }

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
      <p className="pop-title">Move</p>
      <CloseBtn onClick={() => { toggleCurrPop('move') }} />
      <div className="pop-container pop-move">
        <p className="pop-mini-title">SELECT DESTINATION</p>
        <div className="select-container">
          <div onClick={() => { toggleDropDown(true) }} className="list">
            <p>List</p>
            <p>{moveTo.list.title}</p>
            <div className={`drop-down ${listDropDownOpen ? 'open' : ''}`}>
              {listDropDownOpen && Object.values(columns).map(currColumn => (
                <div onClick={() => setMoveTo({ ...moveTo, list: currColumn })} key={currColumn.id}>
                  <p>{currColumn.title} {column.id === currColumn.id && <span>(current)</span>}</p>
                </div>
              ))

              }
            </div>
          </div>
          <div onClick={() => { toggleDropDown(false) }} className="position">
            <p>Position</p>
            <p>{moveTo.position}</p>
            <div className={`drop-down ${positionDropDownOpen ? 'open' : ''}`}>
              {positionDropDownOpen && moveTo.list.taskIds.map((currTaskId, idx) => (
                <div onClick={() => setMoveTo({ ...moveTo, position: (idx + 1) })} key={currTaskId}>
                  <p>{idx + 1} {taskId === currTaskId && <span>(current)</span>}</p>
                </div>
              ))
              }
              {positionDropDownOpen && moveTo.list.id !== column.id &&
                < div onClick={() => setMoveTo({ ...moveTo, position: (moveTo.list.taskIds.length + 1) })} >
                  <p>{moveTo.list.taskIds.length + 1}</p>
                </div>
              }
            </div>
          </div>
        </div>
        <button onClick={onMove} className="blue-btn">Move</button>

      </div>
    </div >
  )
}

