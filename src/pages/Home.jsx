import React, { useEffect, useState } from 'react';
import heroImg from '../assets/imgs/hero.png'
import boardImg from '../assets/imgs/board.png'
import viewImg from '../assets/imgs/view.svg'
import cardImg from '../assets/imgs/card-back.svg'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { eventBusService } from '../services/eventBusService';
import Footer from '../cmps/Footer';

export default function Home(props) {

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [elHome, setElHome] = useState(null);
  const [isScrollTop,setIsScrollTop] = useState(true);

  useEffect(() => {
    eventBusService.emit('home-scroll-top',isScrollTop);
  }, [isScrollTop])

  useEffect(() => {
    eventBusService.emit('set-curr-page','home');
  }, [])

  return (
    <div
      ref={(el) => { if (el && !elHome) setElHome(el) }}
      className="home"
      onScroll={() => {
        if(elHome){
          setIsScrollTop(elHome.scrollTop===0); 
        }
      }}
    >
      <div className="hero">
        <div className="main-container">
          <div className="flex align-center container">
            <div className="text">
              <h1>Trello helps teams move work forward.</h1>
              <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello.</p>
              <button onClick={()=>{props.history.push('/board/global')}} >Try it now</button>
            </div>
            <img src={heroImg} alt="hero" />
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="product">
          <div className="row">
            <h3>It’s more than work. It’s a way of working together.</h3>
            <p>Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
            <button onClick={()=>{props.history.push('/login')}} >Start doing <ArrowRightAltIcon /> </button>
          </div>
          <img src={boardImg} alt="board" />
        </div>
        <div className="features">
          <div className="without">
            <h3>Features to help your team succeed</h3>
            <p>Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to events and goal setting, Trello’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.</p>
          </div>
          <div className="with">
            <img src={viewImg} alt="view" />
            <div className="text">
              <p className="home-mini-title">CHOOSE A VIEW</p>
              <h3>The board is just the beginning</h3>
              <p className="text-grey" >Lists and cards are the building blocks of organizing work on a Trello board. Grow from there with task assignments, timelines, productivity metrics, calendars, and more.</p>
              <button onClick={() => { setIsViewOpen(prevState => !prevState) }}>
                {isViewOpen ? (
                  <RemoveIcon />
                ) : (
                  <AddIcon />
                )}
                <p>Learn more</p>
              </button>
              <div className={`learn-more ${isViewOpen ? 'with-open' : 'with-close'}`}>
                <p>You and your team can start up a Trello board in seconds. With the ability to view board data from many different angles, the entire team stays up-to-date in the way that suits them best:</p>
                <ul>
                  <li>Use a Timeline view for project planning</li>
                  <li>Calendar helps with time management</li>
                  <li>Table view connects work across boards</li>
                  <li>See board stats with Dashboard, and more!</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="with reverse">
            <img src={cardImg} alt="view" />
            <div className="text">
              <p className="home-mini-title">DIVE INTO THE DETAILS</p>
              <h3>Cards contain everything you need</h3>
              <p className="text-grey" >Trello cards are your portal to more organized work—where every single part of your task can be managed, tracked, and shared with teammates. Open any card to uncover an ecosystem of checklists, due dates, attachments, conversations, and more.</p>
              <button onClick={() => { setIsCardOpen(prevState => !prevState) }}>
                {isCardOpen ? (
                  <RemoveIcon />
                ) : (
                  <AddIcon />
                )}
                <p>Learn more</p>
              </button>
              <div className={`learn-more ${isCardOpen ? 'with-open' : 'with-close'}`}>
                <p>Spin up a Trello card with a click, then uncover everything it can hold. Break down bigger card tasks into steps with file attachment previews, reminders, checklists and comments—emoji reactions included! Plus, gain powerful perspective by seeing all cards by list and status at the board level.</p>
                <p>Your team can:</p>
                <ul>
                  <li>Use a Timeline view for project planning</li>
                  <li>Calendar helps with time management</li>
                  <li>Table view connects work across boards</li>
                  <li>See board stats with Dashboard, and more!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

