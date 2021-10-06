import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { VscEdit } from 'react-icons/vsc';
import CloseBtn from '../CloseBtn';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export default function PopLabels({
  addLabelToTask,
  toggleCurrPop,
  taskId,
  boardLabels,
  taskLabels,
  toggleTaskLabel,
  updateLabel,
  deleteLabel,
  width,
  height,
  isFromPreview
}) {

  const [labelSearch, setLabelSearch] = useState('');
  const [labelName, setLabelName] = useState('');
  const [popLabelPage, setPopLabelPage] = useState('Labels');
  const [currColorIdx, setCurrColorIdx] = useState(0);
  const [editLabelIdx, setEditLabelIdx] = useState(0);
  const [elPop, setElPop] = useState(null);
  const colorsMap = {
    green: {
      backgroundColor: '#61bd4f',
      borderColor: '#519839'
    },
    yellow: {
      backgroundColor: '#f2d600',
      borderColor: '#d9b51c'
    },
    orange: {
      backgroundColor: '#ff9f1a',
      borderColor: '#cd8313'
    },
    red: {
      backgroundColor: '#eb5a46',
      borderColor: '#b04632'
    },
    purple: {
      backgroundColor: '#c377e0',
      borderColor: '#89609e'
    },
    blue: {
      backgroundColor: '#0079bf',
      borderColor: '#055a8c'
    },
  }

  useEffect(() => {
    if (popLabelPage === 'Labels') {
      setLabelName('');
      setCurrColorIdx(0);
      setEditLabelIdx(0);
    }
  }, [popLabelPage])



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

  function checkIfSearchLebal(label) {
    return label.color.includes(labelSearch.toLowerCase()) || label.text.toLowerCase().includes(labelSearch.toLowerCase())
  }

  function onUpdateLabel() {

    var newLabel = null

    if (currColorIdx === -1) {
      newLabel = {
        text: labelName,
        color: 'no-color',
      }
    } else {
      newLabel = {
        text: labelName,
        color: Object.keys(colorsMap)[currColorIdx],
      }

    }

    if (popLabelPage === "Create label") addLabelToTask(newLabel, taskId);
    else updateLabel(newLabel, editLabelIdx)
    setPopLabelPage('Labels');
  }

  function getBackgroundColor(color) {
    if (color === 'no-color') return "#b3bac5"
    return colorsMap[color].backgroundColor
  }

  function getBorderColor(color) {
    if (color === 'no-color') return "#97a0af"
    return colorsMap[color].borderColor
  }

  function onEditLabel(label, labelIdx) {
    setCurrColorIdx(Object.keys(colorsMap).findIndex(key => key === label.color));
    setLabelName(label.text);
    setEditLabelIdx(labelIdx);
    setPopLabelPage('Change label');
  }

  function onDeleteLabel() {
    setPopLabelPage('Labels');
    deleteLabel(editLabelIdx);
  }

  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">{popLabelPage}</p>
      <CloseBtn onClick={() => { toggleCurrPop('labels') }} />
      { (popLabelPage === 'Create label' || popLabelPage === 'Change label' || popLabelPage === 'Delete label?') &&
        <button className="back-btn" onClick={() => { setPopLabelPage('Labels') }} ><ArrowBackIosIcon /></button>
      }
      { popLabelPage === "Labels" &&
        <div className="pop-container pop-labels">
          <input
            className="pop-input"
            value={labelSearch}
            onChange={({ target }) => { setLabelSearch(target.value) }}
            type="text"
            placeholder="Search labels..."
          />
          <p className="pop-mini-title">LABELS</p>
          <div className="pop-labels-container">
            {boardLabels.map((label, idx) => {

              if (checkIfSearchLebal(label)) return (
                <div className="flex pop-label-container" key={label.color + label.text}>
                  <div
                    style={{ backgroundColor: getBackgroundColor(label.color), borderColor: getBorderColor(label.color) }}
                    className="grow flex label-data align-center"
                    onClick={() => { toggleTaskLabel(idx, taskId) }}
                  >
                    <p>{label.text}</p>

                    {taskLabels.some(taskLabelIdx => taskLabelIdx === idx) &&
                      <AiOutlineCheck className="checked" />
                    }
                  </div>
                  <button onClick={() => { onEditLabel(label, idx) }} className="edit-btn" ><VscEdit /></button>
                </div>
              )
            })}
          </div>
          <div>
            <button onClick={() => { setPopLabelPage('Create label') }} className="grey-btn pop-btn">Create a new label</button>
          </div>
        </div>
      }
      { (popLabelPage === "Create label" || popLabelPage === "Change label") &&
        <div className="pop-container pop-labels-color">

          <p className="pop-middle-title">Name</p>
          <input
            className="pop-input"
            value={labelName}
            onChange={({ target }) => { setLabelName(target.value) }}
            type="text"
          />
          <p className="pop-middle-title">Select a color</p>
          <div className="pop-colors-container">
            {Object.values(colorsMap).map((color, idx) => (
              <div
                onClick={() => { setCurrColorIdx(idx) }}
                key={idx}
                className="pop-colors"
                style={{ backgroundColor: color.backgroundColor }}
              >
                {currColorIdx === idx &&
                  <AiOutlineCheck />
                }
              </div>
            ))}
            <div
              onClick={() => { setCurrColorIdx(-1) }}
              className="pop-colors"
              style={{ backgroundColor: '#b3bac5' }}
            >
              {currColorIdx === -1 &&
                <AiOutlineCheck />
              }
            </div>
            <div className="no-color-des">
              <h4>No color.</h4>
              <p>This won't show up on the front of cards.</p>
            </div>
          </div>
          <div className="flex align-center justify-space-between">
            <button onClick={onUpdateLabel} className="blue-btn">{popLabelPage === "Create label" ? 'Create' : 'Save'}</button>
            {popLabelPage === "Change label" &&
              <button onClick={() => { setPopLabelPage('Delete label?') }} className="red-btn">Delete</button>
            }
          </div>
        </div>
      }
      { popLabelPage === 'Delete label?' &&
        <div className="pop-container pop-delete-label" >
          <p>There is no undo. This will remove this label from all cards and destroy its history.</p>
          <button onClick={onDeleteLabel} className="red-btn">Delete</button>
        </div>
      }
    </div>
  )
}

