import React, { useEffect, useState } from 'react';
import photos from '../../assets/imgs/photos.jpg'
import colors from '../../assets/imgs/colors.jpg'

export default function BoardMenuColors({ updateBoardBackground }) {

  const colors = ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91']

  function setBackgroundColor(color) {
    updateBoardBackground({ type: 'color', cover: color });
  }

  return (
    <div className="colors-container">
      {colors.map((color) => (
        <div
          className="color"
          key={color}
          style={{ backgroundColor: color }}
          onClick={()=>{setBackgroundColor(color)}}
        >
        </div>
      ))}
    </div>
  )
}

