import React, { useEffect, useState } from 'react';
import CloseBtn from '../CloseBtn';
import { cloudinaryService } from '../../services/cloudinaryService';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { unsplushService } from '../../services/unsplushService';



var searchingTimeOut;

export default function PopCover({
  toggleCurrPop,
  taskId,
  cover,
  attachments,
  addNewAttachment,
  taskTitle,
  isCoverTaskTextColorBlack,
  changeIsCoverTaskTextColorBlack,
  updateTaskCover,
  width,
  height,
  isFromPreview,
  taskIsCoverTop,
  updateIsCoverTop
}) {

  const [newCover, setNewCover] = useState(cover ? { ...cover } : null);
  const [isCoverTop, setIsCoverTop] = useState(taskIsCoverTop);
  const [isLoader, setIsLoader] = useState(false);
  const [isPopPagePhotoSearch, setIsPopPagePhotoSearch] = useState(false);
  const [photoName, setPhotoName] = useState('')
  const [searchedImages, SetSearchedImages] = useState([]);
  const [unsplushImgs, setUnsplashImgs] = useState([
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1436397543931-01c4a5162bdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    'https://images.unsplash.com/photo-1533035350251-aa8b8e208d95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
  ]);
  const [elPop, setElPop] = useState(null);

  const colorsMap = {
    green: {
      backgroundColor: '#61bd4f',
    },
    yellow: {
      backgroundColor: '#f2d600',
    },
    orange: {
      backgroundColor: '#ff9f1a',
    },
    red: {
      backgroundColor: '#eb5a46',
    },
    purple: {
      backgroundColor: '#c377e0',
    },
    blue: {
      backgroundColor: '#0079bf',
    },
  }

  const suggestedSearch = ['Productivity', 'Perspective', 'Organization', 'Colorful', 'Nature', 'Business', 'Minimal', 'Space', 'Animals']

  useEffect(() => {
    if (!checkIsCurrCover(cover)) updateTaskCover(newCover, taskId)
  }, [newCover])

  useEffect(() => {
    if (searchingTimeOut !== undefined) clearTimeout(searchingTimeOut);
    searchingTimeOut = setTimeout(() => {
      if (photoName) getUnsplashImages();
    }, 500);
  }, [photoName])

  useEffect(() => {
    updateIsCoverTop(isCoverTop, taskId)
  }, [isCoverTop])

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

  async function uploadImg(ev) {
    setIsLoader(true);
    try {
      const newImg = await cloudinaryService.uploadImg(ev);
      setIsLoader(false)
      const newAttachment = {
        src: newImg.url,
        name: newImg.original_filename,
        addedAt: Date.now()
      }
      addNewAttachment(newAttachment, taskId);
    } catch (err) {
    }
  }

  async function getUnsplashImages() {
    const data = await unsplushService.getImagesByKeyword(photoName);
    SetSearchedImages(data.results)

  }

  function checkIsCurrCover(cover) {
    if (!newCover) return !cover;
    if (!cover) return !newCover;
    return cover.type === newCover.type && cover.cover === newCover.cover
  }

  function getCoverStyle() {
    if (!newCover) return {};
    if (newCover.type === 'color') return { backgroundColor: colorsMap[newCover.cover].backgroundColor }
    return {
      backgroundImage: `url('${newCover.cover}')`
    }
  }

  function toggleCover(cover) {
    if (checkIsCurrCover(cover)) setNewCover(null);
    else setNewCover(cover);
  }

  function onChooseImgFromSearch(img) {
    setNewCover({ type: 'img', cover: img });
    let newUnsplushImgs = [...unsplushImgs]
    newUnsplushImgs.splice(-1, 1);
    newUnsplushImgs.unshift(img);
    setUnsplashImgs(newUnsplushImgs);
    setIsPopPagePhotoSearch(false);
  }


  return (
    <div style={getStyle()} ref={(el) => { if (el) setElPop(el) }} onClick={ev => { ev.stopPropagation() }} className='pop'>
      <p className="pop-title">{isPopPagePhotoSearch ? 'Photo search' : 'Cover'}</p>
      <CloseBtn onClick={() => { toggleCurrPop('cover') }} />
      {isPopPagePhotoSearch &&
        <button className="back-btn" onClick={() => { setIsPopPagePhotoSearch(false) }} ><ArrowBackIosIcon /></button>
      }
      <div className="pop-container pop-cover">
        {!isPopPagePhotoSearch &&
          <div>
            <p className="pop-mini-title">SIZE</p>
            <div className="flex justify-space-between">
              <div className={`cover-top ${newCover ? 'have-cover' : 'dont-have-cover'} ${isCoverTop ? 'curr-size' : ''}`}
                onClick={() => { setIsCoverTop(true) }}
              >
                <div className='cover' style={getCoverStyle()}></div>
                <div className='data'>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="flex align-center justify-space-between">
                    <div className="flex">
                      <div className="btn"></div>
                      <div className="btn"></div>
                    </div>
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
              <div className={`cover-background ${newCover ? 'have-cover' : 'dont-have-cover'} ${isCoverTop ? '' : 'curr-size'}`}
                onClick={() => { setIsCoverTop(false) }}
              >
                <div className="cover" style={getCoverStyle()}>
                  <div className="data">
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
              </div>
            </div>
            {newCover &&
              <div onClick={() => { setNewCover(null) }} className="grey-btn pop-btn">Remove cover</div>
            }
            {(newCover && newCover.type === 'img' && !isCoverTop) &&
              <>
                <p className="pop-mini-title">TEXT COLOR</p>
                <div className="text-color-container">
                  <div
                    onClick={() => { changeIsCoverTaskTextColorBlack(false, taskId) }}
                    className={`${isCoverTaskTextColorBlack ? '' : 'curr'}`}
                    style={getCoverStyle()}>
                    <h3>{taskTitle}</h3>
                  </div>
                  <div
                    onClick={() => { changeIsCoverTaskTextColorBlack(true, taskId) }}
                    className={`${isCoverTaskTextColorBlack ? 'curr' : ''}`}
                    style={getCoverStyle()}>
                    <h3>{taskTitle}</h3>
                  </div>
                </div>
              </>

            }
            <p className="pop-mini-title">COLOR</p>
            <div className="colors-container">
              {Object.values(colorsMap).map((color, idx) => (
                <div onClick={() => { toggleCover({ type: 'color', cover: Object.keys(colorsMap)[idx] }) }}
                  key={color.backgroundColor}
                  style={{ backgroundColor: color.backgroundColor }}
                  className={checkIsCurrCover({ type: 'color', cover: Object.keys(colorsMap)[idx] }) ? 'curr' : 'dont-curr'}
                ></div>
              ))}
            </div>
            <p className="pop-mini-title">ATTACHMENTS</p>
            <div className="imgs-container">
              {attachments.map((attachment, idx) => (
                <img onClick={() => { setNewCover({ type: 'img', cover: attachment.src }) }}
                  key={idx} src={attachment.src}
                  className={`${newCover?.cover === attachment.src ? 'curr' : ''}`}
                />
              ))}


            </div>
            <label htmlFor="img-upload">
              <input hidden
                type="file"
                className="file-input"
                name="img-upload"
                id="img-upload"
                onChange={uploadImg}
              />
              <div className="grey-btn pop-btn">Upload a cover image</div>
            </label>
            <p className="pop-mini-title">UNSPLASH</p>
            <div className="imgs-container">
              {unsplushImgs.map((img, idx) =>
                <img
                  onClick={() => { setNewCover({ type: 'img', cover: img }) }}
                  key={idx} src={img}
                  className={`${newCover?.cover === img ? 'curr' : ''}`}
                />
              )}
            </div>
            <button onClick={() => { setIsPopPagePhotoSearch(true) }} className="grey-btn pop-btn">Search for photos</button>
          </div>
        }
        {isPopPagePhotoSearch &&
          <div>
            <input
              className="pop-input"
              value={photoName}
              onChange={({ target }) => { setPhotoName(target.value) }}
              type="text"
              placeholder="Search Unsplash for photos"
            />
            {photoName ? (
              <div>
                <p className="pop-mini-title">RESULTS</p>
                <div className="imgs-container">
                  {searchedImages.slice(0, 9).map(imageData => (
                    <img key={imageData.id} onClick={() => { onChooseImgFromSearch(imageData.urls.regular) }} src={imageData.urls.thumb} />
                  ))
                  }
                </div>
                <p className="credits">Photos from <a href="unsplash.com">Unsplash</a></p>
              </div>
            ) : (

              <div>
                <p className="pop-mini-title">SUGGESTED SEARCHED</p>
                <div className="suggested-search-container">
                  {suggestedSearch.map(search => (
                    <button key={search} onClick={() => { setPhotoName(search) }} className="grey-btn">{search}</button>
                  ))
                  }
                </div>
              </div>
            )

            }

          </div>
        }
      </div>
    </div>
  )
}

