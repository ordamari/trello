import React, { useEffect, useState } from 'react';
import { BiCreditCardFront } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import CloseBtn from '../CloseBtn';
import { eventBusService } from '../../services/eventBusService';



export default function TaskDetailsTitle({
  board,
  taskId,
  updateTaskName,
  closeOtherInputs,
  listTitle,
  setCurrTask
}) {

  const [isTitleInputOpen, setIsTitleInputOpen] = useState(false);

  useEffect(() => {
    eventBusService.on('close-title-input', () => { setIsTitleInputOpen(false) });
  }, [])

  function onCloseTitleInput(ev) {
    ev.preventDefault();
    setIsTitleInputOpen(false);
  }

  function onOpenTitleInput(ev) {
    ev.stopPropagation();
    closeOtherInputs();
    setIsTitleInputOpen(true);
  }

  return (
    <div className={`header ${board.tasks[taskId].cover ? 'have-cover' : 'dont-have-cover'}`}>
      <div className="header-data">
        <div className="title">
          <BiCreditCardFront />
          {isTitleInputOpen ? (
            <form onSubmit={onCloseTitleInput} >
              <input
                onClick={(ev) => { ev.stopPropagation() }}
                type="text"
                onChange={({ target }) => { updateTaskName(target.value, taskId) }}
                value={board.tasks[taskId].title} autoFocus={true}
              />
            </form>
          ) : (
            <p onClick={onOpenTitleInput} >{board.tasks[taskId].title}</p>
          )

          }
        </div>
        <p
          className="list-name flex align-center"
        >
          in list <span>{listTitle}</span> {board.tasks[taskId].isWatched && <FiEye />}
        </p>
      </div>
      <CloseBtn onClick={() => { setCurrTask('') }} />
    </div>
  )
}

