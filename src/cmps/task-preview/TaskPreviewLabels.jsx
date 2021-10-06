import React, { useEffect, useState } from 'react';


export default function TaskPreviewLabels({boardLabels, taskLabels}) {

  const [isLabelsBig, setIsLabelsBig] = useState(false);

  const colorsMap = {
    green: '#61bd4f',
    yellow: '#f2d600',
    orange: '#ff9f1a',
    red: '#eb5a46',
    purple: '#c377e0',
    blue: '#0079bf',
    'no-color': '#b3bac5'
  }

  function toggleIsLabelBig(ev) {
    ev.stopPropagation();
    setIsLabelsBig(prevState => !prevState);
  }


  return (
    <div onClick={toggleIsLabelBig} className={`task-preview-lebels ${isLabelsBig ? 'big' : 'small'}`}>
      {taskLabels.map((labelIdx, idx) => (
        <div key={idx} className="label-container">
          { boardLabels[labelIdx].color !== 'no-color' &&
            <div className="label" style={{backgroundColor:colorsMap[boardLabels[labelIdx].color]}} >
              {isLabelsBig &&
                <p>{boardLabels[labelIdx].text}</p>
              }
            </div>
          }
        </div>
      ))

      }
    </div>
  )
}

