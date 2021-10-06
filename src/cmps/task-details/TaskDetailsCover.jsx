import React, { useEffect, useState } from 'react';
import { average } from 'color.js'



export default function TaskDetailsCover({ board, colorsMap, taskId }) {

  const [coverBgc, setCoverBgc] = useState('#f4f5f7');

  useEffect(() => {
    if (board.tasks[taskId].cover?.type === 'img') updateCoverBgc();
  }, [board.tasks[taskId].cover])

  function getCoverDetailesStyles() {
    if (board.tasks[taskId].cover.type === 'color') return { backgroundColor: colorsMap[board.tasks[taskId].cover.cover].backgroundColor }
    else return { backgroundColor: coverBgc }
  }

  async function updateCoverBgc() {
    const colorNumbers = await average(board.tasks[taskId].cover.cover)
    setCoverBgc(`rgb(${colorNumbers[0]},${colorNumbers[1]},${colorNumbers[2]})`);
  }

  return (
    <>
      {board.tasks[taskId].cover &&

        <div
          style={getCoverDetailesStyles()}
          className="cover-details"
        >
          {board.tasks[taskId].cover.type === 'img' &&
            <img src={board.tasks[taskId].cover.cover} alt="Cover image" />
          }
        </div>
      }
    </>
  )
}

