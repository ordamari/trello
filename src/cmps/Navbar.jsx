import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
import { eventBusService } from '../services/eventBusService';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import TaskUser from './TakUser';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { FaTrello } from 'react-icons/fa';
import { getBoardById, toggleBoardStar } from '../actions/boardActions';
import { onLogout } from '../actions/userActions';
import NavSearchedBoards from './NavSearchedBoards';
import { useHistory } from 'react-router';
import PopAccount from './pop/PopAccount';





function _Navbar(props) {

  const [isScrollTop, setIsScrollTop] = useState(true);
  const [currPage, setCurrPage] = useState('home');
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [elInput, setElInput] = useState(null);
  const [boardSearch, setBoardSearch] = useState('');
  const [isAccountPopOpen, setIsAccountPopOpen] = useState(false);
  const [isBoardsOpen,setIsBoardsOpen] = useState(false);
  const history = useHistory();


  useEffect(() => {
    eventBusService.on('home-scroll-top', (homeIsScrollTop) => setIsScrollTop(homeIsScrollTop));
    eventBusService.on('set-curr-page', (eventCurrPage) => { setCurrPage(eventCurrPage) });
  }, [])

  useEffect(() => {
    if (!isInputFocus) setBoardSearch('');
  }, [isInputFocus])

  useEffect(() => {
    console.log(isInputFocus);
    if(isInputFocus){
      setIsBoardsOpen(true);
    }else{
      setTimeout(() => {
        setIsBoardsOpen(false);
      }, 200);
    }
  }, [isInputFocus])

  function openBoardAdd() {
    if (!props.loggedInUser) {
      history.push('/')
      return;
    }
    eventBusService.emit('open-board-add', null);
  }

  function toggleIsAccountPopOpen() {
    setIsAccountPopOpen(prevState => !prevState);
  }

  if (currPage === 'login') {
    return null
  }
  if (currPage === 'home') {
    return (
      <nav className={`flex justify-space-between align-center ${isScrollTop ? 'top' : 'not-top'} nav-${currPage}`}>
        <Link className='logo' to={'/'} >
          <img src={logo} alt="logo" />
          <p>Trello</p>
        </Link>

        <div className="next-side flex-align-center">
          <Link className='login' to={'/login'}>Log in</Link>
          <Link className='signup' to={'/signup'}>Sign up</Link>
        </div>
      </nav>
    )
  }

  return (

    <nav className={`flex justify-space-between align-center user-nav nav-${currPage}`}>
      <div className="flex align-center">
        <Link to={'/userBoards'}><HomeOutlinedIcon /></Link>
        <div>
          <div className={`input-container ${isInputFocus ? 'focus' : 'blur'}`}>
            <input
              type="text"
              value={boardSearch}
              onChange={({ target }) => { setBoardSearch(target.value) }}
              onFocus={() => { setIsInputFocus(true) }}
              onBlur={() => { setIsInputFocus(false) }}
              ref={(el) => { if (el && !elInput) setElInput(el) }}
              placeholder="Jump to..."
            />
            {isInputFocus ? <CloseIcon /> : <SearchOutlinedIcon onClick={() => { if (elInput) elInput.blur() }} />}
            {isBoardsOpen &&
              <NavSearchedBoards
                getBoardById={props.getBoardById}
                loggedInUser={props.loggedInUser}
                toggleBoardStar={props.toggleBoardStar}
                boardSearch={boardSearch}
              />
            }
          </div>

        </div>
      </div>

      <div className="flex align-center">
        <button onClick={openBoardAdd} ><AddIcon /></button>
        <div onClick={toggleIsAccountPopOpen}>
          <TaskUser
            user={{ imgUrl: props.loggedInUser ? props.loggedInUser.profileImg : 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600550105/vgtz58l672lcmxishf1k.png' }}
          />
        </div>
      </div>

      <Link className="logo" to={'/userBoards'}>
        <FaTrello />
        <h3>Trello</h3>
      </Link>
      {isAccountPopOpen &&
        <PopAccount
          loggedInUser={props.loggedInUser}
          history={history}
          logout={props.onLogout}
          toggleIsAccountPopOpen={toggleIsAccountPopOpen}
        />
      }
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedinUser
  }
}
const mapDispatchToProps = {
  getBoardById,
  onLogout,
  toggleBoardStar
}
export default connect(mapStateToProps, mapDispatchToProps)(_Navbar)

