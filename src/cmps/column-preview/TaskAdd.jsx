import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseBtn from '../CloseBtn';
import { eventBusService } from '../../services/eventBusService';


export default function TaskAdd({ addTask, columnId }) {

  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    eventBusService.on('add-task',(eventColumnId)=>{
      if(columnId===eventColumnId) setIsOpen(true);
    })
    }, [])

  function onAddTask() {
    addTask(taskName, columnId);
    onClose();
  }

  function onClose() {
    setIsOpen(false);
    setTaskName('');
  }


  return (
    <div className='task-add'>
      {
        isOpen ? (
          <div className='open'>
            <form onSubmit={onAddTask}>
              <textarea autoFocus={true} value={taskName} onChange={({ target }) => { setTaskName(target.value) }} placeholder="Enter a title for this card..." rows="3"></textarea>
            </form>
            <div className="task-add-btn">
              <button className="blue-btn" onClick={onAddTask} >Add Task</button>
              <CloseBtn onClick={onClose} />
            </div>
          </div>
        ) : (
          <div onClick={() => setIsOpen(true)} className='close'>
            <AddIcon className="add-icon" /> Add another card
          </div>
        )
      }
    </div>
  )
}

