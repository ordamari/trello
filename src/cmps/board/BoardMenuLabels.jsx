import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { VscEdit } from 'react-icons/vsc';


export default function BoardMenuLabels({
  boardLabels,
  currTitle,
  setCurrTitle,
  addLabelToTask,
  updateLabel,
  deleteLabel
}) {
  const [labelSearch, setLabelSearch] = useState('');
  const [labelName, setLabelName] = useState('');
  const [currColorIdx, setCurrColorIdx] = useState(0);
  const [editLabelIdx, setEditLabelIdx] = useState(0);

  useEffect(() => {
    if (currTitle === 'Labels') {
      setLabelName('');
      setCurrColorIdx(0);
      setEditLabelIdx(0);
    }
  }, [currTitle])

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

  function checkIfSearchLebal(label) {
    return label.color.includes(labelSearch.toLowerCase()) || label.text.toLowerCase().includes(labelSearch.toLowerCase())
  }

  function getBackgroundColor(color) {
    if (color === 'no-color') return "#b3bac5"
    return colorsMap[color].backgroundColor
  }

  function getBorderColor(color) {
    if (color === 'no-color') return "#97a0af"
    return colorsMap[color].borderColor
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

    if (currTitle === "Create label") addLabelToTask(newLabel, null);
    else updateLabel(newLabel, editLabelIdx)
    setCurrTitle('Labels');
  }

  function onEditLabel(label, labelIdx) {
    setCurrColorIdx(Object.keys(colorsMap).findIndex(key => key === label.color));
    setLabelName(label.text);
    setEditLabelIdx(labelIdx);
    setCurrTitle("Change label");
  }

  function onDeleteLabel() {
    setCurrTitle('Labels');
    deleteLabel(editLabelIdx);
  }



  return (
    <div className="board-menu-labels">
      {currTitle === "Labels" &&
        <div>
          <input
            value={labelSearch}
            onChange={({ target }) => { setLabelSearch(target.value) }}
            type="text"
            placeholder="Search labels..."
          />
          <p className="mini-title">LABELS</p>
          <div className="labels-container">
            {boardLabels.map((label, idx) => {

              if (checkIfSearchLebal(label)) return (
                <div className="flex label-container" key={label.color + label.text}>
                  <div
                    style={{ backgroundColor: getBackgroundColor(label.color), borderColor: getBorderColor(label.color) }}
                    className="grow flex label-data align-center"
                    onClick={() => { onEditLabel(label, idx) }}
                  >
                    <p>{label.text}</p>
                  </div>
                  <button onClick={() => { onEditLabel(label, idx) }} className="edit-btn" ><VscEdit /></button>
                </div>
              )
            })}
          </div>
          <button onClick={() => setCurrTitle("Create label")} className="grey-btn">Create a new label</button>
        </div>
      }
      {(currTitle === "Create label" || currTitle === "Change label") &&
        <div>
          <p className="middle-title">Name</p>
          <input
            className="pop-input"
            value={labelName}
            onChange={({ target }) => { setLabelName(target.value) }}
            type="text"
          />
          <p className="middle-title">Select a color</p>
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
            <button onClick={onUpdateLabel} className="blue-btn">{currTitle === "Create label" ? 'Create' : 'Save'}</button>
            {currTitle === "Change label" &&
              <button onClick={() => { setCurrTitle('Delete label?') }} className="red-btn">Delete</button>
            }
          </div>
        </div>
      }
      {currTitle === "Delete label?" &&
        <div className="delete-label" >
          <p>There is no undo. This will remove this label from all cards and destroy its history.</p>
          <button onClick={onDeleteLabel} className="red-btn">Delete</button>
        </div>
      }
    </div>
  )
}

