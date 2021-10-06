import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import TaskUser from '../TakUser';
import PopMembers from '../pop/PopMembers';
import { eventBusService } from '../../services/eventBusService';



export default function TaskDetailsMembers({
  boardMembers,
  taskMembers,
  toggleTaskMember,
  taskId,
  width,
  closeOtherInputs,
  height
}) {

  const [popSituation, setPopSituation] = useState('');

  useEffect(() => {
    eventBusService.on('close-details-pops', () => { setPopSituation('') });
  }, [])

  function togglePopSituation(ev) {
    closeOtherInputs();
    if (ev) {
      if (typeof ev === 'object' && ev !== null) ev.stopPropagation();
    }

    if (popSituation) setPopSituation('');
    else (setPopSituation)('open');
  }

  return (
    <div className='task-details-members'>
      <p className="mini-title">MEMBERS</p>
      <div className="flex list">
        {
          taskMembers.map(user => <TaskUser key={user.id} user={user} />)
        }
        <div className="add-memeber-btn-contaiber">
          <button
            onClick={togglePopSituation}
            className="add-btn members-add-btn"
          >
            <GrAdd />
          </button>
          {popSituation &&
            <PopMembers
              toggleCurrPop={togglePopSituation}
              boardMembers={boardMembers}
              taskMembers={taskMembers}
              toggleTaskMember={toggleTaskMember}
              taskId={taskId}
              width={width}
              height={height}
            />
          }
        </div>
      </div>
    </div>
  )
}

