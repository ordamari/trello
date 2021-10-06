import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { eventBusService } from '../../services/eventBusService';
import PopLabels from '../pop/PopLabels';


export default function TaskDetailsLabels({
  taskLabels,
  boardLabels,
  addLabelToTask,
  taskId,
  toggleTaskLabel,
  updateLabel,
  deleteLabel,
  width,
  closeOtherInputs,
  height
}) {

  const [popSituation, setPopSituation] = useState('');

  useEffect(() => {
    eventBusService.on('close-details-pops', () => { setPopSituation('') });
  }, [])

  function togglePopSituation(ev) {
    closeOtherInputs();
    if (ev) {
      if (typeof ev === 'object' && ev !== null) ev.stopPropagation();
    }

    if (popSituation) setPopSituation('');
    else (setPopSituation)('open');
  }

  const colorsMap = {
    green: '#61bd4f',
    yellow: '#f2d600',
    orange: '#ff9f1a',
    red: '#eb5a46',
    purple: '#c377e0',
    blue: '#0079bf',
    'no-color': '#b3bac5'
  }

  function getStyle(label) {
    return {
      backgroundColor: colorsMap[label.color],
      minWidth: '32px',
      height: '32px',
      color: '#ffffff',
      paddingRight: '5px',
      paddingLeft: '5px',
      borderRadius: '3px'

    }
  }

  return (
    <div className='task-details-labels'>
      <p className="mini-title">LABELS</p>
      <div className="flex list">
        {
          taskLabels.map((labelIdx) => (
            <div
              className="flex-center"
              key={labelIdx}
              style={getStyle(boardLabels[labelIdx])}
            >
              {boardLabels[labelIdx].text}
            </div>
          ))
        }
        <div className="add-label-btn-container">
          <button
            onClick={togglePopSituation}
            className="add-btn"
          >
            <GrAdd />
          </button>
          {popSituation &&
            <PopLabels
              addLabelToTask={addLabelToTask}
              toggleCurrPop={togglePopSituation}
              taskId={taskId}
              boardLabels={boardLabels}
              taskLabels={taskLabels}
              toggleTaskLabel={toggleTaskLabel}
              updateLabel={updateLabel}
              deleteLabel={deleteLabel}
              width={width}
              height={height}
            />

          }
        </div>
      </div>
    </div>
  )
}

