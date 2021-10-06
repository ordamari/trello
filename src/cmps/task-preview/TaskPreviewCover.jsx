import React, { useEffect, useState } from 'react';
import { average } from 'color.js'



export default function TaskPreviewCover({ cover, isCoverTop, isCoverTaskTextColorBlack }) {

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const colorsMap = {
    green: '#61bd4f',
    yellow: '#f2d600',
    orange: '#ff9f1a',
    red: '#eb5a46',
    purple: '#c377e0',
    blue: '#0079bf',
  }

  useEffect(() => {
    if (cover.type === 'img') updateCoverBgc();
    else(setBackgroundColor(colorsMap[cover.cover]))
  }, [cover])

  function getTypeClass() {
    return cover.type === 'color' ? 'color' : 'img'
  }

  

  async function updateCoverBgc() {
    const colorNumbers = await average(cover.cover)
    setBackgroundColor(`rgb(${colorNumbers[0]},${colorNumbers[1]},${colorNumbers[2]})`);
  }


  return (
    <div 
    style={{backgroundColor:backgroundColor}} 
    className={`task-preview-cover ${getTypeClass()} ${isCoverTop?'cover-top':'cover-all'}`}
    >
      { cover.type==='img' &&
        <img src={cover.cover} alt="Cover" />
      }
    </div>
  )
}

