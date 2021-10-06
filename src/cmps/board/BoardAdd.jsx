import React, { useEffect, useState } from 'react';
import CloseBtn from '../CloseBtn';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaTrello } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { addNewBoard } from '../../actions/boardActions';
import { connect } from 'react-redux';
import { eventBusService } from '../../services/eventBusService';





function _BoardAdd(props) {

  const [isShow, setIsShow] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [currBackgroundIdx, setCurrBackgroundIdx] = useState(0);
  const history = useHistory();
  const backgrounds = [
    {
      type: 'img',
      cover: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHw4fHxMZWF2ZXN8ZW58MHx8fHwxNjI1NzQ4MjYw&ixlib=rb-1.2.1&q=85"
    },
    {
      type: 'img',
      cover: "https://images.unsplash.com/photo-1584535553837-33e69fc4ca4d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHw4fHxQaG90b3N8ZW58MHx8fHwxNjI2MTk2MTM3&ixlib=rb-1.2.1&q=85"
    },
    {
      type: 'img',
      cover: "https://images.unsplash.com/photo-1549492423-400259a2e574?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHwxfHxQaG90b3N8ZW58MHx8fHwxNjI2MTk2MTM3&ixlib=rb-1.2.1&q=85"
    },
    {
      type: 'img',
      cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHwxMHx8c3VufGVufDB8fHx8MTYyNjA5NDU2OQ&ixlib=rb-1.2.1&q=85"
    },
    {
      type: 'img',
      cover: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHwyfHxjb2xvcnN8ZW58MHx8fHwxNjI1NzQ3MDcw&ixlib=rb-1.2.1&q=85"
    },
    {
      type: 'color',
      cover: "#0079bf"
    },
    {
      type: 'color',
      cover: "#d29034"
    },
    {
      type: 'color',
      cover: "#519839"
    },
    {
      type: 'color',
      cover: "#b04632"
    },
  ];

  useEffect(() => {
  eventBusService.on('open-board-add',()=>{setIsShow(true)})
  }, [])

  function getStyle(background) {
    if (background.type === 'color') return { backgroundColor: background.cover }
    return { backgroundImage: `url(${background.cover})` }
  }

  function moveToUserBoards() {
    history.push('/userBoards');
    setIsShow(false);
  }
  
  function stop(ev) {
    ev.stopPropagation();
  }
  
  async function addNewBoard() {
    if(!boardTitle) return;
    setIsShow(false);
    const board = await props.addNewBoard(boardTitle, backgrounds[currBackgroundIdx], props.loggedInUser);
    history.push(`/board/${board._id}`);
    
  }


  if (isShow) return (
    <div onClick={() => { setIsShow(false) }} className="board-add">
      <div onClick={stop} className="container">
        <div className="board-details" style={getStyle(backgrounds[currBackgroundIdx])} >
          <input
            type="text"
            value={boardTitle}
            onChange={({ target }) => { setBoardTitle(target.value) }}
            placeholder="Add board title"
          />
          <CloseBtn onClick={() => { setIsShow(false) }} />
          <div className="btns-container">
            <button
              className={`blue-btn ${boardTitle ? '' : 'not-allowed'}`}
              onClick={addNewBoard}
            >
              Create boards
            </button>
            <button
              className="start-template"
              onClick={moveToUserBoards}
            >
              <FaTrello />
              <p>Start with template</p>
            </button>
          </div>
        </div>
        <div className="bgc-cover-picker">
          {backgrounds.map((background, idx) => (
            <div
              key={idx}
              style={getStyle(background)}
              className={`background ${idx === currBackgroundIdx ? 'curr' : 'dont-curr'}`}
              onClick={() => { setCurrBackgroundIdx(idx) }}
            >
              <AiOutlineCheck />
            </div>
          ))
          }
        </div>
      </div>

    </div>
  )

  else return null
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedinUser
  }
}
const mapDispatchToProps = {
  addNewBoard
}
export default connect(mapStateToProps, mapDispatchToProps)(_BoardAdd)

