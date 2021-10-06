import React, { useEffect, useState } from 'react';
import { unsplushService } from '../../services/unsplushService';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


var searchingTimeOut;
export default function BoardMenuPhotos({ updateBoardBackground }) {

  const [searched, setSearched] = useState('Photos');
  const [unsplushPhotos, setUnsplushPhotos] = useState([]);

  useEffect(() => {
    if (searchingTimeOut !== undefined) clearTimeout(searchingTimeOut);
    searchingTimeOut = setTimeout(() => {
      if (searched) getUnsplashImages();
    }, 500);
  }, [searched])

  function stop(ev) {
    if (ev) ev.stopPropagation();
  }

  async function getUnsplashImages() {
    const data = await unsplushService.getImagesByKeyword(searched);
    setUnsplushPhotos(data.results);
  }

  function setBackgroundImg(url) {
    updateBoardBackground({ type: 'img', cover: url });
  }

  return (
    <div className="photos-container">
      <div className="input-container">

        <input
          type="text"
          value={searched}
          onChange={({ target }) => { setSearched(target.value) }}
        />
        <SearchOutlinedIcon />
      </div>
      <div className="unsplush-photos">
        {unsplushPhotos.map((photoData, idx) => (
          <div className="img-container" key={idx} >
            <img
              src={photoData.urls.small}
              alt={photoData.alt_description}
              onClick={() => { setBackgroundImg(photoData.urls.full) }}
            />
            <a onClick={stop} href={`https://unsplash.com/${photoData.user.username}`}>
              {photoData.user.first_name} {photoData.user.last_name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

