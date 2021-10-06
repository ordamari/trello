import React, { useEffect, useState } from 'react';
import photos from '../../assets/imgs/photos.jpg'
import colors from '../../assets/imgs/colors.jpg'

export default function BoardMenuBackground({setCurrTitle}) {


  return (
    <div className="background-btns">
      <button onClick={() => { setCurrTitle("Photos by Unsplush") }}>
        <img src={photos} alt="Photos" />
        <p>Photos</p>
      </button>
      <button onClick={() => { setCurrTitle("Colors") }} >
        <img src={colors} alt="Colors" />
        <p>Colors</p>
      </button>
    </div>
  )
}

