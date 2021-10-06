import React, { useEffect, useState } from 'react';
import photos from '../../assets/imgs/photos.jpg'
import colors from '../../assets/imgs/colors.jpg'

export default function BoardMenuDeleteBoard({
  deleteBoard
}) {

  function onRemoveBoardFromUser() {
    deleteBoard();
  }

  return (
    <div className="delete-board-container">
      <p>If you are the only user of this board, this board will be deleted.</p>
      <button onClick={onRemoveBoardFromUser} className="red-btn">Delete</button>
    </div>
  )
}

